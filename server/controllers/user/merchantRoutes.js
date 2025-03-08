const Merchant = require("../../config/postgreSql").db.Merchant;
const User = require("../../config/postgreSql").db.User;
const {
  createMerchantValidation,
  updateMerchantValidation,
} = require("../../validations/user/merchantValidation");
const { message } = require("../../validations/user/registerUserValidation");

// 新增商家
const createMerchant = async (req, res) => {
  const { error } = createMerchantValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const {
      user_id,
      business_name,
      description,
      feature,
      merchant_logo,
      location,
    } = req.body;

    // **手動檢查 user_id 是否存在**
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        message: "無效的 user_id，該用戶不存在",
      });
    }

    // 創建商家
    const newMerchant = await Merchant.create({
      user_id,
      business_name,
      description,
      feature,
      merchant_logo,
      location,
    });

    //將role轉成merchat
    user.role = "merchant";
    await user.save();
    return res.status(201).json(newMerchant); // 回傳新增的商家資料
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "創建商家失敗", error });
  }
};

// 查詢所有商家
const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.findAll();
    if (!merchants || merchants.length === 0) {
      return res.status(404).json({ message: "找不到商家" });
    }
    return res.status(200).json(merchants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "查詢商家失敗", error });
  }
};

// 查詢單一商家
const getMerchantById = async (req, res) => {
  try {
    const { id } = req.params;
    const merchant = await Merchant.findOne({
      where: { id },
    });

    if (!merchant) {
      return res.status(404).json({ message: "找不到指定的商家" });
    }

    return res.status(200).json(merchant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "查詢商家失敗", error });
  }
};

// 更新商家資料
const updateMerchant = async (req, res) => {
  const { error, value } = updateMerchantValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  value = requestAnimationFrame.body;
  try {
    const { id } = req.params;
    const {
      user_id,
      business_name,
      description,
      feature,
      merchant_logo,
      location,
    } = req.body;

    // **手動檢查 user_id 是否存在**
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        message: "無效的 user_id，該用戶不存在",
      });
    }
    // 檢查商家是否存在
    const merchant = await Merchant.findOne({
      where: { id },
    });

    if (!merchant) {
      return res.status(404).json({ message: "商家不存在" });
    }

    // 更新商家資料
    await merchant.update({
      user_id,
      business_name,
      description,
      feature,
      merchant_logo,
      location,
    });

    return res.status(200).json({ message: "商家資料更新成功" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "更新商家失敗", error });
  }
};

// 刪除商家
const deleteMerchant = async (req, res) => {
  try {
    const { id } = req.params;

    const merchant = await Merchant.findOne({
      where: { id },
    });
    if (!merchant) {
      return res.status(404).json({ message: "商家不存在" });
    }

    // 刪除商家
    await merchant.destroy();

    //找到user的id
    const user = await User.findByPk(merchant.user_id);
    if (user) {
      // 檢查是否還有其他商家指向這個 user_id
      const merchantCount = await Merchant.count({
        where: { user_id: user.id },
      });

      if (merchantCount === 0) {
        // 如果沒有其他商家，將角色改回 "customer"
        user.role = "customer";
        await user.save();
      }
    }

    return res.status(200).json({ message: "商家已刪除" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "刪除商家失敗", error });
  }
};

//查詢某個user_id的merchant
const getAllMerchantByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "找不到User" });
    }
    if (user.role !== "merchant") {
      return res.status(400).json({ message: "該用戶不是商家" });
    }
    const merchant = await Merchant.findAll({
      where: { user_id: id },
      include: [
        {
          //回傳User相關得資料
          model: User, // 關聯 User 表
          as: "user", 
          //attributes: ["id", "name"],如果只要回傳必要欄位
        },
      ],
    });
    if (merchant.length > 0) {
      return res.status(201).json(merchant);
    } else {
      return res.status(404).json({ message: "沒有商家" });
    }
  } catch (error) {
    return res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 將函數匯出
module.exports = {
  createMerchant,
  getAllMerchants,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
  getAllMerchantByUserId,
};
