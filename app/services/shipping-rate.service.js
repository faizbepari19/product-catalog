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
}

module.exports = ShippingRateService;
