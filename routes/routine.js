const router = require("express").Router();
const Routine = require("../models/Routine");
const RoutineWorkout = require("../models/RoutineWorkoutMapping");
const wrapAsync = require("../utils/WrapAsync");
const mongoose = require("mongoose");

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    let username = "eric";
    if (req.user?.provider === "github") {
      username = req.user.username;
    }
    if (req.user?.provider === "google") {
      username = req.user.displayName;
    }
    let date = new Date();
    const { notes, routineName } = req.body;
    console.log(date, username);
    const newRoutine = new Routine({
      name: routineName,
      whoCreated: username,
      whenCreated: date,
      notes: notes
    });
    console.log(newRoutine);
    const routine = await newRoutine.save();
    res.send(routine);
  })
);

router.get("/", wrapAsync(async (req, res, next) => {
    const routines = await Routine.find();
    res.send(routines);
}))

router.get("/:id", wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const routine = await Routine.findById(id);
    res.send(routine);
}))

router.put("/:id", wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const {routineName, notes} = req.body;
    const routine = await Routine.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });
    res.json(routine);
}))

router.delete("/:id", wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const routine = await Routine.findByIdAndDelete(id);
    res.send(routine);
}))

router.post(
  "/:id/workout",
  wrapAsync(async (req, res, next) => {
    const { routineId, workoutId, name } = req.body;
    const routineWorkout = new RoutineWorkout({
      routine: routineId,
      workout: workoutId,
      workoutName: name
    });
    const newRoutineWorkout = await routineWorkout.save();
    console.log(newRoutineWorkout);
    res.json(newRoutineWorkout);
  })
);
router.get(
  "/:id/workout",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const routineWorkouts = await RoutineWorkout.find({ routine: id });
    res.send(routineWorkouts);
  })
);
router.delete(
  "/:id/workout",
  wrapAsync(async (req, res, next) => {
    const { id } = req.body;
    const routineWorkoutToDelete = await RoutineWorkout.findByIdAndDelete(id);
    res.send(routineWorkoutToDelete);
  })
);

module.exports = router;
