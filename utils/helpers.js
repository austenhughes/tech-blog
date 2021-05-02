const canUpdate = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect("./home");
    } else {
      // global.window.alert("you do not have permission to edit other peoples posts");
      next();
      // res.redirect("/home");
    }
  };
  
  module.exports = canUpdate;