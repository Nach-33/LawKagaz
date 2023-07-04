const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();
const frontendUri = process.env.FRONTEND_URI;

router.get("/logout", (req, res) => {
  // handled with passport
  req.logout();
  res.redirect(`${frontendUri}/home`);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect(`${frontendUri}/profile`);
});

module.exports = router;
