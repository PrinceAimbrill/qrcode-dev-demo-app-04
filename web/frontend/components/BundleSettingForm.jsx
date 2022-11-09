import React, { useEffect, useState } from "react";
import { Card, Grid, Stack, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

/* dayjs is used to capture and format the date a QR code was created or modified */
import dayjs from "dayjs";

const initialValues = {
  shop: "",
  showOnProductPage: true,
  showMultipleOnProductPage: true,
  actionButtonColor: "",
  actionButtonFontColor: "",
  action_button_text: "",
  productTitleColor: "",
  productPriceColor: "",
  redirect_to: "",
  show_product_price: true,
  one_time_discount: true,
  show_discount_in_cart: true,
  selector: "",
  placement: "",
  custom_css: "",
  variants: "",
  delivery_frequency: "",
  per_delivery: "",
  discount_popup_header: true,
  discount_popup_checkout_message: true,
  discount_popup_buy: "",
  discount_popup_no: "",
  show_discount_popup: true,
};

const BUNDLE_API = "/api/bundles";

export function BundleSetting() {
  const [formikInitialValue, setFormikInitialValue] = useState({});

  console.log(formikInitialValue);

  useEffect(() => {
    loadBundleSettingsById();
  }, []);

  const loadBundleSettingsById = async () => {
    try {
      const response = await axios.get(`/api/bundles/settings/${1}`);
      if (response?.status === 200) {
        setFormikInitialValue(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBundleSubmit = async (fields) => {
    console.log("fields", fields);
    try {
      // const response = await axios.post("/api/bundles/settings", fields);
      // console.log(response);
      const response1 = await axios.patch(`/api/bundles/settings/${1}`, fields);
      console.log(response1);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    title: Yup.string().required("Product title is required"),
    description: Yup.string().required("Product description is required"),
    price_summary: Yup.string().required("Price summary is required"),
    sequence_no: Yup.number().required("Sequence no. is required"),
    minimum_number_of_items: Yup.number().required(
      "minimum number of items is required"
    ),
    maximum_number_of_items: Yup.number().required(
      "Maximum number of items is required"
    ),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formikInitialValue}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
          handleBundleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div className="form-group">
                      <label htmlFor="shop">Shop</label>
                      <Field
                        type="text"
                        name="shop"
                        placeholder="Shop"
                        className={`form-control ${
                          touched.shop && errors.shop ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="shop"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="action_button_color">
                        Action Button Color
                      </label>
                      <Field
                        type="text"
                        name="action_button_color"
                        placeholder="Action button color"
                        className={`form-control ${
                          touched.action_button_color &&
                          errors.action_button_color
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="action_button_color"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="action_button_font_color">
                        Action Button Font Color
                      </label>
                      <Field
                        type="text"
                        name="action_button_font_color"
                        placeholder="Action button font color"
                        className={`form-control ${
                          touched.action_button_font_color &&
                          errors.action_button_font_color
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="action_button_font_color"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="product_title_color">
                        Product Title Color
                      </label>
                      <Field
                        type="text"
                        name="product_title_color"
                        placeholder="Product title color"
                        className={`form-control ${
                          touched.product_title_color &&
                          errors.product_title_color
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="product_title_color"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price_color">
                        Product Price Color
                      </label>
                      <Field
                        type="text"
                        name="product_price_color"
                        placeholder="Product Price Color"
                        className={`form-control ${
                          touched.product_price_color &&
                          errors.product_price_color
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="product_price_color"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="redirect_to">Redirect To</label>
                      <Field
                        type="text"
                        name="redirect_to"
                        placeholder="Redirect To"
                        className={`form-control ${
                          touched.redirect_to && errors.redirect_to
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="redirect_to"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="selector">Selector</label>
                      <Field
                        type="text"
                        name="selector"
                        placeholder="Selector"
                        className={`form-control ${
                          touched.selector && errors.selector
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="selector"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="placement">Placement</label>
                      <Field
                        type="text"
                        name="placement"
                        placeholder="Placement"
                        className={`form-control ${
                          touched.placement && errors.placement
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="placement"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="custom_css">Custom CSS</label>
                      <Field
                        type="text"
                        name="custom_css"
                        placeholder="Custom CSS"
                        className={`form-control ${
                          touched.custom_css && errors.custom_css
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="custom_css"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="delivery_frequency">
                        Delivery Frequency
                      </label>
                      <Field
                        type="text"
                        name="delivery_frequency"
                        placeholder="Delivery Frequency"
                        className={`form-control ${
                          touched.delivery_frequency &&
                          errors.delivery_frequency
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="delivery_frequency"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="variants">Variants</label>
                      <Field
                        type="text"
                        name="variants"
                        placeholder="Variants"
                        className={`form-control ${
                          touched.variants && errors.variants
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="variants"
                        className="invalid-feedback"
                      />
                    </div>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="per_delivery">Per Delivery</label>
                      <Field
                        type="text"
                        name="per_delivery"
                        placeholder="Per delivery"
                        className={`form-control ${
                          touched.per_delivery && errors.per_delivery
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="per_delivery"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_popup_header">
                        Discount Popup Header
                      </label>
                      <Field
                        type="date"
                        name="discount_popup_header"
                        placeholder="Discount Popup Header"
                        className={`form-control ${
                          touched.discount_popup_header &&
                          errors.discount_popup_header
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_popup_header"
                        className="invalid-feedback"
                      />
                    </div> */}

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_popup_amount">Discount Popup Amount</label>
                      <Field
                        type="text"
                        name="discount_popup_amount"
                        placeholder="Discount popup amount"
                        className={`form-control ${
                          touched.discount_popup_amount && errors.discount_popup_amount
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_popup_amount"
                        className="invalid-feedback"
                      />
                    </div> */}
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_popup_checkout_message">
                        Discount Popup Checkout Message
                      </label>
                      <Field
                        type="text"
                        name="discount_popup_checkout_message"
                        placeholder="Discount popup checkout message"
                        className={`form-control ${
                          touched.discount_popup_checkout_message &&
                          errors.discount_popup_checkout_message
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_popup_checkout_message"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_popup_buy">
                        Discount Popup Buy
                      </label>
                      <Field
                        type="text"
                        name="discount_popup_buy"
                        placeholder="Discount popup buy"
                        className={`form-control ${
                          touched.discount_popup_buy &&
                          errors.discount_popup_buy
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_popup_buy"
                        className="invalid-feedback"
                      />
                    </div>
                  </Card>
                  <Card sx={{ p: 3 }}>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_popup_no">
                        Discount Popup No.
                      </label>
                      <Field
                        type="text"
                        name="discount_popup_no"
                        placeholder="Discount popup no."
                        className={`form-control ${
                          touched.discount_popup_no && errors.discount_popup_no
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_popup_no"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="show_discount_popup">Show Discount Popup</label>
                      <Field
                        type="text"
                        name="show_discount_popup"
                        placeholder="Bundle Type"
                        className={`form-control ${
                          touched.show_discount_popup && errors.show_discount_popup
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="show_discount_popup"
                        className="invalid-feedback"
                      />
                    </div> */}

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="show_combined_selling_plan">
                        Show combined selling plan
                      </label>
                      <Field
                        type="text"
                        name="show_combined_selling_plan"
                        placeholder="Show combined selling plan"
                        className={`form-control ${
                          touched.show_combined_selling_plan &&
                          errors.show_combined_selling_plan
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="show_combined_selling_plan"
                        className="invalid-feedback"
                      />
                    </div> */}

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="sequence_no">Sequence no</label>
                      <Field
                        type="number"
                        name="sequence_no"
                        placeholder="Sequence no"
                        className={`form-control ${
                          touched.sequence_no && errors.sequence_no
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="sequence_no"
                        className="invalid-feedback"
                      />
                    </div> */}

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="minimum_number_of_items">
                        Minimum number of items
                      </label>
                      <Field
                        type="number"
                        name="minimum_number_of_items"
                        placeholder="Minimum number of items"
                        className={`form-control ${
                          touched.minimum_number_of_items &&
                          errors.minimum_number_of_items
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="minimum_number_of_items"
                        className="invalid-feedback"
                      />
                    </div> */}

                    {/* <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="maximum_number_of_items">
                        Maximum number of items
                      </label>
                      <Field
                        type="number"
                        name="maximum_number_of_items"
                        placeholder="Maximum number of items"
                        className={`form-control ${
                          touched.maximum_number_of_items &&
                          errors.maximum_number_of_items
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="maximum_number_of_items"
                        className="invalid-feedback"
                      />
                    </div> */}
                  </Card>
                  <Button
                    type="submit"
                    sx={{
                      color: "rgb(255, 255, 255)",
                      backgroundColor: "#008060",
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
