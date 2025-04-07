const Image = require("../config/postgreSql").db.Image;

// Create (Upload Image + Save to DB)
const uploadImage = (req, res) => {
  try {
    // 检查 uploadedFiles 是否存在
    if (!req.uploadedFiles || req.uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded or processing failed",
      });
    }

    // 从请求对象中获取 uploadToGCS 中间件设置的上传结果
    const uploadedFiles = req.uploadedFiles;

    // 提取 URL 列表供前端使用
    const urls = uploadedFiles.map((file) => file.url);

    // 返回成功响应
    return res.status(200).json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} image(s)`,
      files: uploadedFiles,
      urls: urls,
    });
  } catch (error) {
    console.error("Error in uploadImage controller:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing uploaded images",
      error: error.message,
    });
  }
};
// Read All
const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json({ success: true, data: images });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Get images failed", error });
  }
};

// Read One
const getImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    res.json({ success: true, data: image });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Get image failed", error });
  }
};

// Delete
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });

    const filename = image.url.split("/").pop();
    const { Storage } = require("@google-cloud/storage");
    const path = require("path");

    const storage = new Storage({
      keyFilename: path.join(__dirname, "..", process.env.KEYFILENAME),
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    await bucket
      .file(filename)
      .delete()
      .catch(() => {});

    await image.destroy();
    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error });
  }
};

// Update（非必需，可擴充）
const updateImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image)
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });

    const { filename } = req.body;
    if (filename) image.filename = filename;

    await image.save();
    res.json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImage,
  deleteImage,
  updateImage,
};
