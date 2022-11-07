module.exports = (app) => {
    const bundles = require("../controller/bundle.controller");
  
    var router = require("express").Router();
  
    // Create a new Bundle
    router.post("/", bundles.create);
  
    // Retrieve all Bundles
    router.get("/", bundles.findAll);
  
    // Delete a Bundle with id
    router.delete("/:id", bundles.delete);
  
    // Update a Bundle with id
    router.put("/:id", bundles.update);
  
    app.use("/api/bundles", router);
  };
  