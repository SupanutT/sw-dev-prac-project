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
                foreignKey: 'userId',
                as: 'reservations'
            });
        }
    }
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
            hashedPassword: {
                type: DataTypes.STRING
                // TODO: add validator later on
                // validate: {
                //     is: /^[0-9a-f]{64}$/i
                // }
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            tableName: 'users',
            modelName: 'User',
            paranoid: true
        }
    );
    return User;
};