const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const ShippingRate = sequelize.define('shipping_rates', {
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    ShippingRate.getAll = () => {
        return ShippingRate.findAll({
            raw: true
        })
    }

    return ShippingRate;
};
