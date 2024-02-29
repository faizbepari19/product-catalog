const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Product;
};
