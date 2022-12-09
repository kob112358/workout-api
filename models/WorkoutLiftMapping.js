const mongoose = require('mongoose');

const workoutLiftSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: [true, 'Workout/lift mapping must have a workout associated']
    },
    lift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lift',
        required: [true, 'Workout/lift mapping must have a lift associated']
    },
    liftName: {
        type: String,
        required: [true, 'Workout/lift mapping must have a workout name included']
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    time: {
        type: Number,
    }
})

const WorkoutLift = mongoose.model('WorkoutLift', workoutLiftSchema);

module.exports = WorkoutLift;