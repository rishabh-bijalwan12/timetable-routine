import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/GetClassDetails');
        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    fetchClassDetails();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-4xl text-center font-bold text-indigo-600 mb-12">Class List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classData.map((classItem) => (
          <Link
            key={classItem._id}
            to={`/classdetails`}
            state={{ classDetails: classItem }}
            className="bg-gray-100 p-6 rounded-lg border border-gray-300 text-center hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            <div className="text-xl font-semibold text-indigo-600 hover:text-indigo-800">
              {classItem.class_name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
