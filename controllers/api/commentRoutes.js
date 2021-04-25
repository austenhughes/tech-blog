const router = require("express").Router();
const { Comments } = require("../../models");

router.get("/", async (req, res) => {
    try {
      const allPosts = await Comments.findAll();
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/byPost/:post_id", (req, res) => {
    Comments.findOne({
      where: {
        post_id: req.params.post_id,
      },
    })
      .then((postData) => res.json(postData))
      .catch((err) => res.status(400).json(err));
  });

router.get("/:id", (req, res) => {
    Comments.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => res.json(postData))
      .catch((err) => res.status(400).json(err));
  });

router.post("/newComment", async (req, res) => {
    try {
      const newComment = await Comments.create(req.body);
      req.session.save(() => {
        req.session.comment = newComment.comment;
        req.session.date = newComment.date;
        req.session.post_id = newComment.post_id;
        req.session.user_id = newComment.user_id;
        res.status(200).json(newComment);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/:id', async (req, res) => {
    const newData = await Comments.update(
      {
        comment: req.body.comment,
        date: req.body.date
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
      const deleteComment = await Comments.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleteComment) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;