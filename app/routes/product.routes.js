const products = require("../controllers/product.controller.js");
const router = require("express").Router();

module.exports = app => {

    router.post('/', products.createProduct);

    router.put('/:id', products.updateProduct);

    router.delete('/:id', products.deleteProduct);

    router.post("/calculate-invoice", products.getInvoice);

    app.use('/api/product', router);
};
