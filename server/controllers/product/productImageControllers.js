const { ProductImage } = require("../../config/postgreSql").db; // 請根據你的路徑調整

module.exports = {
  // 取得全部 product images (可以加 filter)
  async getAll(req, res) {
    try {
      const images = await ProductImage.findAll();
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "取得 product images 失敗" });
    }
  },

  // 取得特定 product 的所有 images
  async getByProductId(req, res) {
    const { productId } = req.params;
    try {
      const images = await ProductImage.findAll({
        where: { product_id: productId },
      });
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "取得指定產品圖片失敗" });
    }
  },

  // 新增一筆 product image
  async create(req, res) {
    const { product_id, image_id, sort_order, is_main } = req.body;
    try {
      const newEntry = await ProductImage.create({
        product_id,
        image_id,
        sort_order,
        is_main,
      });
      res.status(201).json(newEntry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "新增 product image 失敗" });
    }
  },

  // 更新 product image (主要是更新 sort_order 或 is_main)
  async update(req, res) {
    const { productId, imageId } = req.params;
    const { sort_order, is_main } = req.body;

    try {
      const entry = await ProductImage.findOne({
        where: { product_id: productId, image_id: imageId },
      });

      if (!entry) {
        return res.status(404).json({ message: "找不到指定的 product image" });
      }

      await entry.update({ sort_order, is_main });
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "更新 product image 失敗" });
    }
  },

  // 刪除 product image
  async delete(req, res) {
    const { productId, imageId } = req.params;
    try {
      const count = await ProductImage.destroy({
        where: { product_id: productId, image_id: imageId },
      });
      if (count === 0) {
        return res.status(404).json({ message: "找不到指定的 product image" });
      }
      res.json({ message: "刪除成功" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "刪除 product image 失敗" });
    }
  },
};
