const db = require('../models');
const Taxation = db.taxation;

class TaxationService {

    // Get tax
    async getTaxDetails() {
        try {
            return Taxation.findOne({
                where: { tax_description: 'GST on all products' },
                raw: true
            })
        } catch (error) {
            throw new Error(`Error fetching tax details: ${error.message}`);
        }
    }
}

module.exports = TaxationService;
