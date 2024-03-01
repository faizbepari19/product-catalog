const shipping_rate = require("../controllers/shipping-rate.controller.js");
const { validateShippingRateCreate, validateShippingRateUpdate, validateDelete } = require('../middlewares/validator.js');

const router = require("express").Router();

module.exports = app => {

    router.post('/', validateShippingRateCreate, shipping_rate.createRate);

    router.put('/:id', validateShippingRateUpdate, shipping_rate.updateRate);

    router.delete('/:id', validateDelete, shipping_rate.deleteRate);

    app.use('/api/shipping-rate', router);
};
