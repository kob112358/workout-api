const router = require("express").Router();
const Workout = require("../models/Workout");
const WorkoutLift = require("../models/WorkoutLiftMapping");
const wrapAsync = require("../utils/WrapAsync");
const mongoose = require("mongoose");

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    let username = "";
    if (req.user.provider === "github") {
      username = req.user.username;
    }
    if (req.user.provider === "google") {
      username = req.user.displayName;
    }
    let date = new Date();
    const { tags, notes, workoutName } = req.body;
    const newWorkout = new Workout({
      name: workoutName,
      tags: tags.map((tag) => tag),
      whoCreated: username,
      whenCreated: date,
      notes: notes
    });
    const workout = await newWorkout.save();
    console.log(workout);
    res.send(workout);
  })
);
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const workouts = await Workout.find();
    res.send(workouts);
  })
);
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    res.send(workout);
  })
);
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { name, tags, _id } = req.body;
    const whenUpdated = new Date();
    const workout = await Workout.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json(workout);
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
  wrapAsync(async (req, res, next) => {
    const { workoutId, liftId, name, sets, reps } = req.body;
    const workoutLift = new WorkoutLift({
      workout: workoutId,
      lift: liftId,
      liftName: name,
      sets: sets,
      reps: reps,
    });
    const newWorkoutLift = await workoutLift.save();
    console.log(newWorkoutLift);
    res.json(newWorkoutLift);
  })
);
router.get(
  "/:id/lift",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const workoutLifts = await WorkoutLift.find({ workout: id });
    res.send(workoutLifts);
  })
);
router.delete(
  "/:id/lift",
  wrapAsync(async (req, res, next) => {
    const { id } = req.body;
    const workoutLiftToDelete = await WorkoutLift.findByIdAndDelete(id);
    res.send(workoutLiftToDelete);
  })
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
