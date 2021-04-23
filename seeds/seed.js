const sequelize = require("../config/connection");
const { User, Post, Comments } = require("../models");

const userData = require("./userSeedData.json");
const postData = require("./postSeedData.json");
const commentsData = require("./commentsSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentsData) {
    await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();