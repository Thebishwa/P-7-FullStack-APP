'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Post, User }) {
        // define association here
        this.belongsTo( Post, { foreignKey: 'postId'})
        
        this.belongsTo( User, { foreignKey: 'userId'})
      }
  
  }
  Status.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
    }
  },{
    sequelize,
    tableName: 'status',
    modelName: 'Status',
    timestamps: false,
  });
  return Status;
};
