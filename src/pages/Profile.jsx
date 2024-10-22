import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import profile from '../assets/profile.svg';

function Profile() {
  const [isAccountSettingsEditing, setIsAccountSettingsEditing] = useState(false);
  const [isSocialProfilesEditing, setIsSocialProfilesEditing] = useState(false);
  
  const [accountSettings, setAccountSettings] = useState({
    username: "",
    email: "",
    skill: "",
    experience: "",
    job: "",
    aboutMe: "",
  });
  
  const [socialProfiles, setSocialProfiles] = useState({
    twitter: "",
    linkedin: "",
    github: "",
  });

  const navigate = useNavigate();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/profile', {
          withCredentials: true,
        });
        const data = response.data;

        setAccountSettings({
          username: data.firstName,
          email: data.email,
          skill: data.skill,
          experience: data.experience,
          job: data.job,
          aboutMe: data.aboutMe,
        });

        setSocialProfiles({
          twitter: data.twitterUrl,
          linkedin: data.linkedinUrl,
          github: data.gitUrl,
        });

      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleBackClick = () => {
    navigate("/kanbanboard");
  };

  const handleEditClick = (section) => {
    if (section === "account") {
      setIsAccountSettingsEditing(true);
    } else if (section === "social") {
      setIsSocialProfilesEditing(true);
    }
  };

  const handleSaveClick = async (section) => {
    if (section === "account") {
      try {
        await axios.put('http://localhost:8080/user/update', {
          skill: accountSettings.skill,
          experience: accountSettings.experience,
          job: accountSettings.job,
          aboutMe: accountSettings.aboutMe,
          gitUrl: socialProfiles.github,
          linkedinUrl: socialProfiles.linkedin,
          twitterUrl: socialProfiles.twitter,
        }, {
          withCredentials: true,
        });

        setIsAccountSettingsEditing(false);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    } else if (section === "social") {
      try {
        await axios.put('http://localhost:8080/user/update', {
          skill: accountSettings.skill,
          experience: accountSettings.experience,
          job: accountSettings.job,
          aboutMe: accountSettings.aboutMe,
          gitUrl: socialProfiles.github,
          linkedinUrl: socialProfiles.linkedin,
          twitterUrl: socialProfiles.twitter,
        }, {
          withCredentials: true,
        });

        setIsSocialProfilesEditing(false);
      } catch (error) {
        console.error("Error updating social profiles:", error);
      }
    }
  };

  const handleCancelClick = (section) => {
    if (section === "account") {
      setIsAccountSettingsEditing(false);
    } else if (section === "social") {
      setIsSocialProfilesEditing(false);
    }
  };

  return (
    <div className="bg-[#f4f7fd]  scrollbar-hide flex dark:bg-[#20212c]">
      <div className="relative w-full max-w-7xl mx-auto font-inter mt-2 bottom-0">
        <button
          onClick={handleBackClick}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-700 hover:text-gray-900 focus:outline-none rounded-full shadow-md fixed top-4 left-4 z-10 flex items-center p-2"
        >
          <ArrowLeftIcon className="h-6 w-6 text-white" />
        </button>

        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <div className="relative w-full h-32 bg-gradient-to-r from-cyan-500 to-blue-500">
              <img
                src={profile}
                alt="Profile"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
              />
            </div>
            <div className="text-center mt-12 mb-4">
              <h2 className="text-xl font-semibold">{accountSettings.username}</h2>
              {/* <p className="text-gray-600">
                Account type:{" "}
                <span className="font-medium text-gray-800">Administrator</span>
              </p> */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-1">Account Settings</h3>
                {!isAccountSettingsEditing && (
                  <button
                    onClick={() => handleEditClick("account")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Here you can change your account information
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className={`mt-1 block w-full py-2 px-3 sm:text-sm`}
                      value={accountSettings.username}
                      readOnly={!isAccountSettingsEditing}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`mt-1 block w-full py-2 px-3 sm:text-sm`}
                      value={accountSettings.email}
                      readOnly={!isAccountSettingsEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="skill"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skill
                    </label>
                    <input
                      type="text"
                      id="skill"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-gray-300' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                      value={accountSettings.skill}
                      readOnly={!isAccountSettingsEditing}
                      onChange={(e) => setAccountSettings({ ...accountSettings, skill: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Experience
                    </label>
                    <input
                      type="number"
                      id="experience"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                      value={accountSettings.experience}
                      readOnly={!isAccountSettingsEditing}
                      onChange={(e) => setAccountSettings({ ...accountSettings, experience: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="job"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job
                  </label>
                  <input
                    type="text"
                    id="job"
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                    value={accountSettings.job}
                    readOnly={!isAccountSettingsEditing}
                    onChange={(e) => setAccountSettings({ ...accountSettings, job: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="about-me"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About Me
                  </label>
                  <textarea
                    id="about-me"
                    rows="3"
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                    value={accountSettings.aboutMe}
                    readOnly={!isAccountSettingsEditing}
                    onChange={(e) => setAccountSettings({ ...accountSettings, aboutMe: e.target.value })}
                  ></textarea>
                </div>
              </form>
              {isAccountSettingsEditing && (
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => handleCancelClick("account")}
                    className={`text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveClick("account")}
                    className={`text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2`}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-1">Social Profiles</h3>
                {!isSocialProfilesEditing && (
                  <button
                    onClick={() => handleEditClick("social")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Here you can add your social profile links
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="github"
                      className="block text-sm font-medium text-gray-700"
                    >
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="github"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                      value={socialProfiles.github}
                      readOnly={!isSocialProfilesEditing}
                      onChange={(e) => setSocialProfiles({ ...socialProfiles, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="linkedin"
                      className="block text-sm font-medium text-gray-700"
                    >
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                      value={socialProfiles.linkedin}
                      readOnly={!isSocialProfilesEditing}
                      onChange={(e) => setSocialProfiles({ ...socialProfiles, linkedin: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
                    value={socialProfiles.twitter}
                    readOnly={!isSocialProfilesEditing}
                    onChange={(e) => setSocialProfiles({ ...socialProfiles, twitter: e.target.value })}
                  />
                </div>
              </form>
              {isSocialProfilesEditing && (
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => handleCancelClick("social")}
                    className="text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveClick("social")}
                    className="text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


// import React, { useState, useEffect } from "react";
// import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid';
// import { useNavigate } from "react-router-dom";
// import profile from '../assets/profile.svg';

// function Profile() {
//   const [isAccountSettingsEditing, setIsAccountSettingsEditing] = useState(false);
//   const [isSocialProfilesEditing, setIsSocialProfilesEditing] = useState(false);

//   const [accountSettings, setAccountSettings] = useState({
//     username: "",
//     email: "",
//     skill: "",
//     experience: "",
//     job: "",
//     aboutMe: "",
//   });

//   const [socialProfiles, setSocialProfiles] = useState({
//     twitter: "",
//     linkedin: "",
//     github: "",
//   });

//   const navigate = useNavigate();

//   // Fetch user profile data from backend on component mount
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch('/api/user/profile'); // Replace with your API endpoint
//         const data = await response.json();
//         setAccountSettings({
//           username: data.username,
//           email: data.email,
//           skill: data.skill,
//           experience: data.experience,
//           job: data.job,
//           aboutMe: data.aboutMe,
//         });
//         setSocialProfiles({
//           twitter: data.twitter,
//           linkedin: data.linkedin,
//           github: data.github,
//         });
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleBackClick = () => {
//     navigate("/kanbanboard");
//   };

//   const handleEditClick = (section) => {
//     if (section === "account") {
//       setIsAccountSettingsEditing(true);
//     } else if (section === "social") {
//       setIsSocialProfilesEditing(true);
//     }
//   };

//   const handleSaveClick = async (section) => {
//     try {
//       if (section === "account") {
//         await fetch('/api/user/profile', {
//           method: 'PUT', // Adjust method if necessary (POST, PATCH, etc.)
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(accountSettings),
//         });
//         setIsAccountSettingsEditing(false);
//       } else if (section === "social") {
//         await fetch('/api/user/social-profiles', {
//           method: 'PUT', // Adjust method if necessary
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(socialProfiles),
//         });
//         setIsSocialProfilesEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleCancelClick = (section) => {
//     if (section === "account") {
//       setIsAccountSettingsEditing(false);
//     } else if (section === "social") {
//       setIsSocialProfilesEditing(false);
//     }
//   };

//   return (
//     <div className="bg-[#f4f7fd] scrollbar-hide flex dark:bg-[#20212c] ">
//       <div className="relative w-full max-w-7xl mx-auto font-inter mt-2 bottom-0">
//         <button
//           onClick={handleBackClick}
//           className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-700 hover:text-gray-900 focus:outline-none rounded-full shadow-md fixed top-4 left-4 z-10 flex items-center p-2"
//         >
//           <ArrowLeftIcon className="h-6 w-6 text-white" />
//         </button>

//         <div className="w-full max-w-6xl mx-auto">
//           <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
//             <div className="relative w-full h-32 bg-gradient-to-r from-cyan-500 to-blue-500">
//               <img
//                 src={profile}
//                 alt="Profile"
//                 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
//               />
//             </div>
//             <div className="text-center mt-12 mb-4">
//               <h2 className="text-xl font-semibold">Madhu</h2>
//               <p className="text-gray-600">
//                 Account type:{" "}
//                 <span className="font-medium text-gray-800">Administrator</span>
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Account Settings */}
//             <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold mb-1">Account Settings</h3>
//                 {!isAccountSettingsEditing && (
//                   <button
//                     onClick={() => handleEditClick("account")}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                 )}
//               </div>
//               <p className="text-gray-400 text-sm mb-6">
//                 Here you can change your account information
//               </p>
//               <form className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       htmlFor="username"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       id="username"
//                       className={`mt-1 block w-full py-2 px-3 sm:text-sm`}
//                       value={accountSettings.username}
//                       readOnly={!isAccountSettingsEditing}
//                       onChange={(e) =>
//                         setAccountSettings({ ...accountSettings, username: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className={`mt-1 block w-full py-2 px-3 sm:text-sm`}
//                       value={accountSettings.email}
//                       readOnly={!isAccountSettingsEditing}
//                       onChange={(e) =>
//                         setAccountSettings({ ...accountSettings, email: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label
//                       htmlFor="skill"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Skill
//                     </label>
//                     <input
//                       type="text"
//                       id="skill"
//                       className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-gray-300' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                       value={accountSettings.skill}
//                       readOnly={!isAccountSettingsEditing}
//                       onChange={(e) => setAccountSettings({ ...accountSettings, skill: e.target.value })}
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="experience"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Experience
//                     </label>
//                     <input
//                       type="number"
//                       id="experience"
//                       className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                       value={accountSettings.experience}
//                       readOnly={!isAccountSettingsEditing}
//                       onChange={(e) => setAccountSettings({ ...accountSettings, experience: e.target.value })}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="job"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Job
//                   </label>
//                   <input
//                     type="text"
//                     id="job"
//                     className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                     value={accountSettings.job}
//                     readOnly={!isAccountSettingsEditing}
//                     onChange={(e) => setAccountSettings({ ...accountSettings, job: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="about-me"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     About Me
//                   </label>
//                   <textarea
//                     id="about-me"
//                     className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${isAccountSettingsEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                     rows="3"
//                     value={accountSettings.aboutMe}
//                     readOnly={!isAccountSettingsEditing}
//                     onChange={(e) => setAccountSettings({ ...accountSettings, aboutMe: e.target.value })}
//                   />
//                 </div>
//                 {isAccountSettingsEditing && (
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => handleCancelClick("account")}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleSaveClick("account")}
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* Social Profiles */}
//             <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-xl font-semibold mb-1">Social Profiles</h3>
//                 {!isSocialProfilesEditing && (
//                   <button
//                     onClick={() => handleEditClick("social")}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                 )}
//               </div>
//               <p className="text-gray-400 text-sm mb-6">
//                 Update your social profiles to reflect your latest activities
//               </p>
//               <form className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="twitter"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Twitter
//                   </label>
//                   <input
//                     type="url"
//                     id="twitter"
//                     className={`mt-1 block w-full py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                     value={socialProfiles.twitter}
//                     readOnly={!isSocialProfilesEditing}
//                     onChange={(e) =>
//                       setSocialProfiles({ ...socialProfiles, twitter: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="linkedin"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     LinkedIn
//                   </label>
//                   <input
//                     type="url"
//                     id="linkedin"
//                     className={`mt-1 block w-full py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                     value={socialProfiles.linkedin}
//                     readOnly={!isSocialProfilesEditing}
//                     onChange={(e) =>
//                       setSocialProfiles({ ...socialProfiles, linkedin: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="github"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     GitHub
//                   </label>
//                   <input
//                     type="url"
//                     id="github"
//                     className={`mt-1 block w-full py-2 px-3 ${isSocialProfilesEditing ? 'border-indigo-500 focus:ring-indigo-500' : 'border-gray-300 focus:ring-gray-300'} sm:text-sm`}
//                     value={socialProfiles.github}
//                     readOnly={!isSocialProfilesEditing}
//                     onChange={(e) =>
//                       setSocialProfiles({ ...socialProfiles, github: e.target.value })
//                     }
//                   />
//                 </div>
//                 {isSocialProfilesEditing && (
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => handleCancelClick("social")}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleSaveClick("social")}
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;











// // src/components/Profile.jsx
// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="max-w-5xl mx-auto p-8">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//         <div className="relative h-40 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
//           <img
//             src="https://placehold.co/80x80"
//             alt="Profile Image"
//             className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-full border-4 border-white"
//           />
//         </div>
//         <div className="text-center p-6">
//           <h1 className="text-2xl font-bold">Adela Parkson</h1>
//           <p className="text-gray-500">
//             Account type: <span className="font-semibold text-black">Administrator</span>{' '}
//             <i className="fas fa-chevron-down"></i>
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Account Settings */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
//           <p className="text-gray-500 mb-6">Here you can change your account information</p>
//           <form>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
//                   Username*
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value="@parkson.adela"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
//                   Email Address*
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   value="adela@simmmple.com"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2" htmlFor="first-name">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first-name"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="First Name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2" htmlFor="last-name">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="last-name"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Last Name"
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="job">
//                 Job
//               </label>
//               <input
//                 type="text"
//                 id="job"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="What do you do?"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="about">
//                 About Me
//               </label>
//               <input
//                 type="text"
//                 id="about"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Tell something about yourself in 150 characters!"
//               />
//             </div>
//             <button type="button" className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg">
//               Save changes
//             </button>
//           </form>
//         </div>

//         {/* Social Profiles */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Social Profiles</h2>
//           <p className="text-gray-500 mb-6">Here you can set your social profiles</p>
//           <form>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="twitter">
//                 Twitter Username
//               </label>
//               <input
//                 type="text"
//                 id="twitter"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Twitter Username"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="facebook">
//                 Facebook Username
//               </label>
//               <input
//                 type="text"
//                 id="facebook"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Facebook Username"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="github">
//                 Github Username
//               </label>
//               <input
//                 type="text"
//                 id="github"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Github Username"
//               />
//             </div>
//             <button type="button" className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg">
//               Save changes
//             </button>
//           </form>
//         </div>

//         {/* Change Password */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Change password</h2>
//           <p className="text-gray-500 mb-6">Here you can set your new password</p>
//           <form>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="old-password">
//                 Old Password
//               </label>
//               <input
//                 type="password"
//                 id="old-password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Old Password"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="new-password">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 id="new-password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="New Password"
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirm-password">
//                 New Password Confirmation
//               </label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="New Password Confirmation"
//               />
//             </div>
//             <button type="button" className="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg">
//               Change password
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
