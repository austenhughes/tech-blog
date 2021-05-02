const router = require("express").Router();
const { Post } = require("../../models");
const canDelete = require("../../utils/helpers");

// get post+ put delete 
// router.get

router.get("/", async (req, res) => {
    try {
      const allPosts = await Post.findAll();
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => res.json(postData))
      .catch((err) => res.status(400).json(err));
  });

router.post("/newPost", async (req, res) => {
    try {
      const newComment = await Post.create(
        {
          ...req.body, 
          user_id : req.session.user_id
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.put('/update/:id', async (req, res) => {
    const newData = await Post.update(
      {
        date: req.body.date,
        title: req.body.title,
        author: req.body.author,
        post: req.body.post
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(newData);
  });
  
router.delete("/:id", 
canDelete, 
async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: {
          // id: req.params.id,
          user_id: req.session.user_id
        },
      });
      if (!deletePost) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
