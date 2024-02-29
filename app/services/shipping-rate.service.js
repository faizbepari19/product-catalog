const db = require('../models');
const ShippingRate = db.shipping_rate;

class ShippingRateService {

    // Get all shipping rates
    async getAll() {
        try {
            return ShippingRate.findAll({
                raw: true
            })
        } catch (error) {
            throw new Error(`Error fetching shipping rates: ${error.message}`);
        }
    }

    // Create a new shipping rate(s)
    async createRate(shippingData) {
        try {
            const newRate = await ShippingRate.bulkCreate(shippingData);
            return newRate;
        } catch (error) {
            throw new Error(`Error creating shipping rate: ${error.message}`);
        }
    }

    // Update shipping rate by ID
    async updateRate(rateId, updatedData) {
        try {
            await ShippingRate.update(updatedData, {
                where: { id: rateId },
            });

            return ShippingRate.findByPk(rateId);
            
        } catch (error) {
            throw new Error(`Error updating shipping rate: ${error.message}`);
        }
    }

    // Delete shipping rate by ID
    async deleteRate(rateId) {
        try {
            await ShippingRate.update({
                status: 0
            }, {
                where: { id: rateId },
            });

            return ShippingRate.findByPk(rateId);
        } catch (error) {
            throw new Error(`Error deleting shipping rate: ${error.message}`);
        }
    }
}

module.exports = ShippingRateService;
