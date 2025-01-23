import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password, role });
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); // Save token for authenticated user session
      if (role === 'user') navigate('/user-dashboard');
      else if (role === 'staff') navigate('/staff-dashboard');
      else navigate('/admin-dashboard');
    } catch (error) {
      // alert(error.response ? error.response.data.error : 'Login failed');
      navigate('/user-dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h1>

        {/* Role Selector */}
       {/* Role Selector */}
<div className="mb-6">
  <label className="block text-gray-700 font-medium mb-2">Select Your Role</label>
  <div className="flex space-x-4">
    <button
      type="button"
      onClick={() => setRole('user')}
      className={`py-2 px-4 rounded-lg font-semibold ${
        role === 'user'
          ? 'bg-blue-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } transition`}
    >
      User
    </button>
    <button
      type="button"
      onClick={() => setRole('staff')}
      className={`py-2 px-4 rounded-lg font-semibold ${
        role === 'staff'
          ? 'bg-blue-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } transition`}
    >
      Staff
    </button>
    <button
      type="button"
      onClick={() => setRole('admin')}
      className={`py-2 px-4 rounded-lg font-semibold ${
        role === 'admin'
          ? 'bg-blue-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } transition`}
    >
      Admin
    </button>
  </div>
  <p className="text-sm text-gray-500 mt-2">Your selected role: <span className="font-semibold">{role}</span></p>
</div>


        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
