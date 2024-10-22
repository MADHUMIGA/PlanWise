import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function CreateTaskModal({ isOpen, onClose}) {

  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    status: '',
    type:'',
    priority:'',
    createdAt:'',
    startDate:'',
    endDate:'',
    optimisticEstimate:'',
    mostLikelyEstimate:'',
    pessimisticEstimate:''
  });
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [fetchedEmails, setFetchedEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const selectedProject = useSelector((state) => state.project.selectedProject);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/project/users/${selectedProject.name}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFetchedEmails(response.data);
        console.log(response.data);
      } else {
        console.error('Failed to fetch emails:', response.status);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [selectedProject.name]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Assuming `emailList` contains the list of selected assignees' emails.
    const taskRequestDTO = {
      task: {
          ...formData,
          optimisticEstimate: parseInt(formData.optimisticEstimate) || 0,
          mostLikelyEstimate: parseInt(formData.mostLikelyEstimate) || 0,
          pessimisticEstimate: parseInt(formData.pessimisticEstimate) || 0,
          startDate : new Date(formData.startDate),
          endDate : new Date(formData.endDate)
      },
      assigneeIds: emailList
  };


// const taskRequestDTO = {
//       task: formData,
//       assigneeIds: emailList
//   };
  // const task={
  //   "heading": 'task',
  //   "description": 'sjrnfrj',
  //   "status": 'backlog',
  //   "type":'bug',
  //   "priority":'high',
  //   "createdAt":null,
    
  //   "startDate": '2024-08-23T00:00:00',
  //   "endDate":'2024-08-23T00:00:00',
  //   "optimisticEstimate":4,
  //   "mostLikelyEstimate":7,
  //   "pessimisticEstimate":9,

  // }
//   const taskRequestDTO = {
//     task: task,
//     assigneeIds: ['727722euit100@skcet.ac.in'] // Replace with actual assignee emails or IDs
// };
    
    try {
        const response = await axios.post(`http://localhost:8080/task/create/${selectedProject.name}`,
            taskRequestDTO,
            // task,
            {
                withCredentials: true, 
            }
        );
        if (response.status === 201) {
            alert("Task created successfully!");
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 409) {
                setErrorMessage('Project name already exists. Please choose a different name.');
            } else if (error.response.status === 400) {
                setErrorMessage('Bad request. Please check your input and try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
                console.log(error);
            }
        } else {
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    }
    handleClose(); 
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      // Filter emails based on input
      const filtered = fetchedEmails.filter(email =>
        email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmails(filtered);
      setShowSuggestions(true);
      setErrorMessage(''); // Clear error message when typing
    } else {
      setFilteredEmails([]);
      setShowSuggestions(false);
    }
  };

  const handleAddEmail = (email) => {
    if (email && !emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail('');
      setFilteredEmails([]);
      setShowSuggestions(false);
      setErrorMessage(''); // Clear error message when email is added
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (fetchedEmails.includes(email)) {
        handleAddEmail(email);
      } else {
        setErrorMessage(
          <div className='flex justify-between'>
            <p className="text-gray-500 text-sm mt-2">
              The user({email})  is not in team.
            </p>
          </div>
        );
        setEmail('');
      }
    }
  };


  ////////////////////////////


  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setEmailList([]);
    setErrorMessage('');
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset form fields
    setFormData('');
    setEmailList([]);
    setErrorMessage('');
    onClose();
  };

 

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-2/4 relative grid grid-cols-1 md:grid-cols-2 gap-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-1 col-span-2">Create Task</h2>
        <form onSubmit={handleSubmit} className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* First Column */}
          <div className="mb-2">
            <label className="block mb-1">Task Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-2"
              name="heading"
              value={formData.heading}
             onChange={handleChange}
              
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Description</label>
            <textarea
              className="border border-gray-300 rounded w-full py-1 px-3"
              name="description"
              value={formData.description}
             onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Priority</label>
            <select
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Type</label>
            <select
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="type"
              value={formData.type}
             onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Bug">Bug</option>
              <option value="Story">Story</option>
              <option value="Task">Task</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Status</label>
            <select
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="status"
              value={formData.status}
             onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Backlog">Backlog</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Due Date(expected)</label>
            <input
              type="date"
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="endDate"
              value={formData.endDate}
             onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Most Likely Estimate (days)</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="mostLikelyEstimate"
              value={formData.mostLikelyEstimate}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>

          {/* Second Column */}
          <div className="mb-2">
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="startDate"
              value={formData.startDate}
             onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2">Optimistic Estimate (days)</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="optimisticEstimate"
              value={formData.optimisticEstimate}
             onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>


          <div className="mb-2">
            <label className="block mb-2">Assignee</label>

            <div className="relative">
              <input
                type="text"
                className="border border-gray-300 rounded w-full py-2 px-3"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter assignee emails"
              />

              {showSuggestions && filteredEmails.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredEmails.map((suggestedEmail, index) => (
                    <li
                      key={index}
                      onClick={() => handleAddEmail(suggestedEmail)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestedEmail}
                    </li>
                  ))}
                </ul>
              )}

            </div>
            {errorMessage && (
              <div className="mt-2">
                {errorMessage}
              </div>
            )}
            {emailList.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Members to be assigned:</p>
                <ul className="list-disc list-inside mt-1">
                  {emailList.map((email, index) => (
                    <li key={index} className="text-gray-800">{email}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>



          <div className="mb-2">
            <label className="block mb-2">Pessimistic Estimate (days)</label>
            <input
              type="number"
              className="border border-gray-300 rounded w-full py-2 px-3"
              name="pessimisticEstimate"
              value={formData.pessimisticEstimate}
             onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="flex justify-end col-span-2">
            <button
              type="button"
              className="border border-gray-500 text-gray-500 py-2 px-4 rounded hover:bg-gray-500 hover:text-white transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-[#2695d1] hover:text-white transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
