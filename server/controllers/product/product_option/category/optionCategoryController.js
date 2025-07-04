const { OptionCategory, Option, OptionCategoryMain } =
  require("../../../../config/postgreSql").db;

// Create OptionCategory (連接 Option 與 OptionCategoryMain)
async function createOptionCategory(req, res) {
  try {
    const { option_id, option_category_main_id } = req.body;

    if (!option_id || !option_category_main_id) {
      return res
        .status(400)
        .json({ message: "option_id 與 option_category_main_id 都是必填" });
    }

    // 檢查 Option 是否存在
    const option = await Option.findByPk(option_id);
    if (!option) {
      return res.status(404).json({ message: "找不到對應的 Option" });
    }

    // 檢查 OptionCategoryMain 是否存在
    const oCategory = await OptionCategoryMain.findByPk(
      option_category_main_id
    );
    if (!oCategory) {
      return res
        .status(404)
        .json({ message: "找不到對應的 OptionCategoryMain" });
    }

    // 檢查是否已經存在連結，避免重複
    const exist = await OptionCategory.findOne({
      where: { option_id, option_category_main_id },
    });
    if (exist) {
      return res.status(409).json({ message: "OptionCategory 已存在" });
    }

    // 建立關聯
    const newOptionCategory = await OptionCategory.create({
      option_id,
      option_category_main_id,
    });
    return res.status(201).json(newOptionCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 取得全部 OptionCategory (可選擇帶 Option 與 OptionCategoryMain 詳細資料)
async function getAllOptionCategories(req, res) {
  try {
    const optionCategories = await OptionCategory.findAll({
      include: [
        { model: Option, as: "option" },
        { model: OptionCategoryMain, as: "optionCategoryMain" },
      ],
    });

    return res.status(200).json(optionCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 取得單一 OptionCategory by id
async function getOptionCategoryById(req, res) {
  try {
    const optionCategory = await OptionCategory.findByPk(req.params.id, {
      include: [
        { model: Option, as: "option" },
        { model: OptionCategoryMain, as: "optionCategoryMain" },
      ],
    });

    if (!optionCategory) {
      return res.status(404).json({ message: "找不到 OptionCategory" });
    }
    return res.status(200).json(optionCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 更新 OptionCategory (一般中間表不建議頻繁改動，這裡提供示範)
async function updateOptionCategory(req, res) {
  try {
    const optionCategory = await OptionCategory.findByPk(req.params.id);
    if (!optionCategory) {
      return res.status(404).json({ message: "找不到 OptionCategory" });
    }

    const { option_id, option_category_main_id } = req.body;

    if (option_id) {
      const option = await Option.findByPk(option_id);
      if (!option) {
        return res.status(404).json({ message: "找不到對應的 Option" });
      }
    }
    if (option_category_main_id) {
      const oCategory = await OptionCategoryMain.findByPk(
        option_category_main_id
      );
      if (!oCategory) {
        return res
          .status(404)
          .json({ message: "找不到對應的 OptionCategoryMain" });
      }
    }

    // 更新關聯
    await optionCategory.update({ option_id, option_category_main_id });

    return res.status(200).json(optionCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 刪除 OptionCategory
async function deleteOptionCategory(req, res) {
  try {
    const optionCategory = await OptionCategory.findByPk(req.params.id);
    if (!optionCategory) {
      return res.status(404).json({ message: "找不到 OptionCategory" });
    }
    await optionCategory.destroy();
    return res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOptionCategory,
  getAllOptionCategories,
  getOptionCategoryById,
  updateOptionCategory,
  deleteOptionCategory,
};
