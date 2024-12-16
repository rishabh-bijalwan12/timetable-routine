const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  routine: {
    monday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
    tuesday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
    wednesday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
    thursday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
    friday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
    saturday: [
      {
        subject: { type: String, required: true },
        room: { type: String, required: true },
        time: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoutine' },
      },
    ],
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);
