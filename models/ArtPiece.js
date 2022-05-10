const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ArtPiece extends Model {}

ArtPiece.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: "user",
          key: "id"
      }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    collection_id : {
        type: DataTypes.INTEGER,
        references: {
            model: "collection",
            key: "id"
        }
    },
    isForSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'artPiece',
  }
);

module.exports = ArtPiece;
