const router = require("express").Router();
const Workout = require("../models/Workout");
const wrapAsync = require('../utils/WrapAsync');

router.post("/", wrapAsync(async (req, res, next) => {
  let username = "";
  console.log('adding workout');
  if (req.user.provider === "github") {
    username = "github" + req.user.id;
  }
  if (req.user.provider === "google") {
    username = "google" + req.user.id;
  }
  let date = new Date();
  const {lifts, workoutName} = req.body;
  console.log(lifts, workoutName)
  const newWorkout = new Workout({
    name: workoutName,
    lifts: lifts.map(lift => {return {liftId: lift._id, reps: lift.reps, sets: lift.sets}}),
    whoCreated: username,
    whenCreated: date,
  });
  const workout = await newWorkout.save();
  console.log(workout)
  res.send(workout);
}));

router.post("/:id/lift", wrapAsync(async (req, res, next) => {
  
}))

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
