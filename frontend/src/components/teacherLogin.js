import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/login/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('teacherjwt', data.token);
        localStorage.setItem('teacherId', data._id);
        setMessage('Login successful!');
        navigate('/teacherhome');
      } else {
        setMessage(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
    >
      <div className="p-8 rounded shadow-md w-full max-w-md m-12 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Teacher Login</h2>
        {message && (
          <div
            className={`mb-4 text-center text-sm font-medium ${
              message === 'Login successful!' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} >
          <div className="mb-4 z-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeacherLogin;
