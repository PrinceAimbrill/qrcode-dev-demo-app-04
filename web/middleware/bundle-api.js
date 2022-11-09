/*
  The custom REST API to support the app frontend.
  Handlers combine application data from qr-codes-db.js with helpers to merge the Shopify GraphQL Admin API data.
  The Shop is the Shop that the current user belongs to. For example, the shop that is using the app.
  This information is retrieved from the Authorization header, which is decoded from the request.
  The authorization header is added by App Bridge in the frontend code.
*/

import db from "../models/index.js";
const Bundle = db.bundles;

export default function applyBundleApiEndpoints(app) {
  app.post("/api/bundles", async (req, res) => {
    const productData = req.body;
    Bundle.create(productData)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the Product-Bundle.",
        });
      });
  });

  app.get("/api/bundles", async (req, res) => {
    Bundle.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving Product-Bundle.",
        });
      });
  });

  app.delete("/api/bundles/:id", async (req, res) => {
    const id = req.params.id;

    Bundle.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Bundle was deleted successfully.!",
          });
        } else {
          res.send({
            message: `Cannot delete Bundle with id=${id}. Maybe Bundle was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Bundle with id=" + id,
        });
      });
  });

  app.patch("/api/bundles/:id", async (req, res) => {
    const id = req.params.id;

    Bundle.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Bundle was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Bundle with id=${id}. Maybe Bundle was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Bundle with id=" + id,
        });
      });
  });

  app.get("/api/bundles/:id", async (req, res) => {
    const id = req.params.id;

    Bundle.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Bundle with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Bundle with id=" + id,
        });
      });
  });
}
