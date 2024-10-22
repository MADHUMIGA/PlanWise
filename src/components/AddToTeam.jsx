import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux"; 

const AddToTeam = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [fetchedEmails, setFetchedEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedProject = useSelector((state) => state.project.selectedProject);

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
              The user({email})  is not on our website.
            </p>
            <button
              onClick={() => handleInvite(email)}
              className="bg-[#2695d1] text-white px-2 h-[40px] py-1 rounded-md shadow-sm hover:bg-[#1385c2]"
            >
              Invite
            </button>
          </div>
        );
      }
    }
  };

  const handleInvite = async (email) => {
          setErrorMessage(`Invitation sent to ${email}`);
          setEmail('');
    // try {
    //   // Replace this URL with your actual invite API endpoint
    //   const response = await axios.post('http://localhost:8080/invite', { email }, {
    //     withCredentials: true, // Ensure cookies are sent with the request
    //   });
    //   if (response.status === 200) {
    //     setErrorMessage(`Invitation sent to ${email}.`);
    //   } else {
    //     setErrorMessage(`Failed to send invitation to ${email}.`);
    //   }
    // } catch (error) {
    //   console.error('Error sending invitation:', error);
    //   setErrorMessage(`Error sending invitation to ${email}.`);
    // }
  };

  const handleCancel = () => {
    setEmailList([]);
    setErrorMessage('');
    onClose();
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (emailList.length === 0) {
      setErrorMessage('No emails to add.');
      return;
    }
  
    try {
     
      const response = await axios.post(`http://localhost:8080/project/add-users/${selectedProject.name}`, emailList, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
  
      if (response.status === 200) {
        setErrorMessage('Emails added successfully.');
        setEmailList([]); // Clear the email list after successful addition
      } else {
        setErrorMessage('Failed to add emails.');
      }
    } catch (error) {
      console.error('Error adding emails:', error);
      setErrorMessage('Error adding emails.');
    }
    
    // onClose(); 
  };
  

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/register-emails', {
        withCredentials: true, // Ensure cookies are sent with the request
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add to Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Emails</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeyDown} // Handle Enter key press
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter email"
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
                <p className="text-sm font-medium text-gray-700">Members to be added:</p>
                <ul className="list-disc list-inside mt-1">
                  {emailList.map((email, index) => (
                    <li key={index} className="text-gray-800">{email}</li>
                  ))}
                </ul>
              </div>
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
  );
};

export default AddToTeam;







{/* {fetchedEmails.length > 0 && (
<div className="mt-4">
<h3 className="text-lg font-semibold mb-2">Fetched Emails</h3>
<ul className="list-disc list-inside">
  {fetchedEmails.map((email, index) => (
    <li key={index} className="text-gray-800">{email}</li>
  ))}
</ul>
</div>
)} */}