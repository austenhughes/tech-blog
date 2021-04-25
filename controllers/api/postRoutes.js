const router = require("express").Router();
const { Post } = require("../../models");

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
      const newPost = await Post.create(req.body);
      req.session.save(() => {
        req.session.date = newPost.date;
        req.session.title = newPost.title;
        req.session.author = newPost.author;
        req.session.post = newPost.post;
        req.session.user_id = newPost.user_id;
        res.status(200).json(newPost);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.put('/:id', async (req, res) => {
//     try {
//     const newData = await Post.update(req.body);
//     req.session.save(() => {
//         req.session.date = newData.date;
//         req.session.title = newData.title;
//         req.session.author = newData.author;
//         req.session.post = newData.post;
//         res.status(200).json(newData);
//       },
//       {
//         where: {
//           id: req.params.id,
//         }
//       });
//     } catch (err) {
//         res.status(500).json(err);
//       }
//     });
  

router.put('/update/:id', async (req, res) => {
    const newData = await Post.update(
      {
        date: req.body.date,
        title: req.body.title,
        author: req.body.author,
        posts: req.body.post
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(newData);
  });
  
router.delete("/:id", async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id,
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
