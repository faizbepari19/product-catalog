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

    Taxation.getTax = () => {
        return Taxation.findOne({
            where: { tax_description: 'GST on all products' },
            raw: true
        })
    }

    return Taxation;
};
