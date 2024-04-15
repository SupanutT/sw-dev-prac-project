'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CoworkingSpace extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CoworkingSpace.hasMany(models.Reservation, {
                foreignKey: 'coworkingSpaceId'
            });
        }
    }
    CoworkingSpace.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            openTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            closeTime: {
                type: DataTypes.TIME,
                allowNull: false
            }
        },
        {
            sequelize,
            // tableName: 'coworkingspaces',
            modelName: 'CoworkingSpace',
            paranoid: true,
            hooks: {
                beforeValidate: (coworkingspace, options) => {
                    const Joi = require('joi');
                    const _ = require('lodash');
                    const joiSchema = Joi.object({
                        name: Joi.string(),
                        address: Joi.string(),
                        phoneNumber: Joi.string(),
                        openTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/), // Time HH:MM
                        closeTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/) // Time HH:MM
                    });
                    const { error, value } = joiSchema.validate(_.pick(coworkingspace.dataValues, [...coworkingspace._changed]));
                    if (error) throw new Error(error);
                }
            }
        }
    );
    return CoworkingSpace;
};
