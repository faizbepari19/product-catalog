const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Taxation = sequelize.define('taxation', {
        tax_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tax_percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Taxation;
};
