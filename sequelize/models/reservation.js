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
                foreignKey: 'id'
            });
            Reservation.belongsTo(models.CoworkingSpace, {
                foreignKey: 'id'
            });
        }
    }
    Reservation.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            coworkingSpaceId: {
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
            // tableName: 'reservations',
            modelName: 'Reservation',
            paranoid: true,
            hooks: {
                beforeValidate: (reservation, options) => {
                    const Joi = require('joi');
                    const _ = require('lodash');
                    const joiSchema = Joi.object({
                        userId: Joi.number(),
                        coworkingSpaceId: Joi.number(),
                        reservationDate: Joi.date()
                    });
                    const { error, value } = joiSchema.validate(_.pick(reservation.dataValues, [...reservation._changed]));
                    if (error) throw new Error(error);
                }
            }
        }
    );
    return Reservation;
};
