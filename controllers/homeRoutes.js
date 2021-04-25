const router = require("express").Router();
const { Post, Comments, User } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const allTitles = await Post.findAll().catch((err) => {
    res.json(err);
  });

  const titles = allTitles.map((post) => post.get({ plain: true }));
  res.render("home", { titles });
});

router.get("/home", async (req, res) => {
  const allTitles = await Post.findAll().catch((err) => {
    res.json(err);
  });

  const titles = allTitles.map((post) => post.get({ plain: true }));
  res.render("home", { titles });
});

router.get("/viewNote/:id", async (req, res) => {
    
  const selectedPost = await Post.findAll({
      where: {
        id: req.params.id,
      },
    });

  const selectedPostComments = await Comments.findAll({
      where: {
        post_id: req.params.id,
      },
    });
  
    const thisPost = selectedPost.map((post) => post.get({ plain: true }));
    const thisPostComments = selectedPostComments.map((post) => post.get({ plain: true }));

    res.render("viewNote", { thisPost, thisPostComments });

  });

router.get("/login", (req, res) => {
    res.render("login");
  });

router.get("/newUser", (req, res) => {
    res.render("newUser");
  });

router.get("/newPost", (req, res) => {
    res.render("newPost");
  });

router.get("/newComment", (req, res) => {
    res.render("newComment");
  });

  module.exports = router;
