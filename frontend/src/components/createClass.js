import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateClass() {
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [routine, setRoutine] = useState({
    monday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },
    ],
    tuesday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },

    ],
    wednesday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },

    ],
    thursday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },

    ],
    friday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },

    ],
    saturday: [
      { period: 1, start_time: '09:00', end_time: '10:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 2, start_time: '10:00', end_time: '11:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 3, start_time: '12:00', end_time: '01:00', teacher_id: '', subject_name: '', room_number:'' },
      { period: 4, start_time: '01:00', end_time: '02:00', teacher_id: '', subject_name: '', room_number:'' },

    ]
  });


  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([{ name: 'Math' }, { name: 'Physics' },{name : 'Chemistry'},{name : 'Biology'},{name : 'Geography'},{name : 'History'},{name : 'English'}]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminJWT = localStorage.getItem('adminjwt');
    if (!adminJWT) {
      navigate('/adminlogin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await fetch('http://localhost:5000/GetTeacherData');
        const teacherData = await teacherResponse.json();
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (day, periodIndex, field, value) => {
    setRoutine((prevRoutine) => {
      const updatedRoutine = { ...prevRoutine };
      updatedRoutine[day][periodIndex][field] = value;
      return updatedRoutine;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const classData = {
      class_name: className,
      routine: routine,
    };

    try {
      const response = await fetch('http://localhost:5000/api/createClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/adminhome');
      } else {
        console.error('Error creating class routine:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl text-center font-bold text-indigo-600 mb-6">Create Class Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Class Name:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b text-sm font-semibold text-gray-700">Day</th>
                {routine.monday.map((period, periodIndex) => (
                  <th key={periodIndex} className="p-2 border-b text-sm font-semibold text-gray-700">
                    {period.start_time} - {period.end_time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(routine).map((day) => (
                <tr key={day}>
                  <td className="p-2 border-b text-lg font-semibold text-indigo-600">{day}</td>
                  {routine[day].map((period, periodIndex) => (
                    <td key={periodIndex} className="p-2 border-b">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600">Subject:</label>
                          <select
                            value={period.subject_name}
                            onChange={(e) => handleInputChange(day, periodIndex, 'subject_name', e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                          >
                            <option value="">Select Subject</option>
                            {subjects.map((subject, subjectIndex) => (
                              <option key={subjectIndex} value={subject.name}>
                                {subject.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-600">Teacher:</label>
                          <select
                            value={period.teacher_id}
                            onChange={(e) => handleInputChange(day, periodIndex, 'teacher_id', e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                          >
                            <option value="">Select Teacher</option>
                            {teachers.map((teacher) => (
                              <option key={teacher._id} value={teacher._id}>
                                {teacher.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-600">Room:</label>
                          <input
                            type="text"
                            value={period.room_number}
                            onChange={(e) => handleInputChange(day, periodIndex, 'room_number', e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                            placeholder="Room"
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {loading ? 'Creating...' : 'Create Class'}
        </button>

      </form>
    </div>
  );
}

export default CreateClass;