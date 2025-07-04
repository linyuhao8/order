const { OptionCategoryMain, Sequelize } =
  require("../../../../config/postgreSql").db;
const { Op } = Sequelize;

async function createOptionCategoryMain(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "name 是必填欄位" });
    }

    const exist = await OptionCategoryMain.findOne({ where: { name } });
    if (exist) {
      return res.status(409).json({ message: "分類名稱已存在" });
    }

    const newCategory = await OptionCategoryMain.create({ name, description });
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getAllOptionCategoryMain(req, res) {
  try {
    const categories = await OptionCategoryMain.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getOptionCategoryMainById(req, res) {
  try {
    const category = await OptionCategoryMain.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "找不到分類" });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateOptionCategoryMain(req, res) {
  try {
    const category = await OptionCategoryMain.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "找不到分類" });
    }
    const { name, description } = req.body;

    if (name) {
      const exist = await OptionCategoryMain.findOne({
        where: { name, id: { [Op.ne]: req.params.id } },
      });
      if (exist) {
        return res.status(409).json({ message: "分類名稱已存在" });
      }
    }

    const updatedCategory = await category.update({ name, description });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteOptionCategoryMain(req, res) {
  try {
    const category = await OptionCategoryMain.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "找不到分類" });
    }
    await category.destroy();
    return res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOptionCategoryMain,
  getAllOptionCategoryMain,
  getOptionCategoryMainById,
  updateOptionCategoryMain,
  deleteOptionCategoryMain,
};
