import dbConfig from "../../web/config/db.config.js";
import Sequelize from "sequelize";
import ProductBundle from "./product.bundling.model.js";
import BundleSetting from "./bundle.settings.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bundles = ProductBundle(sequelize, Sequelize);
db.settings = BundleSetting(sequelize, Sequelize);

export default db;
