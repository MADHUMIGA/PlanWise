import React, { useState } from 'react';
import loginImage from '../assets/login.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/signin', formData, {
        withCredentials: true, // This allows sending/receiving cookies
      });
      if (response.status === 200) {
        alert("Successfully logged in");
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("Email not registered. Please sign up first.");
        } else if (error.response.status === 401) {
          alert("Incorrect password. Please try again.");
        } else {
          alert(`Error logging in: ${error.response.data}`);
        }
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Error message:', error.message);
        alert('Error logging in. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl flex">
        <div className="w-1/2">
          <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="text-grey-dark mt-6 text-center">
              Don't have an account?
              <a className="no-underline border-b border-blue text-blue cursor-pointer"
                onClick={() => navigate("/register")}>
                <span className='text-[#0449a1]'> Sign up</span>
              </a>
            </div>
            <div className="text-center">
              <button type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
