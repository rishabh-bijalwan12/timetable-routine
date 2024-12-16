import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

function ClassDetails() {
  const location = useLocation(); 
  const classDetails = location.state?.classDetails; 

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const teacherResponse = await fetch('https://timetable-routine-2.onrender.com/GetTeacherData');
        const teacherData = await teacherResponse.json();
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!classDetails) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const timeSlots = [
    { start_time: '09:00', end_time: '10:00' },
    { start_time: '10:00', end_time: '11:00' },
    { start_time: '12:00', end_time: '01:00' },
    { start_time: '01:00', end_time: '02:00' },
  ];

  const routine = classDetails.routine;
  
  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((teacher) => teacher._id === teacherId); 
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
      <h2 className="text-3xl text-center font-semibold text-indigo-600 mb-6">
        {classDetails.class_name} Schedule
      </h2>

      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-indigo-600 text-white">
     
            <th className="px-4 py-2 text-center">Day/Time</th>

       
            {timeSlots.map((timeSlot, index) => (
              <th key={index} className="px-4 py-2 text-center">
                {timeSlot.start_time} - {timeSlot.end_time}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
            <tr key={day} className="hover:bg-gray-100">
             
              <td className="px-4 py-3 text-center font-medium bg-indigo-100">{day.charAt(0).toUpperCase() + day.slice(1)}</td>

              
              {timeSlots.map((timeSlot, index) => {
                
                const classForTimeSlot = routine[day]?.find(
                  (slot) => slot.start_time === timeSlot.start_time && slot.end_time === timeSlot.end_time
                );

                return (
                  <td key={index} className="px-4 py-3 text-center border border-gray-300">
                    {classForTimeSlot ? (
                      <div className="space-y-1">
                        <div className="font-medium text-indigo-700">{classForTimeSlot.subject_name}</div>
                        <div className="text-xs text-gray-600">{getTeacherName(classForTimeSlot.teacher_id)}</div>
                        <div className="text-xs text-gray-500">{classForTimeSlot.room_number}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400">No class</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassDetails;
