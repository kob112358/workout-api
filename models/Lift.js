const mongoose = require('mongoose');
const {MUSCLE_GROUPS} = require('../express/env.js');

const liftSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: [true, 'Workout must have a name'],
    },
    url: String,
    notes: String,
    isTimed: Boolean,
    primary: [{
      type: String,
      enum: MUSCLE_GROUPS
    }],
    secondary: [{
        type: String,
        enum: MUSCLE_GROUPS
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
    version: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  });

const Lift = mongoose.model("Lift", liftSchema);


module.exports = Lift;