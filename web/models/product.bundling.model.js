export default (sequelize, Sequelize) => {
    const ProductBundle = sequelize.define("bundle_rule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price_summary: {
        type: Sequelize.STRING,
      },
      sequence_no: {
        type: Sequelize.INTEGER,
      },
      minimum_number_of_items: {
        type: Sequelize.INTEGER,
      },
      maximum_number_of_items: {
        type: Sequelize.INTEGER,
      },
    });
  
    return ProductBundle;
  };
  