const mongoose = require('mongoose');

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const classRoutineSchema = new mongoose.Schema({
  class_name:{
    type:String,
    required:true
  },
  routine: {
    monday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher",
        required: true 
      },
      room_number: { type: String, required: true },
    }],
    tuesday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
        required: true 
      },
      room_number: { type: String, required: true },
    }],
    wednesday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
        required: true 
      },
      room_number: { type: String, required: true },
    }],
    thursday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
        required: true 
      },
      room_number: { type: String, required: true },
    }],
    friday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
        required: true 
      },
      room_number: { type: String, required: true },
    }],
    saturday: [{
      period: { type: Number, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
      subject_name: { 
        type: String, 
        required: true 
      },
      teacher_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Teacher", 
        required: true 
      },
      room_number: { type: String, required: true },
    }]
  },
  last_updated: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('ClassRoutine', classRoutineSchema);
