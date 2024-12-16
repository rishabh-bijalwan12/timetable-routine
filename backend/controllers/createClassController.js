const ClassRoutine = require('../models/classScheduleModel');
const Teacher = require('../models/teacherModel');
const Notification = require('../models/notificationModel')

// Create class routine
const createClassRoutine = async (req, res) => {
  try {
    const { class_name, routine } = req.body;

    if (!class_name || !routine) {
      return res.status(400).json({ error: "Class name and routine are required" });
    }

    const newRoutine = new ClassRoutine({
      class_name,
      routine,
    });

    await newRoutine.save();

    // Iterate through the routine to update teachers
    for (const day in routine) {
      for (const period of routine[day]) {
        const teacherId = period.teacher_id || null; // Ensure teacherId is valid

        if (teacherId) {
          const teacher = await Teacher.findById(teacherId);

          if (teacher) {
            const teacherRoutineUpdate = {
              subject: period.subject_name,
              room: period.room_number,
              time: `${period.start_time} - ${period.end_time}`,
              class_id: newRoutine._id, // Directly use the created class ID
            };

            teacher.routine[day].push(teacherRoutineUpdate);

            await teacher.save();
          }
        }
      }
    }

    res.status(201).json({
      message: "Class routine created successfully!",
      routine: newRoutine,
    });
  } catch (error) {
    console.error("Error creating class routine:", error);
    res.status(500).json({ error: "Failed to create class routine", details: error.message });
  }
};

//update class routine
const updateRoutine = async (req, res) => {
  try {
    const { class_id, routine } = req.body;

    if (!class_id || !routine) {
      return res.status(400).json({ message: "Class ID and new routine are required" });
    }

    // Function to remove slots with the given class_id
    async function removeSlots(classid) {
      try {
        const teachers = await Teacher.find();

        for (let teacher of teachers) {
          await Teacher.updateOne(
            { _id: teacher._id, 'routine.monday.class_id': classid },
            { $pull: { 'routine.monday': { class_id: classid } } }
          );

          await Teacher.updateOne(
            { _id: teacher._id, 'routine.tuesday.class_id': classid },
            { $pull: { 'routine.tuesday': { class_id: classid } } }
          );

          await Teacher.updateOne(
            { _id: teacher._id, 'routine.wednesday.class_id': classid },
            { $pull: { 'routine.wednesday': { class_id: classid } } }
          );

          await Teacher.updateOne(
            { _id: teacher._id, 'routine.thursday.class_id': classid },
            { $pull: { 'routine.thursday': { class_id: classid } } }
          );

          await Teacher.updateOne(
            { _id: teacher._id, 'routine.friday.class_id': classid },
            { $pull: { 'routine.friday': { class_id: classid } } }
          );

          await Teacher.updateOne(
            { _id: teacher._id, 'routine.saturday.class_id': classid },
            { $pull: { 'routine.saturday': { class_id: classid } } }
          );
        }

      } catch (err) {
        console.error(err);
      }
    }

    await removeSlots(class_id);

    const classDetails = await ClassRoutine.findById(class_id, { 
      routine: 1, 
      className: 1, 
      _id: 0 
    });

    const classdata = await ClassRoutine.findById(class_id, { class_name: 1, _id: 0 });
 
    const prevRoutine=classDetails.routine;

    const updatedRoutine = await ClassRoutine.findByIdAndUpdate(
      class_id,
      { $set: { routine } },
      { new: true }
    );

    for (const day in routine) {
      for (const period of routine[day]) {
        const teacherId = period.teacher_id || null; // Ensure teacherId is valid

        if (teacherId) {
          const teacher = await Teacher.findById(teacherId);

          if (teacher) {
            const teacherRoutineUpdate = {
              subject: period.subject_name,
              room: period.room_number,
              time: `${period.start_time} - ${period.end_time}`,
              class_id: updatedRoutine._id, // Use the updated class ID
            };

            teacher.routine[day].push(teacherRoutineUpdate);

            await teacher.save();
          }
        }
      }
    }

    const notifications = [];

    const fixedSlots = ['09:00-10:00', '10:00-11:00', '12:00-01:00', '01:00-02:00'];
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    for (const day of days) {
      const prevDayPeriods = prevRoutine[day] || [];
      const updatedDayPeriods = routine[day] || [];
    
      let i = 0; // Pointer for prevDayPeriods
      let j = 0; // Pointer for updatedDayPeriods
    
      while (i < prevDayPeriods.length && j < updatedDayPeriods.length) {
        const prevPeriod = prevDayPeriods[i];
        const updatedPeriod = updatedDayPeriods[j];
    
        if (prevPeriod && updatedPeriod) {
          const prevKey = `${prevPeriod.period}`;
          const updatedKey = `${updatedPeriod.period}`;
    
          if (prevKey === updatedKey) {
            if (
              prevPeriod.subject_name !== updatedPeriod.subject_name ||
              prevPeriod.room_number !== updatedPeriod.room_number
            ) {
              if (prevPeriod.subject_name !== updatedPeriod.subject_name) {
                notifications.push({
                  message: `Subject changed for ${day} at ${prevPeriod.start_time} - ${prevPeriod.end_time} from ${prevPeriod.subject_name} to ${updatedPeriod.subject_name}`
                });
              }
              if (prevPeriod.room_number !== updatedPeriod.room_number) {
                notifications.push({
                  message: `Room number changed for ${day} at ${prevPeriod.start_time} - ${prevPeriod.end_time} from ${prevPeriod.room_number} to ${updatedPeriod.room_number}`
                });
              }
            }
          }
        }
        i++;
        j++;
      }
    }
    
    const databaseNotification = [] ;
    databaseNotification.push({
      message: `Routine changed for ${classdata.class_name}`,
      details: notifications
    });
    
    if (databaseNotification.length > 0) {
      await Notification.insertMany(databaseNotification);
    }
    

    return res.status(200).json({
      message: "Class ID updated with new routine successfully",
    });

  } catch (error) {
    console.error("Error updating routine:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

};

//get class details
const GetClassDetails = async (req, res) => {
  try {
    const classSchedule = await ClassRoutine.find()
    res.json(classSchedule);
  } catch (error) {
    console.error("Error fetching class data:", error);
    res.status(500).json({ error: "Failed to fetch class data" });
  }
}

module.exports = { createClassRoutine, updateRoutine, GetClassDetails };
