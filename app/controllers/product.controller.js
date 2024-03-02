const InvoiceCalculator = require('../services/invoice.service');

const ProductService = require('../services/product.service');
const Product = new ProductService()

const ShippingRateService = require('../services/shipping-rate.service')
const ShippingRate = new ShippingRateService()

const SpecialOfferService = require('../services/special-offer.service')
const SpecialOffer = new SpecialOfferService();

const TaxationService = require('../services/taxation.service')
const Taxation = new TaxationService();

const ApiResponse = require('../utils/response');


module.exports = {

    createProduct: async (req, res) => {
        try {

            const newItem = await Product.createProduct(req.body.products);
            res.status(201).json(ApiResponse.success(newItem, 'Products added!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    },

    updateProduct: async (req, res) => {
        try {

            const updatedItem = await Product.updateProduct(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(updatedItem, 'Products updated!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    },

    deleteProduct: async (req, res) => {
        try {

            const deletedItem = await Product.deleteProduct(req.params.id);
            res.status(200).json(ApiResponse.success(deletedItem, 'Products deleted!'))

        } catch (error) {
            console.error(error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    },

    getInvoice: async (req, res) => {
        try {
            const productList = req.body.products;

            const [shippingRates, specialOffers, gstInfo] = await Promise.all([
                ShippingRate.getAll(),
                SpecialOffer.getAll(),
                Taxation.getTaxDetails()
            ])


            // Fetch product attributes needed for invoice
            for (const product of productList) {
                const productInfo = await Product.getProductByName(product.name);
                if (!productInfo) {
                    return res.status(400).json(ApiResponse.error('Product not found: ' + product.name));
                }

                product.weight = productInfo.weight;
                product.type = productInfo.type;
                product.price = productInfo.price;
            }

            // Calculate shipping fees based on the destination country. Assume all products have the same destination
            const destinationCountry = productList[0].country;
            const shippingRate = shippingRates.find(rate => rate.country === destinationCountry);
            if (!shippingRate) {
                return res.status(400).json(ApiResponse.error('Shipping rate not found for country: ' + destinationCountry));
            }

            console.log(shippingRate)

            const invoiceCalculator = new InvoiceCalculator(productList, shippingRate, specialOffers, gstInfo);
            const invoice = invoiceCalculator.generateInvoice();


            res.status(200).json(ApiResponse.success(invoice, 'Invoice details!'))


        } catch (error) {
            console.error('caught', error);
            res.status(error.code || 500).json(ApiResponse.error(error.message || "Something went wrong"));
        }

    }


}

