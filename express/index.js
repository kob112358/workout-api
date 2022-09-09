const session = require("express-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("../routes/auth.js");
const liftRoute = require("../routes/lift.js");
const workoutRoute = require("../routes/workout.js");
const passportSetup = require("./passport.js");
const app = express();
const envVar = require("./env.js");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log(err);
  });


const corsOptions = {
  origin: envVar.LOCAL_HOST,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.listen(envVar.PORT, () => {
  console.log(`serving on port ${envVar.PORT}`);
});

app.use("/auth", authRoute);
app.use("/lift", liftRoute);
app.use("/workout", workoutRoute);

app.use((err, req, res, next) => {
  const {status = 500, message = 'You encountered an error'} = err;
  res.status(status).send(message);
})


app.get("/", (req, res) => {
  res.send({ name: "this is localhost:5000" });
});
