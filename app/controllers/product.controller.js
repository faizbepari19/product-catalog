const db = require("../models");

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

            shippingFees = calculateShippingFees(productList, shippingRate.rate);

            // Apply special offers
            const discount = calculateDiscount(productList, specialOffers);

            const gstAmount = (subtotal - discount + shippingFees) * (gstInfo.tax_percentage / 100);

            const total = subtotal - discount + shippingFees + gstAmount;

            res.json({
                subtotal,
                shippingFees,
                gst: gstAmount,
                discount,
                total,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }


}

function calculateShippingFees(products, rate) {

    const totalWeight = products.reduce((sum, product) => sum + product.weight * product.quantity, 0);

    return (totalWeight / 100) * rate;
}

function calculateDiscount(products, specialOffers) {
    // Assume that only one offer is applicable at a time

    const applicableOffer = specialOffers.find(offer => isOfferApplicable(products, offer));

    if (applicableOffer) {
        let percent = (applicableOffer.discount_percentage / 100);
        let offeredAmt = calculateOfferedAmount(products);

        return percent * offeredAmt;
    }

    return 0;

}

function isOfferApplicable(products, offer) {
    if (!offer.minimum_quantity || products.length < offer.minimum_quantity) {
        return false;
    }

    if (offer.product_type) {
        const offerProducts = products.filter(product => product.type === offer.product_type);
        return offerProducts.length >= offer.minimum_quantity;
    }

    return true;
}

function calculateOfferedAmount(products) {

    return products.reduce((sum, product) => sum + product.price * product.quantity, 0);

}
