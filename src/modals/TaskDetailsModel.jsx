import React, { useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow, format } from "date-fns";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import avatar from '../assets/profile.svg';


const TaskDetailsModal = ({ task, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  // const handleTagChange = (e) => {
  //   setEditedTask({
  //     ...editedTask,
  //     assignee: e.target.value.split(',').map(tag => tag.trim()),
  //   });
  // };

  const handleSave = () => {
    // Add save logic here
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleDelete = async  () => {
    try {
      const response = await axios.delete(`http://localhost:8080/task/delete/${task.id}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.status === 200) {
      
        console.log(response.data);
      } else {
        console.error('Failed to delete task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    console.log("delete");
  };



  // Ensure task.endDate is valid
  const endDate = task.endDate ? new Date(task.endDate) : null;

  // Check if the date is valid before formatting
  const formattedEndDate = endDate && !isNaN(endDate)
    ? format(endDate, 'dd-MM-yyyy')
    : 'Invalid Date';
  //
  // Ensure task.endDate is valid
  const startDate = task.startDate ? new Date(task.startDate) : null;

  // Check if the date is valid before formatting
  const formattedStartDate = endDate && !isNaN(startDate)
    ? format(startDate, 'dd-MM-yyyy')
    : 'Invalid Date';


  return (
      <>
    


        {isEditing ? (
            <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      // onClick={handleOutsideClick}
    >
            <div className="bg-white p-4 rounded-lg shadow-lg w-2/4 relative grid grid-cols-1 md:grid-cols-2 gap-4" >
              <h2 className="text-lg font-bold mb-1 col-span-2">Edit Task</h2>
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* First Column */}
                <div className="mb-2">
                  <label className="block mb-1">Task Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-full py-2 px-2"
                    name="heading"
                    value={editedTask.heading}
                    onChange={handleChange}

                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Description</label>
                  <textarea
                    className="border border-gray-300 rounded w-full py-1 px-3"
                    name="description"
                    value={editedTask.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Priority</label>
                  <select
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    name="priority"
                    value={editedTask.priority}
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
                    value={editedTask.type}
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
                    value={editedTask.status}
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
                    value={editedTask.endDate}
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
                    value={

                      editedTask
                        .mostLikelyEstimate}
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
                    value={

                      editedTask
                        .startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-2">Optimistic Estimate (days)</label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    name="optimisticEstimate"
                    value={

                      editedTask
                        .optimisticEstimate}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>

                
                {/* <div className="mb-2">
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
                </div> */}


                <div className="mb-2">
                  <label className="block mb-2">Pessimistic Estimate (days)</label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    name="pessimisticEstimate"
                    value={

                      editedTask
                        .pessimisticEstimate}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
            <div className="flex justify-end col-span-2">
              <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleSave} className="bg-[#2695d1] text-white px-4 py-2 rounded">Save</button>
            </div>
              </div>
            </div>
            
          </div>
        ) : (
          
          <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
          <div className="bg-white  p-4 rounded-lg shadow-lg w-2/4 relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{task.heading}</h2>
              <div>

              <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 font-bold ">
                <FaEdit />
              </button>
              <button onClick={handleDelete} className="text-red-500 w-6  h-4 font-bold ml-2">
              <MdDelete />
              </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">{task.description}</p>
            <div className="text-sm text-gray-700 mb-2">
              <p>Created : {formatDistanceToNow(new Date(task.createdAt))} ago</p>
              <p>Due Date : {formattedEndDate}</p>
              <p>Start Date : {formattedStartDate}</p>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <p>Priority : {task.priority}</p>
              <p>Type : {task.type}</p>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              {/* <p>Assignee : {task.assignee.join(', ')}</p> */}
              <p>Status : {task.status}</p>
            </div>
            <div className=" flex justify-between text-sm text-gray-700 mb-2">
              <p>CreatedBy : {task.createdBy}</p>
              <div className="flex -space-x-2">
                {task.assigneeEmails.map((email, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={avatar} // Replace with the actual path to your avatar image
                      alt="Assignee Avatar"
                      className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                      />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                        {email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

      </div>
      </div>
          
        )}
     </>
  );
};

export default TaskDetailsModal;



// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "text-red-500";
//     case "Medium":
//       return "text-yellow-500";
//     case "Low":
//       return "text-green-500";
//     default:
//       return "";
//   }
// };

// const getPriorityIcon = (priority) => {
//   switch (priority) {
//     case "High":
//       return "🔴";
//     case "Medium":
//       return "🟡";
//     case "Low":
//       return "🟢";
//     default:
//       return "";
//   }
// };

// const getTypeColor = (type) => {
//   switch (type) {
//     case "Bug":
//       return "text-red-500";
//     case "Story":
//       return "text-blue-500";
//     case "Task":
//       return "text-green-500";
//     default:
//       return "";
//   }
// };

// const getTypeIcon = (type) => {
//   switch (type) {
//     case "Bug":
//       return "🐛";
//     case "Story":
//       return "📖";
//     case "Task":
//       return "📝";
//     default:
//       return "";
//   }
// };

