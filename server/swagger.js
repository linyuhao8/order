const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "My API",
    description:
      "This project database using TPT (Table-per-Type) design, because of the complexity of the data structure, from the User has been extended down to use syquelize as a communication with postgreSql.",
  },
  tags: [
    {
      name: "User",
      description:
        "1.hasOne(Admin),hasMany(Merchant),hasMany(Image) 2.id, name, email, password, phoneNumber, address, role",
    },
    {
      name: "Admin",
      description: "1.belongsto(User) 2.id, user_id",
    },
    {
      name: "Merchant",
      description:
        "1.belongsto(User),hasMany(Menu),hasMany(ProductOption),hasMany(MerchantCategory),belongtoMany(ProductCategory),belongto(Image) 2.id, user_id, business_name, description, feature, merchant_logo(abandoned), location, image_id , business_hours",
    },
    {
      name: "Image",
      description:
        "1.belongto(User),hasMany(MCategory),hasMany(Merchant) 2.id, filename, url, user_id, width, height, size, mime_type,timespace",
    },
    {
      name: "MerchantCategory",
      description:
        "1.belongto(Merchant), belongsTo(MCategory) 2.merchant_id , category_id",
    },
    {
      name: "MCategory",
      description:
        "1.belongtoMany(ProductCategory),belongto(Image) 2.id, name , img(abandoned), description , img_id",
    },
    {
      name: "Menu",
      description:
        "1.belongsto(Merchant),hasMany(Product) 2.id, name, description, merchat_id",
    },
    {
      name: "Product",
      description:
        "1.belongsto(Menu), hasMany(ProductImg), belongsToMany(ProductCategory), belongsToMany(ProductOption) 2.id, name, description, price, menu_id",
    },
    {
      name: "ProductImg",
      description:
        "1.belongsto(Product) 2.id, product_id, image_url, title, description",
    },
    {
      name: "ProductOption",
      description:
        "中介表：Product 與 Option 的關聯表。1. BelongsTo(Product), BelongsTo(Option) 2. 欄位：id, product_id, option_id, required(boolean), sort_order(int), created_at, updated_at",
    },
    {
      name: "Option",
      description:
        "商品選項定義。1. HasMany(OptionValue), BelongsToMany(Product through ProductOption), HasMany(OptionCategory) 2. 欄位：id, name, type(enum: select, checkbox, text, number), description(text), min_select(int), max_select(int), user_id(UUID), merchant_id(UUID), is_global(boolean), created_at, updated_at",
    },
    {
      name: "OptionValue",
      description:
        "Option 對應的具體值（選項值）。1. BelongsTo(Option) 2. 欄位：id, option_id, values(string), extra_price(float), is_default(boolean), sort_order(int), created_at, updated_at",
    },
    {
      name: "ProductCategory",
      description:
        "1.belongto(Product), belongsTo(Category) 2.product_id, category_id",
    },
    {
      name: "P_Category",
      description:
        "1.belongtoMany(ProductCategory) 2.id, name, description, img",
    },
    {
      name: "Option_Category",
      description:
        "中介表：Option 與 O_Category 的關聯表。1. BelongsTo(Option), BelongsTo(O_Category) 2. 欄位：id, option_id, o_category_id, created_at, updated_at",
    },
    {
      name: "O_Category",
      description:
        "Option 分類標籤表，用於分類 Option。1. HasMany(OptionCategory) 2. 欄位：id, name, description, created_at, updated_at",
    },
  ],
  host: `localhost:${process.env.SERVER_PORT_ENV}`,
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
