export default (sequelize, Sequelize) => {
  const BundleSetting = sequelize.define("bundle_setting", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shop: {
      type: Sequelize.STRING,
    },
    show_on_product_page: {
      type: Sequelize.BOOLEAN,
    },
    show_multiple_on_product_page: {
      type: Sequelize.BOOLEAN,
    },
    action_button_color: {
      type: Sequelize.STRING,
    },
    action_button_font_color: {
      type: Sequelize.STRING,
    },
    product_title_color: {
      type: Sequelize.STRING,
    },
    product_price_color: {
      type: Sequelize.STRING,
    },
    redirect_to: {
      type: Sequelize.STRING,
    },
    show_product_price: {
      type: Sequelize.BOOLEAN,
    },
    one_time_discount: {
      type: Sequelize.BOOLEAN,
    },
    show_discount_in_cart: {
      type: Sequelize.BOOLEAN,
    },
    selector: {
      type: Sequelize.STRING,
    },
    placement: {
      type: Sequelize.STRING,
    },
    custom_css: {
      type: Sequelize.STRING,
    },
    delivery_frequency: {
      type: Sequelize.STRING,
    },
    per_delivery: {
      type: Sequelize.STRING,
    },
    discount_popup_header: {
      type: Sequelize.STRING,
    },
    discount_popup_amount: {
      type: Sequelize.STRING,
    },
    variants: {
      type: Sequelize.STRING,
    },
    discount_popup_checkout_message: {
      type: Sequelize.STRING,
    },
    discount_popup_buy: {
      type: Sequelize.STRING,
    },
    discount_popup_no: {
      type: Sequelize.STRING,
    },
    show_discount_popup: {
      type: Sequelize.BOOLEAN,
    },
  });

  return BundleSetting;
};
