"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoworkingSpace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CoworkingSpace.hasMany(models.Reservation, {
        foreignKey: "coworkingspaceId",
      });
    }
  }
  CoworkingSpace.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      openTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closeTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "coworkingspaces",
      modelName: "CoworkingSpace",
      paranoid: true,
    }
  );
  return CoworkingSpace;
};
