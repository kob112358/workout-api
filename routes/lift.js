const router = require("express").Router();
const Lift = require("../models/Lift");
const AppError = require("../utils/AppError");
const wrapAsync = require('../utils/WrapAsync')

// const verifyUser = (req, res, next) => {
//     const {user} = req;
//     if(user) {
//       next();
//     }
//     else {
//       console.log('you are not logged in');
//     }
//   }

// router.get("/", verifyUser, async (req, res) => {
//     const lifts = await Lift.find({});
//     res.send(lifts);
//   });

router.get("/", wrapAsync(async (req, res, next) => {
  const lifts = await Lift.find({});
  res.send(lifts);
}));

router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const lift = await Lift.findById(id);
  res.send(lift);
}));

router.put("/:id", wrapAsync(async (req, res) => {
  const product = await Lift.findByIdAndUpdate(req.body.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.send(product);
}));

router.delete("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Lift.findByIdAndDelete(id);
  res.json(id);
}));

router.post("/", wrapAsync(async (req, res) => {
  try {
    const { name, creator, notes, primary, secondary } = req.body;
    const created = new Date();
    let newUrl = "/lift/";
    const newLift = new Lift({
      name: name,
      notes: notes,
      primary: primary,
      secondary: secondary,
      whoCreated: creator,
      whenCreated: created,
    });
    const addLift = await newLift
      .save()
      .then((m) => {
        console.log(`your lift saved - ${m}`);
        newUrl += m._id;
        console.log(newUrl);
      })
      .catch((e) => console.log(`failed - ${e}`));

    res.set("Access-Control-Allow-Origin", envVar.LOCAL_HOST);
    res.json({ redirect: newUrl });
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
}));

module.exports = router;
