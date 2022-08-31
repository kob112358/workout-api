const mongoose = require("mongoose");
const {WORKOUT_TAGS} = require('../express/env.js');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Workout must have a name'],
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    enum: WORKOUT_TAGS 
  }],
  whoCreated: {
    type: String,
    trim: true,
    required: [true, 'Workout must have a who created field'],
  },
  whenCreated: {
    type: Date,
    required: [true, 'Workout must have a when created field'],
  },
  whoUpdated: {
    type: String,
    trim: true,
  },
  whenUpdated: {
    type: Date,
  },
});

//this will run after findByIdAndDelete (which returns the workout) - if you do a different
//delete function, you may need to use different mongoose middleware

//const Product = require('Product')
// workoutSchema.post('findOneAndDelete', async function(workout) {
//   if(workout.lifts.length) {
//     const res = await Product.deleteMany({_id: {$in: farm.products}})
//     console.log(res);
//   }
// })

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
