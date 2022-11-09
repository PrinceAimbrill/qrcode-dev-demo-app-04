import db from "../models/index.js";
const BundleSetting = db.settings;

export default function applyBundleSettingApiEndpoints(app) {

  app.post("/api/bundles/settings", async (req, res) => {
    console.log("API Called.")
    const productData = req.body;
    BundleSetting.create(productData)
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

  app.patch("/api/bundles/settings/:id", async (req, res) => {
    const id = req.params.id;

    BundleSetting.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Bundle settings was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Bundle settings with id=${id}. Maybe Bundle settings was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Bundle settings with id=" + id,
        });
      });
  });

  app.get("/api/bundles/settings/:id", async (req, res) => {
    const id = req.params.id;

    BundleSetting.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Bundle settings with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Bundle settings with id=" + id,
        });
      });
  });
}
