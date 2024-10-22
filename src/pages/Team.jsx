import { React, useState, useEffect } from 'react';
import axios from 'axios';
import avatar from '../assets/profile.svg';
import linkedin from '../assets/linkedin.svg';
import { SlSocialLinkedin } from "react-icons/sl";
import AddToTeam from '../components/AddToTeam';
import { TiPlus } from "react-icons/ti";
import { useSelector } from "react-redux";
import { TbMailFilled } from "react-icons/tb";

const Team = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]); // Initialize with an empty array

  const selectedProject = useSelector((state) => state.project.selectedProject);

  const handleOpenPopup = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

  useEffect(() => {
    // Function to fetch team members
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/project/${selectedProject.name}`, {
          withCredentials: true,
        });
        const data = response.data;
        // console.log(data);

        // Assuming data is an array of team members
        setTeamMembers(data.map(member => ({
          name: member.firstName,
          email: member.email,
          job: member.job,
          bio: member.aboutMe,
          git: member.gitUrl,
          twitter: member.twitterUrl,
          linkedin: member.linkedinUrl
        })));
      } catch (err) {
        setError("Failed to fetch team members.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when the selected project name changes
    if (selectedProject) {
      fetchTeamMembers();
    }
  }, [selectedProject]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-20">
        <p className="text-gray-500 text-lg">BUILDING TEAM</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Meet the Team</h1>
        {selectedProject.type === 'lead' && (
        <div className="left-0 right-0 flex justify-end">
          <button
            onClick={handleOpenPopup}
            className="bg-[#2695d1] text-white px-4 py-4 rounded-full shadow-xl hover:bg-[#1385c2]"
          >
            <TiPlus />
          </button>
        </div>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white mb-10 rounded-lg shadow-md overflow-visible relative">
              <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2 w-32 h-32">
                <img
                  src={avatar}
                  alt={`Display Picture of ${member.name}`}
                  className="w-full h-full rounded-full border-4 border-[#2695d1] object-cover"
                />
              </div>
              <div className="pt-20 px-6 pb-6 text-center ">
                <div className="flex flex-col items-center">
                  <TbMailFilled />
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <p className="text-gray-600 text-sm">{member.job}</p>
                  <p className="text-gray-700 mt-3">{member.bio}</p>
                </div>
                <div className="flex justify-center gap-4 mt-4 mb-2 ">
                  {member.git && (
                    <a href={member.git} aria-label="Github" target="_blank" rel="noopener noreferrer">
                      {/* GitHub icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      {/* Twitter icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      {/* LinkedIn icon */}
                      <SlSocialLinkedin className='w-6 h-6 text-gray-600' />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && <AddToTeam onClose={handleClosePopup} />}
    </div>
  );
};

export default Team;


{/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor" stroke="none">
  <path d="M2.25 0C1.007 0 0 1.007 0 2.25v19.5C0 22.993 1.007 24 2.25 24h19.5C22.993 24 24 22.993 24 21.75V2.25C24 1.007 22.993 0 21.75 0h-19.5zM8.301 20.452H5.55V9.675h2.751v10.777zM7.176 8.287c-.884 0-1.596-.733-1.596-1.635.008-.902.716-1.64 1.599-1.64s1.596.738 1.596 1.64c0 .902-.712 1.635-1.596 1.635zm13.776 12.165h-2.752v-5.956c0-1.428-.028-3.258-1.988-3.258-1.99 0-2.294 1.56-2.294 3.165v6.048h-2.75V9.675h2.644v1.467h.037c.367-.694 1.261-1.428 2.593-1.428 2.77 0 3.280 1.825 3.280 4.204v6.534z" />
</svg> */}