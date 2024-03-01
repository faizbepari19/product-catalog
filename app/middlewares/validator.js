const { body, param, validationResult } = require('express-validator');
const ApiResponse = require('../utils/response');

// Middleware for validating product creation request body
const validateProductCreate = [
    body('products').custom((value) => {
        console.log('val', value)
        // Check if each item in the array has the required properties
        if (!Array.isArray(value)) {
            throw new Error('Products must be an array..');
        }

        for (const product of value) {
            if (!product.name || !product.price || !product.country || !product.weight || !product.type) {
                throw new Error('Invalid product data in the array');
            }
        }

        return true;
    }),
    handleValidationErrors,
];

// Middleware for validating product update
const validateProductUpdate = [
    param('id').notEmpty().isNumeric().withMessage('Product ID missing'),
    body('name').notEmpty().isString(),
    body('price').notEmpty().isNumeric(),
    body('country').notEmpty().isString(),
    body('weight').notEmpty().isNumeric(),
    body('type').notEmpty().isString(),
    handleValidationErrors,
];

// Middleware for validating calculating invoice 
const validateInvoice = [
    body('products').custom((value) => {
        // Check if each item in the array has the required properties
        if (!Array.isArray(value)) {
            throw new Error('Products must be an array');
        }

        for (const product of value) {
            if (!product.name || !product.quantity || !product.country) {
                throw new Error('Invalid product data in the array');
            }
        }

        return true;
    }),
    handleValidationErrors,
];


// Middleware for validating shipping update
const validateShippingRateUpdate = [
    param('id').notEmpty().isNumeric().withMessage('Rate ID missing'),
    body('country').notEmpty().isString(),
    body('rate').notEmpty().isNumeric(),
    handleValidationErrors,
];

const validateShippingRateCreate = [
    body('rates').custom((value) => {
        // Check if each item in the array has the required properties
        if (!Array.isArray(value)) {
            throw new Error('Rates must be an array');
        }

        for (const sp_rate of value) {
            if (!sp_rate.country || !sp_rate.rate ) {
                throw new Error('Invalid rates data in the array');
            }
        }

        return true;
    }),
    handleValidationErrors,
];


// Middleware for validating deletes
const validateDelete= [
    param('id').notEmpty().isNumeric().withMessage('ID is missing/invalid'),
    handleValidationErrors,
];



function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.error(errors.array()[0].msg));
    }
    next();
}

module.exports = {
    validateProductCreate,
    validateProductUpdate,
    validateInvoice,
    validateShippingRateUpdate,
    validateShippingRateCreate,
    validateDelete
};
