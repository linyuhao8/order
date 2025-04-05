// controllers/imageController.js
const Image = require("../config/postgreSql").db.Image;
// 創建圖片
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imgUrl = `/uploads/${req.file.filename}`;

    // 儲存圖片資料到資料庫
    const newImage = await Image.create({
      filename: req.file.filename,
      url: imgUrl,
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 取得所有圖片
const getAllImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 取得單張圖
const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 更新圖片資料
const updateImage = async (req, res) => {
  const { id } = req.params;
  const { filename, url } = req.body;
  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    image.filename = filename || image.filename;
    image.url = url || image.url;
    await image.save();

    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 刪除圖片
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    await image.destroy();
    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImage,
  updateImage,
  deleteImage,
};
