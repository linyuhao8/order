const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 設定儲存位置與檔名
const storage = multer.diskStorage({
  // 定義檔案儲存的目的地資料夾
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 檔案將儲存在 'uploads' 資料夾中
  },
  // 定義如何處理上傳檔案的檔名
  filename: function (req, file, cb) {
    const uploadDir = "uploads/"; // 儲存檔案的資料夾
    const ext = path.extname(file.originalname); // 取得檔案的副檔名
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // 清理檔名，將空格換成底線

    let filename = `${baseName}${ext}`; // 預設的檔名（加上副檔名）
    let counter = 1; // 初始化檔名重複計數器

    // 檢查上傳資料夾中是否已經存在相同名稱的檔案
    while (fs.existsSync(path.join(uploadDir, filename))) {
      filename = `${baseName}-${counter}${ext}`; // 如果檔案存在，則在檔名後加上計數器
      counter++; // 計數器加1，避免覆蓋
    }

    // 使用最終的檔名來儲存檔案
    cb(null, filename);
  },
});

// 設定 multer 實例，包含儲存配置、檔案大小限制及檔案類型檢查
const upload = multer({
  storage: storage, // 使用自定義的儲存配置
  limits: { fileSize: 2 * 1024 * 1024 }, // 限制檔案大小為 2MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"]; // 允許的檔案類型
    // 檢查上傳的檔案類型是否在允許範圍內
    if (allowed.includes(file.mimetype)) {
      cb(null, true); // 如果檔案是允許的類型，則繼續處理
    } else {
      cb(new Error("只允許上傳圖片 (jpg, png, webp)")); // 如果檔案類型不被允許，則拒絕
    }
  },
});

module.exports = upload; // 將 multer 實例匯出，供路由使用
