const db = require('../models');
const Product = db.products;

class ProductService {
    // Create a new product(s)
    async createProduct(productData) {
        try {
            const newProduct = await Product.bulkCreate(productData);
            return newProduct;
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
}

module.exports = ProductService;
