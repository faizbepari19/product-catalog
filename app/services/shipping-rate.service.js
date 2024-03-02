const db = require('../models');
const logger = require('../middlewares/logger');
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
            const newItems = []
            const promises = shippingData.map(async (record) => {
                const [createdRecord, isCreated] = await ShippingRate.findOrCreate({
                    where: { country: record.country, status: 1 },
                    defaults: record
                });

                if (isCreated) {
                    newItems.push(createdRecord);
                }
                logger.info('Shipping rate already present', createdRecord)
                return createdRecord;
            });
            await Promise.all(promises);
            return newItems;
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

    //Get shipping rate by ID
    async getShippingRateByID(rateId) {
        try {
            return ShippingRate.findByPk(rateId);
        } catch (error) {
            throw new Error(`Error getting shipping rate: ${error.message}`);
        }
    }
}

module.exports = ShippingRateService;
