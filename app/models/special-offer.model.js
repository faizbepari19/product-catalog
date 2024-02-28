const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const SpecialOffer = sequelize.define('special_offers', {
        offer_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discount_percentage: {
            type: DataTypes.DECIMAL(5, 2),
        },
        minimum_quantity: {
            type: DataTypes.INTEGER,
        },
        product_type: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    SpecialOffer.getAll = () => {
        return SpecialOffer.findAll({
            raw: true
        })
    }

    return SpecialOffer;
};
