const { Storage } = require("@google-cloud/storage");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const stream = require("stream");
const Image = require("../config/postgreSql").db.Image; // 引入 Image 模型
require("dotenv").config();
const sharp = require("sharp");

// 初始化 GCS Storage
const storage = new Storage({
  keyFilename: process.env.KEYFILENAME, // GCS API Key 設定
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

// Multer 設定：將檔案儲存在記憶體中
const multerUpload = multer({
  storage: multer.memoryStorage(), // 設定儲存方式為記憶體
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制檔案大小為 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true); // 檔案格式正確，繼續
    } else {
      cb(new Error("Only image files are allowed!")); // 檔案格式錯誤，回傳錯誤
    }
  },
});

// 包装multer中间件，处理错误
const upload = (req, res, next) => {
  const uploadHandler = multerUpload.array("files", 10); // 支援最多10個檔案

  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer错误
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
        code: "MULTER_ERROR",
      });
    } else if (err) {
      // 其他错误
      return res.status(400).json({
        success: false,
        message: err.message,
        code: "UPLOAD_ERROR",
      });
    }

    // 检查是否存在文件
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
        code: "NO_FILE",
      });
    }

    next();
  });
};

// 用來生成唯一檔案名稱的函數（UUID + 原檔名）
const getUniqueFilename = async (userId, filename) => {
  const extname = path.extname(filename); // 取得檔案副檔名
  const basename = path.basename(filename, extname); // 取得檔案名不含副檔名

  const uniqueFilename = `${uuidv4()}${extname}`; // 生成唯一檔案名 (UUID)

  let readableFilename = `${basename}${extname}`;
  let count = 1;

  // 檢查檔案名稱是否已經存在
  while (
    await Image.findOne({
      where: { user_id: userId, filename: readableFilename },
    })
  ) {
    readableFilename = `${basename}-${count}${extname}`;
    count++;
  }

  return { uniqueFilename, readableFilename }; // 返回唯一檔案名和可讀檔案名
};

// 上傳檔案到 GCS 並儲存結果
const uploadToGCS = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated or user ID not available",
        code: "AUTH_ERROR",
      });
    }

    // 初始化上传结果数组
    req.uploadedFiles = [];

    const uploadPromises = req.files.map(async (file) => {
      const originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );

      // 取得唯一檔案名稱
      const { uniqueFilename, readableFilename } = await getUniqueFilename(
        userId,
        originalname
      );

      const filePath = `${userId}/${uniqueFilename}`;
      const blob = bucket.file(filePath); // 儲存檔案至該使用者資料夾

      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
        metadata: {
          cacheControl: "public, max-age=31536000", // 設定快取控制，讓圖片長時間有效
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on("error", (err) => {
          console.error("Error uploading to GCS:", err);
          reject(new Error("Error uploading to Google Cloud Storage"));
        });

        blobStream.on("finish", async () => {
          const publicUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filePath}`;

          // 创建数据库记录
          try {
            // 用 sharp 取得圖片尺寸
            const metadata = await sharp(file.buffer).metadata();
            const width = metadata.width;
            const height = metadata.height;

            const imageRecord = await Image.create({
              user_id: userId,
              filename: readableFilename,
              storage_filename: uniqueFilename,
              url: publicUrl,
              mime_type: file.mimetype,
              size: file.size,
              width,
              height,
            });

            // 将上传结果添加到请求对象中，供路由处理器使用
             req.uploadedFiles.push({
               id: imageRecord.id,
               originalname,
               filename: readableFilename,
               uniqueFilename,
               mimetype: file.mimetype,
               size: file.size,
               url: publicUrl,
               width,
               height,
             });

            resolve(imageRecord);
          } catch (error) {
            console.error("Error saving to database:", error);
            reject(error);
          }
        });

        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer); // 使用 multer 的 buffer 傳送檔案
        bufferStream.pipe(blobStream); // 串流到 GCS
      });
    });

    await Promise.all(uploadPromises); // 等待所有檔案上傳完成
    next(); // 继续执行下一个中间件
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading images",
      error: error.message,
      code: "UPLOAD_PROCESS_ERROR",
    });
  }
};

// 创建一个辅助函数来获取上传结果
const handleUploadResult = (req, res) => {
  // 如果到达这个中间件，说明上传已成功
  const urls = req.uploadedFiles.map((file) => file.url);
  return res.json({
    success: true,
    files: req.uploadedFiles,
    urls: urls,
  });
};

module.exports = { upload, uploadToGCS, handleUploadResult };
