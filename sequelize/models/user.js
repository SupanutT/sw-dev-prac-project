'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Reservation, {
                foreignKey: 'userId'
            });
        }
    }

    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING
                // TODO: add validator later on
                // validate: {
                //     is: /^[0-9a-f]{64}$/i
                // }
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
                allowNull: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            activateAccountExpire: {
                type: DataTypes.DATE
            },
            activateAccountToken: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            // tableName: 'users',
            modelName: 'User',
            paranoid: true,
            hooks: {
                beforeCreate: async (user, options) => {
                    const hashedPassword = await hashPassword(user.password);
                    user.password = hashedPassword;
                },
                beforeValidate: (user, options) => {
                    const Joi = require('joi');
                    const _ = require('lodash');
                    const joiSchema = Joi.object({
                        firstName: Joi.string(),
                        lastName: Joi.string(),
                        phoneNumber: Joi.string(),
                        email: Joi.string(),
                        password: Joi.string(),
                        role: Joi.string().valid('admin', 'user'),
                        isActive: Joi.boolean(),
                        activateAccountExpire: Joi.date(),
                        activateAccountToken: Joi.string()
                    });
                    const { error, value } = joiSchema.validate(_.pick(user.dataValues, [...user._changed]));
                    if (error) throw new Error(error);
                }
            }
        }
    );

    User.prototype.getSignedJwtToken = function () {
        return jwt.sign({ id: this.dataValues.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
    };

    User.prototype.matchPassword = async function (enteredPassword) {
        return bcrypt.compare(enteredPassword, this.dataValues.password);
    };

    return User;
};
