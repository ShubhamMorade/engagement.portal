import React, { useState } from 'react';
import { register } from '../services/api'; // Import the API call function

function RegistrationForm() {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change and reset field-specific errors
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await register({ ...formData, role });
      alert('Registration Successful!');
      // Redirect or clear the form on success
      setFormData({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      });
      setRole('user');
    } catch (error) {
      alert(error.response ? error.response.data.error : 'Error registering user');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
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


        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full p-3 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full p-3 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`block w-full p-3 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Re-enter your password"
            value={formData.confirm_password}
            onChange={handleChange}
            className={`block w-full p-3 border ${
              errors.confirm_password ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300`}
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
