const router = require("express").Router();
const passport = require("passport");
const { COOKIE_AGE } = require("../express/env");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success!",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failed authentication",
  });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.clearCookie("connect.sid", {
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_AGE },
  });
  res.redirect("http://localhost:3000");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
