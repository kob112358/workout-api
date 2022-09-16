const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Routine must have a name'],
      },
      notes: {
        type: String,
        trim: true
      },
      whoCreated: {
        type: String,
        trim: true,
        required: [true, 'Routine must have a who created field'],
      },
      whenCreated: {
        type: Date,
        required: [true, 'Routine must have a when created field'],
      },
      whoUpdated: {
        type: String,
        trim: true,
      },
      whenUpdated: {
        type: Date,
      }
});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;