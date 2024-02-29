const db = require('../models');
const SpecialOffer = db.special_offers;

class SpecialOfferService {

    // Get all offers
    async getAll() {
        try {
            return SpecialOffer.findAll({
                raw: true
            })
        } catch (error) {
            throw new Error(`Error fetching offers: ${error.message}`);
        }
    }
}

module.exports = SpecialOfferService;
