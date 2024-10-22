import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditPopup from '../components/EditProject';
import CreatePopup from '../components/CreateProject';
import { TiPlus } from "react-icons/ti";
import avatar from '../assets/profile.svg';
import { useDispatch } from 'react-redux';
import { setSelectedProject } from '../redux/projectSlice';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    gitUrl: '',
    createdAt: ''
  });

  const [activeButton, setActiveButton] = useState('lead');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchProjects('/my-projects'); 
  }, []);

  const fetchProjects = async (endpoint) => {
    console.log(endpoint);
    try {
      const response = await axios.get(`http://localhost:8080/project${endpoint}`, {
        withCredentials: true,
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]); // Clear projects if there was an error
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setShowEditPopup(true);
  };

  const handleDelete = async (projectName) => {
    try {
      await axios.delete(`http://localhost:8080/project/delete/${projectName}`, {
        withCredentials: true,
      });
  
      setProjects(projects.filter((project) => project.name !== projectName));
  
      if (projectName === localStorage.getItem('selectedProjectName')) {
        dispatch(setSelectedProject({ name: null, type: null }));
        localStorage.removeItem('selectedProjectName');
        localStorage.removeItem('selectedProjectType');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleProjectClick = (projectName) => {
    dispatch(setSelectedProject({ name: projectName, type: activeButton }));
    localStorage.setItem('selectedProjectName', projectName);
    localStorage.setItem('selectedProjectType', activeButton);
    navigate('/kanbanboard');
  };

  const handleDropdownClick = (index) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e, isEdit) => {
    const { name, value } = e.target;
    if (isEdit) {
      setCurrentProject({ ...currentProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleButtonClick = (role) => {
    setActiveButton(role);
    if (role === 'lead') {
      fetchProjects('/my-projects');
    } else if (role === 'member') {
      fetchProjects('/my-participated-projects');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">All Projects</h1>
      </div>

      <div className="flex justify-center mb-6">
        <button 
           onClick={() => handleButtonClick('lead')} 
           className={`px-4 py-2 shadow-lg rounded-l-full ${activeButton === 'lead' ? 'bg-[#1385c2] text-white' : 'bg-[#2695d1] text-white hover:bg-[#1385c2]'}`}
        >
          Me as Lead
        </button>
        <button 
          onClick={() => handleButtonClick('member')} 
          className={`px-4 py-2 shadow-lg rounded-r-full ${activeButton === 'member' ? 'bg-[#1385c2] text-white' : 'bg-[#2695d1] text-white hover:bg-[#1385c2]'}`}
        >
          Me as Member
        </button>
      </div>

      <div className="absolute top-8 right-8">
        <button onClick={() => setShowCreatePopup(true)} className="bg-[#2695d1] text-white p-3 shadow-lg rounded-full hover:bg-[#1385c2]">
          <TiPlus />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-6xl ml-4">
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects found.</p>
        ) : (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 relative border-l-4 border-[#2695d1]"
            >
            {activeButton === 'lead' && (
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <button onClick={() => handleDropdownClick(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="12" cy="5" r="1.5"></circle>
                      <circle cx="12" cy="19" r="1.5"></circle>
                    </svg>
                  </button>
                  {openDropdownIndex === index && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
                      <button onClick={() => handleEdit(project)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit</button>
                      <button onClick={() => handleDelete(project.name)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            )}
              <h2
                onClick={() => handleProjectClick(project.name)}
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-[#2695d1]"
              >
                {project.name}
              </h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 text-gray-500 text-sm flex items-center justify-between">
                <div className="flex items-center relative group">
                  <img src={avatar} alt="avatar" className="w-6 h-6 mr-2 cursor-pointer" />
                  <span className="group-hover:block hidden absolute bottom-8 left-0 bg-gray-800 text-white text-xs rounded-md py-1 px-2">
                    Created by {project.createdBy}
                  </span>
                  <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <a href={project.gitUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 9.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 19.13V23" />
                  </svg>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {showEditPopup && (
       <EditPopup
       project={currentProject}
       onCancel={() => setShowEditPopup(false)}
       onSave={fetchProjects} // To reload projects after saving
       onChange={handleChange}
     />
      )}
       
      {showCreatePopup && (
        <CreatePopup
          onCancel={() => setShowCreatePopup(false)}
          onSaveSuccess={() => {
            setShowCreatePopup(false);
            fetchProjects();
          }}
        />
      )}

    </div>
  );
};

export default Projects;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import EditPopup from '../components/EditProject';
// import CreatePopup from '../components/CreateProject';
// import { TiPlus } from "react-icons/ti";
// import avatar from '../assets/profile.svg';
// import { useDispatch } from 'react-redux';
// import { setSelectedProjectName } from '../redux/projectSlice';
// import { Link, useNavigate } from 'react-router-dom';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [showCreatePopup, setShowCreatePopup] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [newProject, setNewProject] = useState({
//     name: '',
//     description: '',
//     gitUrl: '',
//     createdAt: ''
//   });
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     fetchProjects();

//     const storedProject = localStorage.getItem('selectedProjectName');
//     if (storedProject) {
//       dispatch(setSelectedProjectName(storedProject));
//     }
//   }, [dispatch]);

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/project/my-projects', {
//         withCredentials: true,
//       });
//       setProjects(response.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const handleEdit = (project) => {
//     setCurrentProject(project);
//     setShowEditPopup(true);
//   };

//   const handleDelete = async (projectName) => {
//     try {
//       await axios.delete(`http://localhost:8080/project/delete/${projectName}`, {
//         withCredentials: true,
//       });
  
//       setProjects(projects.filter((project) => project.name !== projectName));
  
//       if (projectName === localStorage.getItem('selectedProjectName')) {
//         dispatch(setSelectedProjectName(null));
//         localStorage.removeItem('selectedProjectName');
//       }
//     } catch (error) {
//       console.error('Error deleting project:', error);
//     }
//   };

//   const handleProjectClick = (projectName) => {
//     dispatch(setSelectedProjectName(projectName));
//     localStorage.setItem('selectedProjectName', projectName);
//     navigate('/kanbanboard');
//   };

//   const handleDropdownClick = (index) => {
//     setOpenDropdownIndex(index === openDropdownIndex ? null : index);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setOpenDropdownIndex(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleChange = (e, isEdit) => {
//     const { name, value } = e.target;
//     if (isEdit) {
//       setCurrentProject({ ...currentProject, [name]: value });
//     } else {
//       setNewProject({ ...newProject, [name]: value });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 relative">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">All Projects</h1>
//       </div>

//       <div className="flex justify-center mb-6">
//         <button 
//           onClick={fetchProjects} 
//           className="bg-[#2695d1] text-white px-4 py-2 shadow-lg rounded-l-full hover:bg-[#1385c2]"
//         >
//           Me as Lead
//         </button>
//         <button className="bg-[#2695d1] text-white px-4 py-2 shadow-lg rounded-r-full hover:bg-[#1385c2]">
//           Me as Member
//         </button>
//       </div>

//       <div className="absolute top-8 right-8">
//         <button onClick={() => setShowCreatePopup(true)} className="bg-[#2695d1] text-white p-3 shadow-lg rounded-full hover:bg-[#1385c2]">
//           <TiPlus />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 max-w-6xl ml-4">
//         {projects.length === 0 ? (
//           <p className="text-gray-600">No projects found.</p>
//         ) : (
//           projects.map((project, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-6 relative border-l-4 border-[#2695d1]"
//             >
//               <div className="absolute top-4 right-4">
//                 <div className="relative">
//                   <button onClick={() => handleDropdownClick(index)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <circle cx="12" cy="12" r="1.5"></circle>
//                       <circle cx="12" cy="5" r="1.5"></circle>
//                       <circle cx="12" cy="19" r="1.5"></circle>
//                     </svg>
//                   </button>
//                   {openDropdownIndex === index && (
//                     <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
//                       <button onClick={() => handleEdit(project)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit</button>
//                       <button onClick={() => handleDelete(project.name)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <h2
//                 onClick={() => handleProjectClick(project.name)}
//                 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-[#2695d1]"
//               >
//                 {project.name}
//               </h2>
//               <p className="text-gray-600 mt-2">{project.description}</p>
//               <div className="mt-4 text-gray-500 text-sm flex items-center justify-between">
//                 <div className="flex items-center relative group">
//                   <img src={avatar} alt="avatar" className="w-6 h-6 mr-2 cursor-pointer" />
//                   <span className="group-hover:block hidden absolute bottom-8 left-0 bg-gray-800 text-white text-xs rounded-md py-1 px-2">
//                     Created by {project.createdBy}
//                   </span>
//                   <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 <a href={project.gitUrl} target="_blank" rel="noopener noreferrer">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 9.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 19.13V23" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showEditPopup && (
//        <EditPopup
//        project={currentProject}
//        onCancel={() => setShowEditPopup(false)}
//        onSave={fetchProjects} // To reload projects after saving
//        onChange={handleChange}
//      />
//       )}

//       {showCreatePopup && (
//         <CreatePopup
//           onCancel={() => setShowCreatePopup(false)}
//           onSaveSuccess={() => {
//             setShowCreatePopup(false);
//             fetchProjects();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Projects;





// import React, { useState } from 'react';
// import EditPopup from '../components/EditProject';
// import CreatePopup from '../components/CreateProject';
// import { TiPlus } from "react-icons/ti";

// // Sample project data

// const initialProjects = [
//   {
//     id: 1,
//     name: "Website Redesign",
//     description: "Redesign the company website to improve user experience and modernize the interface. This project includes updating the layout, adding new features, and optimizing for mobile devices.",
//     createdTime: "2024-08-01",
//     giturl: "https://github.com/user/website-redesign"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 2,
//     name: "Mobile App Development",
//     description: "Develop a mobile application for the company's services, including user registration, profile management, and push notifications. The app will be available on both iOS and Android platforms.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/mobile-app-development"
//   },
//   {
//     id: 3,
//     name: "Data Analytics Platform",
//     description: "Create a data analytics platform to help the company gain insights from customer data. The project includes building dashboards, integrating with data sources, and providing real-time analytics.",
//     createdTime: "2024-08-05",
//     giturl: "https://github.com/user/data-analytics-platform"
//   }
// ];

// const Projects = () => {
//   const [projects, setProjects] = useState(initialProjects);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [showCreatePopup, setShowCreatePopup] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);
//   const [newProject, setNewProject] = useState({
//     id: null,
//     name: '',
//     description: '',
//     createdTime: '',
//     giturl: ''
//   });

//   const handleEdit = (project) => {
//     setCurrentProject(project);
//     setShowEditPopup(true);
//   };

//   const handleDelete = (projectId) => {
//     setProjects(projects.filter((project) => project.id !== projectId));
//   };

//   const handleSaveEdit = () => {
//     setProjects(projects.map((project) => (project.id === currentProject.id ? currentProject : project)));
//     setShowEditPopup(false);
//   };

//   const handleSaveCreate = () => {
//     setNewProject({ ...newProject, id: projects.length + 1, createdTime: new Date().toISOString().split('T')[0] });
//     setProjects([...projects, newProject]);
//     setShowCreatePopup(false);
//   };

//   const handleChange = (e, isEdit) => {
//     const { name, value } = e.target;
//     if (isEdit) {
//       setCurrentProject({ ...currentProject, [name]: value });
//     } else {
//       setNewProject({ ...newProject, [name]: value });
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-2 relative">
//       <div className="sticky top-0  z-10">
//         <div className="text-center mb-2">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">All Projects</h1>
//         </div>
//         <div className="absolute top-4 right-8">
//           <button onClick={() => setShowCreatePopup(true)} className="bg-[#2695d1] text-white p-3 shadow-lg rounded-full hover:bg-[#1385c2]">
//             <TiPlus />
//           </button>
//         </div>
//       </div>
//       <div className="overflow-y-auto max-h-screen pt-30">
//         <div className="relative flex flex-col space-y-2">
//           {projects.map((project, index) => (
//             <div
//               key={project.id}
//               className="sticky top-0 w-full max-w-5xl px-8 py-12 mx-auto bg-white border-b-4 border-[#2695d1]  rounded-lg shadow-lg"
//               style={{ top: `${index + 1}rem` }}
//             >
//               <div className="absolute top-4 right-4">
//                 <div className="relative">
//                   <button onClick={() => document.getElementById(`dropdown-${project.id}`).classList.toggle('hidden')}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <circle cx="12" cy="12" r="1.5"></circle>
//                       <circle cx="12" cy="5" r="1.5"></circle>
//                       <circle cx="12" cy="19" r="1.5"></circle>
//                     </svg>
//                   </button>
//                   <div id={`dropdown-${project.id}`} className="hidden absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
//                     <button onClick={() => handleEdit(project)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit</button>
//                     <button onClick={() => handleDelete(project.id)} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button>
//                   </div>
//                 </div>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 space-y-1">
//                 {/* <span className="block text-sm text-blue-700">Project #{project.id}</span> */}
//                 <span className="block">{project.name}</span>
//               </h2>
//               <p>{project.description}</p>
//               <div className="mt-4 text-gray-500 text-sm flex items-center justify-between">
//                 <span>Created on {new Date(project.createdTime).toLocaleDateString()}</span>
//                 <a href={project.giturl} target="_blank" rel="noopener noreferrer">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {showEditPopup && (
//         <EditPopup
//           project={currentProject}
//           onChange={(e) => handleChange(e, true)}
//           onSave={handleSaveEdit}
//           onCancel={() => setShowEditPopup(false)}
//         />
//       )}
//       {showCreatePopup && (
//         <CreatePopup
//           project={newProject}
//           onChange={(e) => handleChange(e, false)}
//           onSave={handleSaveCreate}
//           onCancel={() => setShowCreatePopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Projects;