export default (sequelize, Sequelize) => {
    const ProductBundle = sequelize.define("bundle_rule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shop: {
        type: Sequelize.STRING,
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
      action_button_text: {
        type: Sequelize.STRING,
      },
      action_button_description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      show_bundle_widget: {
        type: Sequelize.BOOLEAN,
      },
      show_combined_selling_plan: {
        type: Sequelize.BOOLEAN,
      },
      select_subscription_by_default: {
        type: Sequelize.BOOLEAN,
      },
      customer_include_tags: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      sequence_no: {
        type: Sequelize.INTEGER,
      },
      discount_type: {
        type: Sequelize.STRING,
      },
      discount_value: {
        type: Sequelize.STRING,
      },
      bundle_level: {
        type: Sequelize.STRING,
      },
      variants: {
        type: Sequelize.STRING,
      },
      discount_condition: {
        type: Sequelize.STRING,
      },
      bundle_type: {
        type: Sequelize.STRING,
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
  