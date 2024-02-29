const db = require("../models");
const InvoiceCalculator = require('../services/invoice.service');

const Product = db.products;
const ShippingRate = db.shipping_rate;
const SpecialOffer = db.special_offers;
const Taxation = db.taxation;

module.exports = {

    getInvoice: async (req, res) => {
        try {
            const productList = req.body.products;

            const [shippingRates, specialOffers, gstInfo] = await Promise.all([
                ShippingRate.getAll(),
                SpecialOffer.getAll(),
                Taxation.getTax()
            ])

            let subtotal = 0;
            let shippingFees = 0;

            // Calculate subtotal based on product prices
            for (const product of productList) {
                const productInfo = await Product.getProductByName(product.name);
                if (!productInfo) {
                    return res.status(400).json({ error: 'Product not found: ' + product.name });
                }

                subtotal += productInfo.price * product.quantity;
                product.weight = productInfo.weight;
                product.type = productInfo.type;
                product.price = productInfo.price;
            }

            // Calculate shipping fees based on the destination country. Assume all products have the same destination
            const destinationCountry = productList[0].country;
            const shippingRate = shippingRates.find(rate => rate.country === destinationCountry);
            if (!shippingRate) {
                return res.status(400).json({ error: 'Shipping rate not found for country: ' + destinationCountry });
            }

            console.log(shippingRate)

            const invoiceCalculator = new InvoiceCalculator(productList, shippingRate, specialOffers, gstInfo);
            const invoice = invoiceCalculator.generateInvoice();

          

            res.json(invoice);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }


}

