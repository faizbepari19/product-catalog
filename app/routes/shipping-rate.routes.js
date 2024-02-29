const shipping_rate = require("../controllers/shipping-rate.controller.js");
const router = require("express").Router();

module.exports = app => {

    router.post('/', shipping_rate.createRate);

    router.put('/:id', shipping_rate.updateRate);

    router.delete('/:id', shipping_rate.deleteRate);

    app.use('/api/shipping-rate', router);
};
