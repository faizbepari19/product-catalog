const products = require("../controllers/product.controller.js");
const { validateProductCreate, validateProductUpdate, validateDelete, validateInvoice } = require('../middlewares/validator.js');

const router = require("express").Router();

module.exports = app => {

    router.post('/', validateProductCreate, products.createProduct);

    router.put('/:id', validateProductUpdate, products.updateProduct);

    router.delete('/:id', validateDelete, products.deleteProduct);

    router.post("/calculate-invoice", validateInvoice, products.getInvoice);

    app.use('/api/product', router);
};
