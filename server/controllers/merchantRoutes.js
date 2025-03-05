const Merchant = require("../config/postgreSql").db.Merchant;
// 新增商家
const createMerchant = async (req, res) => {
  try {
    const {
      user_id,
      business_name,
      description,
      feature,
      merchant_logo,
      location,
    } = req.body;

    // 檢查必填欄位
    if (!user_id || !business_name) {
      return res.status(400).json({ message: "User ID 和商家名稱為必填" });
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

    return res.status(200).json({ message: "商家已刪除" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "刪除商家失敗", error });
  }
};

// 將函數匯出
module.exports = {
  createMerchant,
  getAllMerchants,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
};
