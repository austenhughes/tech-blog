const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Comments extends Model {}

Comments.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: { args: true, msg: "You did not comment" },
        },
    },
    username: {
      type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
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
    modelName: "comments",
  }
);

module.exports = Comments;