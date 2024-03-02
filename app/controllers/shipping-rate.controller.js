const ShippingRateService = require('../services/shipping-rate.service')
const ShippingRate = new ShippingRateService()

const ApiResponse = require('../utils/response');

module.exports = {

    createRate: async (req, res) => {
        try {

            const newItem = await ShippingRate.createRate(req.body.rates);
            if (!newItem.length) {
                return res.status(400).json(ApiResponse.error("No items were added!"));
            }
            res.status(201).json(ApiResponse.success(newItem, 'Shipping rate added!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }
    },

    updateRate: async (req, res) => {
        try {
            const exists = await ShippingRate.getShippingRateByID(req.params.id);
            if (!exists) {
                return res.status(400).json(ApiResponse.error("Shipping ID does not exists!"));
            }

            if (!exists.status) {
                return res.status(400).json(ApiResponse.error("Cannot update a deleted entity!"));
            }

            if (exists.country != req.body.country) {
                return res.status(400).json(ApiResponse.error("Cannot change country!"));
            }
            const updatedItem = await ShippingRate.updateRate(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(updatedItem, 'Shipping rate updated!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    },

    deleteRate: async (req, res) => {
        try {
            const exists = await ShippingRate.getShippingRateByID(req.params.id);
            if (!exists) {
                return res.status(400).json(ApiResponse.error("Shipping ID does not exists!"));
            }
            
            const deletedItem = await ShippingRate.deleteRate(req.params.id);
            res.status(200).json(ApiResponse.success(deletedItem, 'Shipping rate deleted!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    }
}