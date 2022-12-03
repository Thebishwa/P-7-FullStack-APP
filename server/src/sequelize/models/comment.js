'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo( Post, { foreignKey: 'postId'})

      this.belongsTo( User, { foreignKey: 'userId'})
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    comText: {
      type: DataTypes.TEXT,
      allowNull:false
    },
  },{
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
    timestamps: true,
    createdAt: 'comCreatedAt',
    updatedAt: 'comUpdatedAt'
  });
  return Comment;
};