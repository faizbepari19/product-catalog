const db = require('../models');
const logger = require('../middlewares/logger');
const Product = db.products;

class ProductService {
    // Create a new product(s)
    async createProduct(productData) {
        try {
            const newItems = []
            const promises = productData.map(async (record) => {
                const [createdRecord, isCreated] = await Product.findOrCreate({
                    where: { name: record.name, price: record.price, country: record.country, status: 1 },
                    defaults: record
                });

                if (isCreated) {
                    newItems.push(createdRecord);
                }
                logger.info('Product already present', createdRecord)
                return createdRecord;
            });
            await Promise.all(promises);
            return newItems;
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    // Get product by name
    async getProductByName(name) {
        try {
            const product = await Product.findOne({
                where: { name: name },
                raw: true
            })
            return product;
        } catch (error) {
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }

    // Update product by ID
    async updateProduct(productId, updatedData) {
        try {
            
            await Product.update(updatedData, {
                where: { id: productId },
            });

            return Product.findByPk(productId);

        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    // Delete product by ID
    async deleteProduct(productId) {
        try {
            await Product.update({
                status: 0
            }, {
                where: { id: productId },
            });

            return Product.findByPk(productId);
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    //Get productby ID
    async getProductByID(productId) {
        try {
            return Product.findByPk(productId);
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }

    //Get Poducts
    async getProducts(whereClause) {
        try {
            return Product.findAll({
                where: whereClause
            })
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }
}

module.exports = ProductService;
