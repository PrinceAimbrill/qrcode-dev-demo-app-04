import db from ("../models/index.js");
const Bundle = db.bundles;

exports.create = (req, res) => {
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
};
