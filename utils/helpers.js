const canDelete = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect("/home");
      // res.alert("you can only delete your own posts")
    } else {
      next();
    }
  };
  
  module.exports = canDelete;