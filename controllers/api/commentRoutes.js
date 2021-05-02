const router = require("express").Router();
const { Comments, User } = require("../../models");
const canDelete = require("../../utils/helpers");

router.get("/", async (req, res) => {
    try {
      const allPosts = await Comments.findAll();
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/byPost/:post_id", (req, res) => {
    Comments.findAll({
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
      const newComment = await Comments.create(
        {
          ...req.body, 
          user_id : req.session.user_id
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/update/:id', async (req, res) => {
    const newData = await Comments.update(
      {
        date: req.body.date,
        comment: req.body.comment,
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
      const deleteComment = await Comments.destroy({
        where: {
          // id: req.params.id,
          user_id: req.session.user_id
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