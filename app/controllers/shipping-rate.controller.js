const ShippingRateService = require('../services/shipping-rate.service')
const ShippingRate = new ShippingRateService()

const ApiResponse = require('../utils/response');

module.exports = {

    createRate: async (req, res) => {
        try {

            const newItem = await ShippingRate.createRate(req.body.rates);
            res.status(201).json(ApiResponse.success(newItem, 'Shipping rate added!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }
    },

    updateRate: async (req, res) => {
        try {

            const updatedItem = await ShippingRate.updateRate(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(updatedItem, 'Shipping rate updated!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    },

    deleteRate: async (req, res) => {
        try {

            const deletedItem = await ShippingRate.deleteRate(req.params.id);
            res.status(200).json(ApiResponse.success(deletedItem, 'Shipping rate deleted!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    }
}