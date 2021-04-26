const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Post extends Model {}

Post.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { args: true, msg: "You must enter a title" },
        },
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { args: true, msg: "You must enter an author" },
        },
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { args: true, msg: "You must create a post" },
        },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;