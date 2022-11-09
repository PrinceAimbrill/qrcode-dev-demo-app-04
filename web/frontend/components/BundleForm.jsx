import React, { useEffect, useState } from "react";
import { Card, Grid, Stack, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

/* dayjs is used to capture and format the date a QR code was created or modified */
import dayjs from "dayjs";

const initialValues = {
  shop: "",
  name: "",
  title: "",
  description: "",
  price_summary: "",
  action_button_text: "",
  action_button_description: "",
  status: "",
  show_bundle_widget: true,
  customer_include_tags: "",
  start_date: "",
  end_date: "",
  discount_type: "",
  discount_value: "",
  bundle_level: "",
  variants: "",
  discount_condition: "",
  bundle_type: "",
  show_combined_selling_plan: true,
  select_subscription_by_default: true,
  sequence_no: "",
  minimum_number_of_items: "",
  maximum_number_of_items: "",
};

const BUNDLE_API = "/api/bundles";

export function BundleForm() {
  const { id } = useParams();
  const [formikInitialValue, setFormikInitialValue] = useState({});
  const navigate = useNavigate();

  const initVal = {
    ...formikInitialValue,
    start_date: dayjs(formikInitialValue?.start_date).format("YYYY-DD-MM"),
    end_date: dayjs(formikInitialValue?.end_date).format("YYYY-DD-MM"),
  };

  useEffect(() => {
    if (!id) {
      setFormikInitialValue(initialValues);
    }
    loadBundleById();
  }, []);

  const loadBundleById = async () => {
    try {
      const response = await axios.get(`/api/bundles/${id}`);
      if (response?.status === 200 && id) {
        setFormikInitialValue(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBundleSubmit = async (fields) => {
    try {
      if (parseInt(id)) {
        const response = await axios.patch(`/api/bundles/${id}`, fields);
        console.log(response);
        navigate("/");
      } else {
        const response = await axios.post(BUNDLE_API, fields);
        console.log(response);
        navigate("/");
      }
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
    shop: Yup.string().required("Shop name is required"),
    action_button_text: Yup.string().required("Action button text is required"),
    action_button_description: Yup.string().required("Action button description is required"),
    status: Yup.string().required("Bundle status is required"),
    // show_bundle_widget: true,
    customer_include_tags: Yup.string().required("Customer include tag is required"),
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
    discount_type: Yup.string().required("Discount type is required"),
    discount_value: Yup.string().required("Discount value is required"),
    bundle_level: Yup.string().required("Bundle level is required"),
    variants: Yup.string().required("Variants is required"),
    discount_condition: Yup.string().required("Discount condition is required"),
    bundle_type: Yup.string().required("Bundle type is required"),
    // show_combined_selling_plan: true,
    // select_subscription_by_default: true,
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initVal}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
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
                      <label htmlFor="name">Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={`form-control ${
                          touched.name && errors.name ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Title"
                        className={`form-control ${
                          touched.title && errors.title ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="title"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <Field
                        type="text"
                        name="description"
                        placeholder="Description"
                        className={`form-control ${
                          touched.description && errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="description"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price_summary">Price Summary</label>
                      <Field
                        type="text"
                        name="price_summary"
                        placeholder="Price Summary"
                        className={`form-control ${
                          touched.price_summary && errors.price_summary
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="price_summary"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="action_button_text">
                        Action Button Text
                      </label>
                      <Field
                        type="text"
                        name="action_button_text"
                        placeholder="Action button text"
                        className={`form-control ${
                          touched.action_button_text &&
                          errors.action_button_text
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="action_button_text"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="action_button_description">
                        Action Button Description
                      </label>
                      <Field
                        type="text"
                        name="action_button_description"
                        placeholder="Action button text"
                        className={`form-control ${
                          touched.action_button_description &&
                          errors.action_button_description
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="action_button_description"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Bundle Status</label>
                      <Field
                        type="text"
                        name="status"
                        placeholder="Bundle Status"
                        className={`form-control ${
                          touched.status && errors.status ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="status"
                        className="invalid-feedback"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="show_bundle_widget">
                        Show Bundle Widget
                      </label>
                      <Field
                        type="text"
                        name="show_bundle_widget"
                        placeholder="Show bundle widget"
                        className={`form-control ${
                          touched.show_bundle_widget &&
                          errors.show_bundle_widget
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="show_bundle_widget"
                        className="invalid-feedback"
                      />
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="customer_include_tags">
                        Customer Include Tags
                      </label>
                      <Field
                        type="text"
                        name="customer_include_tags"
                        placeholder="Customer Include Tags"
                        className={`form-control ${
                          touched.customer_include_tags &&
                          errors.customer_include_tags
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="customer_include_tags"
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
                      <label htmlFor="start_date">Start Date</label>
                      <Field
                        type="date"
                        name="start_date"
                        className={`form-control ${
                          touched.start_date && errors.start_date
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="start_date"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="end_date">End Date</label>
                      <Field
                        type="date"
                        name="end_date"
                        className={`form-control ${
                          touched.end_date && errors.end_date
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="end_date"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_type">Discount Type</label>
                      <Field
                        type="text"
                        name="discount_type"
                        placeholder="Discount Type"
                        className={`form-control ${
                          touched.discount_type && errors.discount_type
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_type"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_value">Discount Value</label>
                      <Field
                        type="text"
                        name="discount_value"
                        placeholder="Discount value"
                        className={`form-control ${
                          touched.discount_value && errors.discount_value
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_type"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="discount_condition">
                        Discount Condition
                      </label>
                      <Field
                        type="text"
                        name="discount_condition"
                        placeholder="Discount condition"
                        className={`form-control ${
                          touched.discount_condition &&
                          errors.discount_condition
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="discount_condition"
                        className="invalid-feedback"
                      />
                    </div>
                  </Card>
                  <Card sx={{ p: 3 }}>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="bundle_level">Bundle Level</label>
                      <Field
                        type="text"
                        name="bundle_level"
                        placeholder="Bundle Level"
                        className={`form-control ${
                          touched.bundle_level && errors.bundle_level
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="bundle_level"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group" style={{ padding: "5px" }}>
                      <label htmlFor="bundle_type">Bundle Type</label>
                      <Field
                        type="text"
                        name="bundle_type"
                        placeholder="Bundle Type"
                        className={`form-control ${
                          touched.bundle_type && errors.bundle_type
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="bundle_type"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
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
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
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
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
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
                    </div>

                    <div className="form-group" style={{ padding: "5px" }}>
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
                    </div>
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
