import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        updateErrorState(name, value);
    };

    const updateErrorState = (name, value) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : `${name} is required`,
        }));
    };

    const validateForm = () => {
        const validationSchema = {
            firstName: 'First Name is required',
            lastName: 'Last Name is required',
            email: 'Email is required',
            password: 'Password is required',
        };
        const validationErrors = {};
        Object.entries(validationSchema).forEach(([field, errorMessage]) => {
            if (!formData[field]) {
                validationErrors[field] = errorMessage;
            }
        });
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });

            alert('User registered successfully!');
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('This email is already registered. Please use a different email or login.');
            } else {
                console.error('Error registering user:', error);
                alert('Error registering user. Please try again.');
            }
        }
    };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-5xl mx-auto flex-1 flex items-center justify-center px-2">
                <div className="bg-white rounded shadow-md flex w-full">
                    <div className="w-1/2 bg-[#3c17cf] text-white rounded-r-3xl flex items-center justify-center p-6">
                        <div>
                            <h1 className="text-3xl text-gray-150 font-bold mb-4">Welcome to Our WorkFlowManager</h1>
                            <p className="text-lg">
                                Seamlessly manage your projects, collaborate with your team, and achieve your goals efficiently!
                            </p>
                            <p className="text-lg mt-4">
                                Join us today and experience the power of streamlined project management. Stay on top of your tasks, track progress, and meet your deadlines with ease.
                            </p>
                        </div>
                    </div>
                    <form className="w-1/2 px-8 py-12" onSubmit={handleSubmit}>
                        <h1 className="mb-8 text-3xl text-center text-[#3c17cf]">Sign up</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-2"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            style={{ color: '#0449a1' }}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mb-4">{errors.firstName}</p>
                        )}
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-2"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            style={{ color: '#0449a1' }}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mb-4">{errors.lastName}</p>
                        )}
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-2"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ color: '#0449a1' }}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mb-4">{errors.email}</p>
                        )}
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-2"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{ color: '#0449a1' }}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mb-4">{errors.password}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-[#3c17cf] text-white hover:bg-blue-700 focus:outline-none my-1"
                        >
                            Create Account
                        </button>
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                        <div className="text-grey-dark mt-6 text-center">
                            Already have an account?
                            <a className="no-underline border-b border-blue text-blue cursor-pointer" 
                            onClick={() => navigate("/login")}>
                                <span className='text-[#3c17cf]'>  Login</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
