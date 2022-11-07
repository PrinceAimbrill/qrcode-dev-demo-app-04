import React from "react";
import { Card, Grid, Stack, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const initialValues = {
  name: "",
  title: "",
  description: "",
  price_summary: "",
  sequence_no: "",
  minimum_number_of_items: "",
  maximum_number_of_items: "",
};

const BUNDLE_API = "http://localhost:8080/api/bundles";

export function QRCodeForm() {
  const handleBundleSubmit = async (fields) => {
    console.log("fields", fields);
    try {
      const response = await axios.post(BUNDLE_API, fields);
      console.log(response);
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
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleBundleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div className="form-group">
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
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <div className="form-group" style={{ padding: "5px" }}>
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
