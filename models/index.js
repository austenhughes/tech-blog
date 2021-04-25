const Post = require('./post');
const User = require('./user');
const Comments = require('./comments')

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

Comments.belongsTo(Post, {
    foreignKey: 'post_id',
});

Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// Comments.belongsTo(User, {
//     foreignKey: "user_id",
// });

// User.hasMany(Comments, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// })
  

module.exports = { User, Post, Comments };
