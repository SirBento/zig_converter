module.exports = (sequelize, DataTypes) => {

    const Rate = sequelize.define("Rate", {
        forexRateZWL: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        forexRateZiG: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        }
    });

    return Rate;
}