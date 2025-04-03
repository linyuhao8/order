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
        "1.hasOne(Admin),hasMany(Merchant) 2.id, name, email, password, phoneNumber, address, role",
    },
    {
      name: "Admin",
      description: "1.belongsto(User) 2.id, user_id",
    },
    {
      name: "Merchant",
      description:
        "1.belongsto(User),hasMany(Menu),hasMany(ProductOption),hasMany(MerchantCategory),belongtoMany(ProductCategory) 2.id, user_id, business_name, description, feature, merchant_logo, location",
    },
    {
      name: "MerchantCategory",
      description:
        "1.belongto(Merchant), belongsTo(MCategory) 2.merchant_id , category_id",
    },
    {
      name: "MCategory",
      description:
        "1.belongtoMany(ProductCategory) 2.id, name , img, description",
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
        "Middle table 1.belongsto(Product), belongsTo(option), belongsTo(Merchant), belongsTo() 2.id, product_id, option_id, is_custom, merchant_id",
    },
    {
      name: "Option",
      description:
        "1.belongstoMany(ProductOption), hasMany(OptionValue), belongsToMany(Category), belongsTo(Category) 2.id, name, category_id, type",
    },
    {
      name: "OptionValue",
      description:
        "1.belongto(Option) 2.id, option_id, option_values, extra_price.",
    },
    {
      name: "ProductCategory",
      description:
        "1.belongto(Product), belongsTo(Category) 2.product_id, category_id",
    },
    {
      name: "Category",
      description:
        "1.belongtoMany(ProductCategory) 2.id, name, description, img",
    },
  ],
  host: `localhost:${process.env.SERVER_PORT_ENV}`,
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
