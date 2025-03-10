const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  tags: [
    {
      name: "OptionValue",
      description:
        "1.belongto Option. 2.save id, option_id, option_values, extra_price.",
    },
  ],
  host: `localhost:${process.env.SERVER_PORT_ENV}`,
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
