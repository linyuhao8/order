const Menu = require("../config/postgreSql").db.Menu;

// 創建菜單
const createMenu = async (req, res) => {
  try {
    const { name, description, merchant_id } = req.body;
    const newMenu = await Menu.create({ name, description, merchant_id });
    return res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create menu", error });
  }
};

// 獲取所有菜單
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    if (menus.length === 0) {
      return res.status(404).json({ message: "找不到菜單" });
    }
    return res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch menus", error });
  }
};

// 根據 merchant_id 獲取所有菜單
const getMenusByMerchant = async (req, res) => {
  try {
    const { merchant_id } = req.params; // 從URL參數中獲取merchant_id

    // 查詢所有符合 merchant_id 的菜單
    const menus = await Menu.findAll({
      where: {
        merchant_id: merchant_id, // 過濾條件，查找該商家的菜單
      },
    });

    if (menus.length === 0) {
      return res.status(404).json({ message: "找不到菜單" });
    }

    return res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch menus", error });
  }
};

// 根據ID獲取單個菜單
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    return res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch menu", error });
  }
};

// 更新菜單
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, merchant_id } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    menu.name = name || menu.name;
    menu.description = description || menu.description;
    menu.merchant_id = merchant_id || menu.merchant_id;
console.log(merchant_id)
    await menu.save();
    return res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update menu", error });
  }
};

// 刪除菜單
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    await menu.destroy();
    return res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete menu", error });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenusByMerchant,
  getMenuById,
  updateMenu,
  deleteMenu,
};
