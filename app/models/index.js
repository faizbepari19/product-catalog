const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.products = require("./product.model.js")(sequelize, Sequelize);
db.shipping_rate = require("./shipping-rate.model.js")(sequelize, Sequelize);
db.special_offers = require("./special-offer.model.js")(sequelize, Sequelize);
db.taxation = require("./taxation.model.js")(sequelize, Sequelize);



module.exports = db;
