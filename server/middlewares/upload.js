// middlewares/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 設定儲存位置與檔案名稱
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // 如果資料夾不存在，創建它
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");

    let filename = `${baseName}${ext}`;
    let counter = 1;

    // 檢查是否有同名檔案存在
    while (fs.existsSync(path.join("uploads", filename))) {
      filename = `${baseName}-${counter}${ext}`;
      counter++;
    }

    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制最大檔案大小 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, webp) are allowed"));
    }
  },
});

module.exports = upload;
