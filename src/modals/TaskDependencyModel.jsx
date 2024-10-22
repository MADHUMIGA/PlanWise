import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"; 

const TaskDependencyModel = ({TaskId , onClose}) => {


  const [name, setName] = useState('');
  const [nameList, setNameList] = useState([]);
  const [FetchedTaskNames, setFetchedTaskNames] = useState([]);
  const [fetchedDependNames, setFetchedDependNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [taskIds, setTaskIds] = useState([]); 

    const selectedProject = useSelector((state) => state.project.selectedProject);

    useEffect(() => {
      if (TaskId && selectedProject?.name) {
        fetchTaskNames();
        fetchDependentNames();
      }
      // Ensure dependencies are included in the dependency array
    }, [TaskId, selectedProject]);

    const fetchTaskNames = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/task/names/${TaskId}/${selectedProject.name}`, {
            withCredentials: true, // Ensure cookies are sent with the request
          });
    
          if (response.status === 200) {
            setFetchedTaskNames(response.data);
            console.log(response.data);
          } else {
            console.error('Failed to fetch emails:', response.status);
          }
        } catch (error) {
          console.error('Error fetching emails:', error);
        }
      };
    const fetchDependentNames = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/task/dependencies/${TaskId}`, {
            withCredentials: true, // Ensure cookies are sent with the request
          });
    
          if (response.status === 200) {
            setFetchedDependNames(response.data);
            console.log('dependednt :',response.data);
          } else {
            console.error('Failed to fetch dependedncy', response.status);
          }
        } catch (error) {
          console.error('Error fetching dependency:', error);
        }
      };


      const handleEmailChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value) {
          // Filter emails based on input
          const filtered = FetchedTaskNames.filter(task =>
            task.heading.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredNames(filtered);
          setShowSuggestions(true);
          setErrorMessage(''); // Clear error message when typing
        } else {
          setFilteredNames([]);
          setShowSuggestions(false);
        }
      };

      const handleAddEmail = (task) => {
        if (task.heading && !nameList.includes(task.heading)) {
            setNameList([...nameList, task.heading]);
            setTaskIds([...taskIds, task.id]);
            setName('');
            setFilteredNames([]);
            setShowSuggestions(false);
            setErrorMessage(''); // Clear error message when task is added
          }
      };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredNames.length > 0) {
            handleAddEmail(filteredNames[0]);
          }
        }
      };

      const handleCancel = () => {
        setNameList([]);
        setTaskIds([]);
        setErrorMessage('');
        onClose();
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        
    if (taskIds.length === 0) {
        setErrorMessage('No task dependencies to add.');
        return;
      }
        try {
         
          const response = await axios.post(`http://localhost:8080/task/${TaskId}/add-dependencies`, taskIds, {
            withCredentials: true, // Ensure cookies are sent with the request
          });
      
          if (response.status === 200) {
            setErrorMessage('Tasks added successfully.');
            setNameList([]); // Clear the email list after successful addition
            setTaskIds([]);
          } else {
            setErrorMessage('Failed to add tasks.');
          }
        } catch (error) {
          console.error('Error Adding Tasks:', error);
          setErrorMessage('Error Adding Tasks.');
        }
        
        // onClose(); 
      };

      console.log('Fetched Dependent Names (Render):', fetchedDependNames);
  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-60 relative">
        <h2 className="text-2xl font-bold mb-4">Add Task Dependencies</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tasks</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter Task Name"
              />
              {showSuggestions && filteredNames.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredNames.map((suggestedTask, index) => (
                    <li
                      key={index}
                      onClick={() => handleAddEmail(suggestedTask)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestedTask.heading}
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
            {nameList.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Added Tasks:</p>
                <ul className="list-disc list-inside mt-1">
                  {nameList.map((name, index) => (
                    <li key={index} className="text-gray-800">{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>

          <h2>Dependent Tasks</h2>
      {fetchedDependNames.length > 0 ? (
        <ul>
          {fetchedDependNames.map((task) => (
            <li key={task.id}>{task.heading}</li>
          ))}
        </ul>
      ) : (
        <p>No dependent tasks found.</p>
       
      )}
          </div>


          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2695d1] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#1385c2]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default TaskDependencyModel