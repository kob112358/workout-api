const mongoose = require('mongoose');

const workoutLiftSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: [true, 'Mapping must have a workout associated']
    },
    lift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lift'
    },
    sets: {
        type: Number,
        required: [true, 'Workout mapping must have a number of sets']
    },
    reps: {
        type: Number,
        required: [true, 'Workout mapping must have a number of reps']
    }
})

const WorkoutLift = mongoose.model('WorkoutLift', workoutLiftSchema);

module.exports = WorkoutLift;