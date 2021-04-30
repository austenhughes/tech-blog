const router = require("express").Router();
const { Post, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  const allTitles = await Post.findAll().catch((err) => {
    res.json(err);
  });

  const titles = allTitles.map((post) => post.get({ plain: true }));
  res.render("home", { titles, logged_in: req.session.logged_in });
});

router.get("/home", withAuth, async (req, res) => {
  const allTitles = await Post.findAll().catch((err) => {
    res.json(err);
  });

  const titles = allTitles.map((post) => post.get({ plain: true }));
  res.render("home", { titles, logged_in: req.session.logged_in });
});

router.get("/viewNote/:id", withAuth, async (req, res) => {
    
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
    
    res.render("viewNote", { thisPost, thisPostComments, logged_in: req.session.logged_in });

  });

router.get("/updateNote/:id", withAuth, async (req, res) => {
    const selectedPostEdit = await Post.findAll({
        where: {
          id: req.params.id,
        },
      });  
      const thisPostEdit = selectedPostEdit.map((post) => post.get({ plain: true }));
      res.render("UpdateNote", { thisPostEdit, logged_in: req.session.logged_in });
    });

router.get("/login", (req, res) => {
    res.render("login");
  });

// ?
router.get("/updateComment/:id", withAuth, async (req, res) => {
    const selectedCommentEdit = await Comment.findAll({
        where: {
          id: req.params.id,
        },
      });  
      const thisCommentEdit = selectedCommentEdit.map((post) => post.get({ plain: true }));
      res.render("UpdateComment", { thisCommentEdit, logged_in: req.session.logged_in });
    });

router.get("/login", (req, res) => {
    res.render("login");
  });

router.get("/newUser", (req, res) => {
    res.render("newUser");
  });

router.get("/newPost", withAuth, async (req, res) => {
    res.render("newPost", { logged_in: req.session.logged_in });
  });

  module.exports = router;
