const mongoose = require('mongoose');

const routineWorkoutSchema = new mongoose.Schema({
    routine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routine',
        required: [true, 'Routine/workout mapping must have a routine associated']
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: [true, 'Routine/workout mapping must have a workout associated']
    }
})

const RoutineWorkout = mongoose.model('RoutineWorkout', routineWorkoutSchema);

module.exports = RoutineWorkout;