import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = ({ onCancel, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gitUrl: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage(''); // Reset the error message when user types
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.gitUrl) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/project/create',
        formData,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      if (response.status === 201) {
        alert("Project created successfully!");
        if (onSaveSuccess) {
          onSaveSuccess(); // Notify parent component on success
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage('Project name already exists. Please choose a different name.');
        } else if (error.response.status === 400) {
          setErrorMessage('Bad request. Please check your input and try again.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create Project</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded"
          />
          <p className="text-gray-500 text-xs mt-1">
        This name cannot be changed once created.</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub URL</label>
          <input
            type="text"
            name="gitUrl"
            value={formData.gitUrl}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded"
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className={`bg-[#2695d1] text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
