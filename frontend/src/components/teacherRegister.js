import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    const adminJWT = localStorage.getItem('adminjwt');
    if (!adminJWT) {
      navigate('/adminlogin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const teacherData = { name, email, password };

    try {
      const response = await fetch('https://timetable-routine-2.onrender.com/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Teacher registered successfully!');
        navigate('/adminhome')
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="p-8 rounded shadow-md w-full max-w-md m-12 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Teacher Registration</h2>
        {message && (
          <div
            className={`mb-4 text-center text-sm font-medium ${
              message === 'Teacher registered successfully!' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherRegister;
    