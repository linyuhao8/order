const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "My API",
    description:
      "This project database using TPT (Table-per-Type) design, because of the complexity of the data structure, from the User has been extended down to use syquelize as a communication with postgreSql. 這邊文檔命名都是大寫為後端js Model的name",
  },
  tags: [
    {
      name: "User",
      description:
        "Model: User (Sequelize), Table: users (db table)\n" +
        "1. 關聯：hasOne(Admin), hasMany(Merchant), hasMany(Image)\n" +
        "2. 欄位：id(UUID), name, email, password, phoneNumber, address(text), role(enum: customer, merchant, admin), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Admin",
      description:
        "Model: Admin (Sequelize), Table: admins (db table)\n" +
        "1. 關聯：belongsTo(User)\n" +
        "2. 欄位：id(UUID), user_id(UUID), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Merchant",
      description:
        "Model: Merchant (Sequelize), Table: merchants (db table)\n" +
        "1. 關聯：belongsTo(User), hasMany(Menu), hasMany(ProductOption), hasMany(MerchantCategory), belongsToMany(MerchantCategoryMain through MerchantCategory), belongsTo(Image)\n" +
        "2. 欄位：id(UUID), user_id(UUID), business_name, description, feature(text), merchant_logo(abandoned), location(json or text), image_id(UUID), business_hours(json), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Image",
      description:
        "Model: Image (Sequelize), Table: images (db table)\n" +
        "1. 關聯：belongsTo(User), hasMany(MerchantCategoryMain), hasMany(Merchant)\n" +
        "2. 欄位：id(UUID), filename, url, user_id(UUID), width(int), height(int), size(int), mime_type(string), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "MerchantCategory",
      description:
        "Model: MerchantCategory (Sequelize), Table: merchant_categories (db table)\n" +
        "中介表：Merchant 與 MerchantCategoryMain 的多對多關聯表\n" +
        "1. 關聯：belongsTo(Merchant), belongsTo(MerchantCategoryMain)\n" +
        "2. 欄位：id(UUID), merchant_id(UUID), category_id(UUID)",
    },
    {
      name: "MerchantCategoryMain",
      description:
        "Model: MerchantCategoryMain (Sequelize), Table: merchant_category_mains (db table)\n" +
        "1. 關聯：belongsToMany(Merchant through MerchantCategory), belongsTo(Image)\n" +
        "2. 欄位：id(UUID), name, description, image_id(UUID), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Menu",
      description:
        "Model: Menu (Sequelize), Table: menus (db table)\n" +
        "1. 關聯：belongsTo(Merchant), hasMany(Product)\n" +
        "2. 欄位：id(UUID), name, description, merchant_id(UUID), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Product",
      description:
        "Model: Product (Sequelize), Table: products (db table)\n" +
        "1. 關聯：belongsTo(Menu), belongsToMany(ProductCategoryMain through ProductCategory), belongsToMany(Option through ProductOption)\n" +
        "2. 欄位：id(UUID), name, description, price(float), menu_id(UUID), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "ProductImage",
      description:
        "Model: ProductImage (Sequelize), Table: product_images (db table)\n" +
        "中介表：Product 與 Image 的多對多關聯表\n" +
        "1. 關聯：belongsTo(Product), belongsTo(Image)\n" +
        "2. 欄位：id(UUID), product_id(UUID), image_id(UUID), sort_order(int), is_main(boolean, default: false), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "ProductOption",
      description:
        "Model: ProductOption (Sequelize), Table: product_options (db table)\n" +
        "中介表：Product 與 Option 的多對多關聯表\n" +
        "1. 關聯：belongsTo(Product), belongsTo(Option)\n" +
        "2. 欄位：id(UUID), product_id(UUID), option_id(UUID), required(boolean), sort_order(int), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "Option",
      description:
        "Model: Option (Sequelize), Table: options (db table)\n" +
        "商品選項主表\n" +
        "1. 關聯：hasMany(OptionValue), belongsToMany(Product through ProductOption), belongsToMany(OptionCategoryMain through OptionCategory)\n" +
        "2. 欄位：id(UUID), name, type(enum: select, checkbox, text, number), description(text), min_select(int), max_select(int), user_id(UUID), merchant_id(UUID), is_global(boolean), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "OptionValue",
      description:
        "Model: OptionValue (Sequelize), Table: option_values (db table)\n" +
        "1. 關聯：belongsTo(Option)\n" +
        "2. 欄位：id(UUID), option_id(UUID), value(string), extra_price(float), is_default(boolean), sort_order(int), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "ProductCategory",
      description:
        "Model: ProductCategory (Sequelize), Table: product_categories (db table)\n" +
        "中介表：Product 與 ProductCategoryMain 的多對多關聯\n" +
        "1. 關聯：belongsTo(Product), belongsTo(ProductCategoryMain)\n" +
        "2. 欄位：id(UUID), product_id(UUID), category_id(UUID)",
    },
    {
      name: "ProductCategoryMain",
      description:
        "Model: ProductCategoryMain (Sequelize), Table: product_category_mains (db table)\n" +
        "1. 關聯：belongsToMany(Product through ProductCategory)\n" +
        "2. 欄位：id(UUID), name, description, image_id(UUID), created_at(timestamptz), updated_at(timestamptz)",
    },
    {
      name: "OptionCategory",
      description:
        "Model: OptionCategory (Sequelize), Table: option_categories (db table)\n" +
        "中介表：Option 與 OptionCategoryMain 的多對多關聯\n" +
        "1. 關聯：belongsTo(Option), belongsTo(OptionCategoryMain)\n" +
        "2. 欄位：id(UUID), option_id(UUID), option_category_main_id(UUID)",
    },
    {
      name: "OptionCategoryMain",
      description:
        "Model: OptionCategoryMain (Sequelize), Table: option_category_mains (db table)\n" +
        "1. 關聯：hasMany(OptionCategory)\n" +
        "2. 欄位：id(UUID), name, description, created_at(timestamptz), updated_at(timestamptz)",
    },
  ],

  host: `localhost:${process.env.SERVER_PORT_ENV}`,
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
