import React, { useState } from 'react';

function UpdateClass({ classDetails, teachers, subjects, onClose, onUpdate }) {
  const [routine, setRoutine] = useState(classDetails.routine);
  const [loading, setLoading] = useState(false);

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
    const updatedClassData = {
      class_id: classDetails._id,
      routine,
    };
    try {
      const response = await fetch('https://timetable-routine-2.onrender.com/api/updateClass', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClassData),
      });

      const result = await response.json();
      if (response.ok) {
        onUpdate(updatedClassData);
        onClose();
      } else {
        console.error('Error updating class routine:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-center mb-4">Edit Class Routine</h3>
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">

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
                              onChange={(e) =>
                                handleInputChange(day, periodIndex, 'subject_name', e.target.value)
                              }
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
                              onChange={(e) =>
                                handleInputChange(day, periodIndex, 'teacher_id', e.target.value)
                              }
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
                              onChange={(e) =>
                                handleInputChange(day, periodIndex, 'room_number', e.target.value)
                              }
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

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded-md text-white ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Updating...' : 'Update Routine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateClass;
