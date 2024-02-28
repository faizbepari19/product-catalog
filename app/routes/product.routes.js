const products = require("../controllers/product.controller.js");
const router = require("express").Router();

module.exports = app => {

  router.post("/calculate-invoice", products.getInvoice);

  app.use('/api/product', router);
};
