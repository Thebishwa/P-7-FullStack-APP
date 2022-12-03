'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like , Comment, Status }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE'})

      this.hasMany(Like, { foreignKey: 'postId'})

      this.hasMany(Comment, { foreignKey: 'postId'})

      this.hasMany(Status, { foreignKey: 'userId'})
    }
  }
  Post.init({
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    postText: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:true
    },
  },{
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
    timestamps: true,
    // alter: true
  });
  return Post;
};