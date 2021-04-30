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

  // const posts = await Post.bulkCreate(postData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }

  for (const commentUser of commentsData) {
    await Comments.create({
      ...commentUser,
    });
  }

  process.exit(0);
};

seedDatabase();