import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherHome() {
  const [teacherData, setTeacherData] = useState(null);
  const teacherId = localStorage.getItem("teacherId");
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!teacherId) {
      navigate('/teacherlogin');
    } else {
      const fetchTeacherDetails = async () => {
        try {
          const response = await fetch(`https://timetable-routine-2.onrender.com/GetTeacherData/${teacherId}`);
          const data = await response.json();
          setTeacherData(data);
        } catch (error) {
          console.error('Error fetching teacher details:', error);
        }
      };
      fetchTeacherDetails();
    }
  }, [teacherId, navigate]);

  
  if (!teacherData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  
  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "12:00 - 01:00",
    "01:00 - 02:00"
  ];

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Teacher's Schedule</h2>
      
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-indigo-100 text-indigo-800">
            <th className="border-b p-4 text-left">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border-b p-4 text-center">{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
         
          {teacherData.routine && Object.keys(teacherData.routine).map((day, index) => (
            <tr
              key={index}
              className={`text-gray-800 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}
            >
              
              <td className="border-b p-4 font-semibold">{day}</td>
              
              {timeSlots.map((time, idx) => {
               
                const period = teacherData.routine[day].find(item => item.time === time);
                return (
                  <td key={idx} className="border-b p-4 text-center">
                    {period ? (
                      <span className="font-medium text-blue-600">
                        {period.subject} ({period.room})
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
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

export default TeacherHome;
