'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Reservation.belongsTo(models.User, {
                foreignKey: 'id',
                as: 'user'
            });
            Reservation.belongsTo(models.CoworkingSpace, {
                foreignKey: 'id',
                as: 'coworkingspace'
            });
        }
    }
    Reservation.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            coworkingSpace: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            reservationDate: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            tableName: 'reservations',
            modelName: 'Reservation',
            paranoid: true
        }
    );
    return Reservation;
};
