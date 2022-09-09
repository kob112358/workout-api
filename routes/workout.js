const router = require("express").Router();
const Workout = require("../models/Workout");
const wrapAsync = require("../utils/WrapAsync");

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    let username = "";
    if (req.user.provider === "github") {
      username = "github" + req.user.id;
    }
    if (req.user.provider === "google") {
      username = "google" + req.user.id;
    }
    let date = new Date();
    const { tags, workoutName } = req.body;
    const newWorkout = new Workout({
      name: workoutName,
      tags: tags.map((tag) => tag),
      whoCreated: username,
      whenCreated: date,
    });
    const workout = await newWorkout.save();
    console.log(workout);
    res.send(workout);
  })
);

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { name, tags, _id } = req.body;
    const whenUpdated = new Date();
    console.log(req.body);
    const updatedWorkout = new Workout({
      name: name,
      tags: tags,
      whenUpdated: whenUpdated,
    });
    const workout = await Workout.findByIdAndUpdate(
      _id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.json(workout);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const workouts = await Workout.findById(id);
    res.send(workouts);
  })
);

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const workouts = await Workout.find();
    res.send(workouts);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    res.send(deletedWorkout);
  })
);

router.post(
  "/:id/lift",
  wrapAsync(async (req, res, next) => {})
);

module.exports = router;
//CREATE
// const Lift = mongoose.model('Lift', liftSchema);
// const newLift = new Lift({name: 'bench press', notes: 'keep elbos in', primary: ['chest'], secondary: ['tricep', 'glute']});
// newLift.save();
//READ
//Lift.find({name: 'curl'}).then(data=> {console.log(data)});
//Lift.findOne({name: 'bench press'}).then(data => console.log(data))
//Lift.findOne({version: {$gte: 1}}).then(data => console.log(data))
//UPDATE
//Lift.findOneAndUpdate({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}, {new: true, runValidators: true}).then(m => console.log(m)) <--returns a document (defaults to old document, unless you set new:true) - make sure to add runValidators
//Lift.updateOne({name: 'bench press'}, {notes: 'focus on chest compression'}).then(m => console.log(m)) <--does not return a document
//{$in: []} allows you to include multiple values
//Lift.update({name: {$in: ['bench press', 'curl']}, {notes: 'focus on chest compression'}).then(m => console.log(m))
//DELETE
//Lift.findOneAndDelete({name: 'bench press'}).then(m => console.log(m))
//Lift.remove(...) <--this will remove all instances of the given parameter

//instance method  --used for individual products
// liftSchema.methods.toggleName = async function(newName) {
//   this.name = newName;
//   this.save();
// }
//static method --primarily adding something to all product models
// liftSchema.statics.addAuthor = function () {
//  this.updateMany({}, {author: 'eric'}).then(m => console.log(m))
//}

//liftSchema.virtual('repsSets').get(function () {
// return `${this.lifts} ${this.last}`
//})

//liftSchema.pre('save', function(next) {console.log('this happens before save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter
//liftSchema.post('save', function(next) {console.log('this happens after save'); next()}) --either make it an async function because it returns a promise, or use the next function/parameter
