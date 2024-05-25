const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String, required: true }],
  icon: { type: String, required: true },
  // createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Workout = mongoose.model('Workout', WorkoutSchema)

module.exports = Workout
