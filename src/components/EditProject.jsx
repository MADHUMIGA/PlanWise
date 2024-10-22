
// import React from 'react';
// import axios from 'axios';

// const EditProject = ({ currentProject, setCurrentProject, handleChange, setShowEditPopup, setProjects, projects }) => {

//   const handleSave = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/project/update/${currentProject.name}`, currentProject, {
//         withCredentials: true,
//       });

//       const updatedProjects = projects.map((project) => 
//         project.name === currentProject.name ? response.data : project
//       );
//       setProjects(updatedProjects);
//       setShowEditPopup(false);
//     } catch (error) {
//       console.error('Error updating project:', error);
//     }
//   };

//   const handleCancel = () => {
//     setShowEditPopup(false);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Project Name</label>
//           <input 
//             type="text" 
//             name="name" 
//             value={currentProject.name} 
//             onChange={(e) => handleChange(e, true)} 
//             className="mt-1 p-2 w-full border rounded-md"
//             readOnly
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea 
//             name="description" 
//             value={currentProject.description} 
//             onChange={(e) => handleChange(e, true)} 
//             className="mt-1 p-2 w-full border rounded-md"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button 
//             onClick={handleCancel} 
//             className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleSave} 
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProject;



import React, { useState } from 'react';
import axios from 'axios';


const EditProject = ({ project, onChange, onCancel, onSave }) => {
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');


  if (!project) return null;

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.put(
          `http://localhost:8080/project/update/${project.name}`,
          {
            name: project.name,
            description: project.description,
            gitUrl: project.gitUrl, // Ensure this matches the state property
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          onSave('/my-projects'); // Trigger the fetchProjects function after save
          onCancel(); // Close the popup on success
        }
      } catch (error) {
        setSubmitError('Failed to update the project. Please try again.');
        console.error('Error updating project:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!project.name) errors.name = 'Project name is required';
    if (!project.description) errors.description = 'Description is required';
    if (!project.gitUrl) errors.gitUrl = 'Git URL is required'; // Ensure this matches the state property
    return errors;
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            readOnly
            disabled
            value={project.name}
            onChange={(e) => onChange(e, true)} // Pass the edit flag as true
            className="w-full mt-2 p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={(e) => onChange(e, true)} // Pass the edit flag as true
            className="w-full mt-2 p-2 border rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub URL</label>
          <input
            type="text"
            name="gitUrl" // Ensure this matches the state property
            value={project.gitUrl} // Ensure this matches the state property
            onChange={(e) => onChange(e, true)} // Pass the edit flag as true
            className="w-full mt-2 p-2 border rounded"
          />
          {errors.gitUrl && <p className="text-red-500 text-sm">{errors.gitUrl}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#2695d1] text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
