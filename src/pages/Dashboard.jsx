import React from 'react';
import profile from '../assets/profile.svg';
import dashboard from '../assets/dashboard.svg';
import { useSelector } from "react-redux";

const Dashboard = () => {

  const selectedProject = useSelector((state) => state.project.selectedProject);
  return (

    <div className="p-6 font-sans">
    <header className="mb-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-between">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="bg-white p-4 pr-20 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-600">Projects</h2>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900 mr-2">850</span>
              <span className="text-sm text-gray-500">/ 100</span>
            </div>
            <div className="flex items-center mt-2 text-green-500">
              <i className="fas fa-arrow-up mr-1"></i>
              <span className="text-xs">10% Increase from Last Month</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-600">Tasks</h2>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900 mr-2">100</span>
              <span className="text-sm text-gray-500">/ 110</span>
            </div>
            <div className="flex items-center mt-2 text-red-500">
              <i className="fas fa-arrow-down mr-1"></i>
              <span className="text-xs">5% Decrease from Last Month</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-600">Resources</h2>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900 mr-2">85</span>
              <span className="text-sm text-gray-500">/ 90</span>
            </div>
            <div className="flex items-center mt-2 text-green-500">
              <i className="fas fa-arrow-up mr-1"></i>
              <span className="text-xs">5% Increase from Last Month</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-gray-600">Time Spent</h2>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900 mr-2">752</span>
              <span className="text-sm text-gray-500">/ 885 hours</span>
            </div>
            <div className="flex items-center mt-2 text-red-500">
              <i className="fas fa-arrow-down mr-1"></i>
              <span className="text-xs">3% Decrease from Last Month</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <section className="mb-8">
        <div className="flex justify-between">
          <div className="w-[62%]">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Project Summary</h2>
                <div className="flex space-x-2">
                  <select className="p-2 border rounded-md text-sm">
                    <option>Project</option>
                    <option>Manager</option>
                  </select>
                  <select className="p-2 border rounded-md text-sm">
                    <option>Status</option>
                    <option>Completed</option>
                    <option>On Track</option>
                  </select>
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Project Name</th>
                    <th className="p-2">Project Manager</th>
                    <th className="p-2">Due Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Agile Project</td>
                    <td className="p-2">Matilda Streich</td>
                    <td className="p-2">June 6, 2022</td>
                    <td className="p-2 text-green-500">Completed</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">70%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Android Development</td>
                    <td className="p-2">Cathrine Marvir</td>
                    <td className="p-2">July 10, 2022</td>
                    <td className="p-2 text-blue-500">On Track</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">85%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">iOS App Development</td>
                    <td className="p-2">Vladimir Hintz</td>
                    <td className="p-2">Nov 5, 2022</td>
                    <td className="p-2 text-yellow-500">Delayed</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">45%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Website Redesign</td>
                    <td className="p-2">John Doe</td>
                    <td className="p-2">Dec 1, 2022</td>
                    <td className="p-2 text-red-500">At Risk</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">20%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Work Progress</h2>
                <div className="flex space-x-2">
                  <select className="p-2 border rounded-md text-sm">
                    <option>Project</option>
                    <option>Manager</option>
                  </select>
                  <select className="p-2 border rounded-md text-sm">
                    <option>Status</option>
                    <option>Completed</option>
                    <option>On Track</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-md font-semibold">Agile Project</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">70% Completed</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-md font-semibold">Android Development</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">85% Completed</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-md font-semibold">iOS App Development</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">45% Completed</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-md font-semibold">Website Redesign</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">20% Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[36%]">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-bold mb-4">Team Members</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <h3 className="text-sm font-semibold">John Doe</h3>
                    <p className="text-xs text-gray-500">Project Manager</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <h3 className="text-sm font-semibold">Jane Smith</h3>
                    <p className="text-xs text-gray-500">Developer</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <h3 className="text-sm font-semibold">Michael Brown</h3>
                    <p className="text-xs text-gray-500">Designer</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <h3 className="text-sm font-semibold">Emily Davis</h3>
                    <p className="text-xs text-gray-500">Tester</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
              <ul className="space-y-4 text-sm">
                <li>John Doe completed the Agile Project</li>
                <li>Jane Smith started working on the new Android Development project</li>
                <li>Michael Brown uploaded new design mockups</li>
                <li>Emily Davis conducted a bug testing session</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
     
  );
};

    //  <div>
     {/* {selectedProject.type === 'lead' && (
    <div className="p-6 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="flex justify-between">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="bg-white p-4 pr-20 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-600">Projects</h2>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">850</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
              <div className="flex items-center mt-2 text-green-500">
                <i className="fas fa-arrow-up mr-1"></i>
                <span className="text-xs">10% Increase from Last Month</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-600">Tasks</h2>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">100</span>
                <span className="text-sm text-gray-500">/ 110</span>
              </div>
              <div className="flex items-center mt-2 text-red-500">
                <i className="fas fa-arrow-down mr-1"></i>
                <span className="text-xs">5% Decrease from Last Month</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-600">Resources</h2>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">85</span>
                <span className="text-sm text-gray-500">/ 90</span>
              </div>
              <div className="flex items-center mt-2 text-green-500">
                <i className="fas fa-arrow-up mr-1"></i>
                <span className="text-xs">5% Increase from Last Month</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-sm font-medium text-gray-600">Time Spent</h2>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-gray-900 mr-2">752</span>
                <span className="text-sm text-gray-500">/ 885 hours</span>
              </div>
              <div className="flex items-center mt-2 text-red-500">
                <i className="fas fa-arrow-down mr-1"></i>
                <span className="text-xs">3% Decrease from Last Month</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="mb-8">
          <div className="flex justify-between">
            <div className="w-[62%]">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Project Summary</h2>
                  <div className="flex space-x-2">
                    <select className="p-2 border rounded-md text-sm">
                      <option>Project</option>
                      <option>Manager</option>
                    </select>
                    <select className="p-2 border rounded-md text-sm">
                      <option>Status</option>
                      <option>Completed</option>
                      <option>On Track</option>
                    </select>
                  </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Project Name</th>
                      <th className="p-2">Project Manager</th>
                      <th className="p-2">Due Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Agile Project</td>
                      <td className="p-2">Matilda Streich</td>
                      <td className="p-2">June 6, 2022</td>
                      <td className="p-2 text-green-500">Completed</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">70%</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Android Development</td>
                      <td className="p-2">Cathrine Marvir</td>
                      <td className="p-2">July 10, 2022</td>
                      <td className="p-2 text-blue-500">On Track</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">85%</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">iOS App Development</td>
                      <td className="p-2">Vladimir Hintz</td>
                      <td className="p-2">Nov 5, 2022</td>
                      <td className="p-2 text-yellow-500">Delayed</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">45%</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Website Redesign</td>
                      <td className="p-2">John Doe</td>
                      <td className="p-2">Dec 1, 2022</td>
                      <td className="p-2 text-red-500">At Risk</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">20%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Work Progress</h2>
                  <div className="flex space-x-2">
                    <select className="p-2 border rounded-md text-sm">
                      <option>Project</option>
                      <option>Manager</option>
                    </select>
                    <select className="p-2 border rounded-md text-sm">
                      <option>Status</option>
                      <option>Completed</option>
                      <option>On Track</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-md font-semibold">Agile Project</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">70% Completed</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-md font-semibold">Android Development</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">85% Completed</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-md font-semibold">iOS App Development</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">45% Completed</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-md font-semibold">Website Redesign</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">20% Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[36%]">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-bold mb-4">Team Members</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="text-sm font-semibold">John Doe</h3>
                      <p className="text-xs text-gray-500">Project Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="text-sm font-semibold">Jane Smith</h3>
                      <p className="text-xs text-gray-500">Developer</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="text-sm font-semibold">Michael Brown</h3>
                      <p className="text-xs text-gray-500">Designer</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src={profile} alt="Team Member" className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <h3 className="text-sm font-semibold">Emily Davis</h3>
                      <p className="text-xs text-gray-500">Tester</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
                <ul className="space-y-4 text-sm">
                  <li>John Doe completed the Agile Project</li>
                  <li>Jane Smith started working on the new Android Development project</li>
                  <li>Michael Brown uploaded new design mockups</li>
                  <li>Emily Davis conducted a bug testing session</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
     ):(
      <div className="flex flex-col items-center  justify-center min-h-screen">
      <img src={dashboard} alt='dashboard' className='h-36'/>
  <p className=" text-md">This dashboard will showcase projects you lead.</p>
   </div>
     )} */}
    //  </div>
export default Dashboard;


// import React from 'react';
// // import { Pie } from 'react-chartjs-2';
// // import 'chart.js/auto';
// import profile from '../assets/profile.svg';

// const Dashboard = () => {
//   // Pie chart data
//   const pieData = {
//     labels: ['Completed', 'In Progress', 'Delayed', 'At Risk'],
//     datasets: [
//       {
//         data: [15, 5, 4, 0],
//         backgroundColor: ['#34D399', '#3B82F6', '#FBBF24', '#F87171'],
//         hoverBackgroundColor: ['#34D399', '#3B82F6', '#FBBF24', '#F87171'],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className=" p-6 font-sans">
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
       
//         <div className="flex justify-between">
//           <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
//             <div className="bg-white p-4 pr-20 rounded-lg shadow-md">
//               <h2 className="text-sm font-medium text-gray-600">Projects</h2>
//               <div className="flex items-center mt-2">
//                 <span className="text-2xl font-bold text-gray-900 mr-2">850</span>
//                 <span className="text-sm text-gray-500">/ 100</span>
//               </div>
//               <div className="flex items-center mt-2 text-green-500">
//                 <i className="fas fa-arrow-up mr-1"></i>
//                 <span className="text-xs">10% Increase from Last Month</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-sm font-medium text-gray-600">Tasks</h2>
//               <div className="flex items-center mt-2">
//                 <span className="text-2xl font-bold text-gray-900 mr-2">100</span>
//                 <span className="text-sm text-gray-500">/ 110</span>
//               </div>
//               <div className="flex items-center mt-2 text-red-500">
//                 <i className="fas fa-arrow-down mr-1"></i>
//                 <span className="text-xs">5% Decrease from Last Month</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-sm font-medium text-gray-600">Resources</h2>
//               <div className="flex items-center mt-2">
//                 <span className="text-2xl font-bold text-gray-900 mr-2">85</span>
//                 <span className="text-sm text-gray-500">/ 90</span>
//               </div>
//               <div className="flex items-center mt-2 text-green-500">
//                 <i className="fas fa-arrow-up mr-1"></i>
//                 <span className="text-xs">5% Increase from Last Month</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-sm font-medium text-gray-600">Time Spent</h2>
//               <div className="flex items-center mt-2">
//                 <span className="text-2xl font-bold text-gray-900 mr-2">752</span>
//                 <span className="text-sm text-gray-500">/ 885 hours</span>
//               </div>
//               <div className="flex items-center mt-2 text-red-500">
//                 <i className="fas fa-arrow-down mr-1"></i>
//                 <span className="text-xs">3% Decrease from Last Month</span>
//               </div>
//             </div>
//           </div>
//           {/* <div className="relative">
//             <button className="flex items-center bg-white p-2 rounded-md shadow-md">
//               <span className="text-sm text-gray-600">Last 30 days</span>
//               <i className="fas fa-chevron-down ml-2 text-gray-400"></i>
//             </button>
//           </div> */}
//         </div>
//       </header>
//       <main>
//         <section className="mb-8">
//           <div className="flex justify-between">
//             <div className="w-[62%]">
//               <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-bold">Project Summary</h2>
//                   <div className="flex space-x-2">
//                     <select className="p-2 border rounded-md text-sm">
//                       <option>Project</option>
//                       <option>Manager</option>
//                     </select>
//                     <select className="p-2 border rounded-md text-sm">
//                       <option>Status</option>
//                       <option>Completed</option>
//                       <option>On Track</option>
//                     </select>
//                   </div>
//                 </div>
//                 <table className="w-full text-left text-sm">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="p-2">Project Name</th>
//                       <th className="p-2">Project Manager</th>
//                       <th className="p-2">Due Date</th>
//                       <th className="p-2">Status</th>
//                       <th className="p-2">Progress</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="border-b">
//                       <td className="p-2">Agile Project</td>
//                       <td className="p-2">Matilda Streich</td>
//                       <td className="p-2">June 6, 2022</td>
//                       <td className="p-2 text-green-500">Completed</td>
//                       <td className="p-2">
//                         <div className="flex items-center">
//                           <div className="w-16 bg-gray-200 rounded-full h-1.5">
//                             <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
//                           </div>
//                           <span className="ml-2 text-xs text-gray-500">70%</span>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2">Android Development</td>
//                       <td className="p-2">Cathrine Marvir</td>
//                       <td className="p-2">July 10, 2022</td>
//                       <td className="p-2 text-blue-500">On Track</td>
//                       <td className="p-2">
//                         <div className="flex items-center">
//                           <div className="w-16 bg-gray-200 rounded-full h-1.5">
//                             <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
//                           </div>
//                           <span className="ml-2 text-xs text-gray-500">85%</span>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2">iOS App Development</td>
//                       <td className="p-2">Vladimir Hintz</td>
//                       <td className="p-2">Nov 5, 2022</td>
//                       <td className="p-2 text-yellow-500">Delayed</td>
//                       <td className="p-2">
//                         <div className="flex items-center">
//                           <div className="w-16 bg-gray-200 rounded-full h-1.5">
//                             <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
//                           </div>
//                           <span className="ml-2 text-xs text-gray-500">45%</span>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2">Website Redesign</td>
//                       <td className="p-2">John Doe</td>
//                       <td className="p-2">Dec 1, 2022</td>
//                       <td className="p-2 text-red-500">At Risk</td>
//                       <td className="p-2">
//                         <div className="flex items-center">
//                           <div className="w-16 bg-gray-200 rounded-full h-1.5">
//                             <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
//                           </div>
//                           <span className="ml-2 text-xs text-gray-500">20%</span>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-bold">Work Progress</h2>
//                   <div className="flex space-x-2">
//                     <select className="p-2 border rounded-md text-sm">
//                       <option>Project</option>
//                       <option>Manager</option>
//                     </select>
//                     <select className="p-2 border rounded-md text-sm">
//                       <option>Status</option>
//                       <option>Completed</option>
//                       <option>On Track</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="h-48">
//                   {/* <Pie data={pieData} options={options} /> */}
//                 </div>
//               </div>
//             </div>
//             <div className="w-[35%]">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-bold mb-4">Project Team</h2>
//                 <div className="flex items-center mb-4">
//                   <img src={profile} alt="Team Member" className="w-12 h-12 rounded-full mr-4" />
//                   <div>
//                     <h3 className="text-md font-semibold">John Doe</h3>
//                     <p className="text-sm text-gray-600">Project Manager</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <img src={profile} alt="Team Member" className="w-12 h-12 rounded-full mr-4" />
//                   <div>
//                     <h3 className="text-md font-semibold">Jane Smith</h3>
//                     <p className="text-sm text-gray-600">Lead Developer</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <img src={profile} alt="Team Member" className="w-12 h-12 rounded-full mr-4" />
//                   <div>
//                     <h3 className="text-md font-semibold">Robert Brown</h3>
//                     <p className="text-sm text-gray-600">UI/UX Designer</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-4">
//                   <img src={profile}alt="Team Member" className="w-12 h-12 rounded-full mr-4" />
//                   <div>
//                     <h3 className="text-md font-semibold">Emily Johnson</h3>
//                     <p className="text-sm text-gray-600">QA Engineer</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//                 <h2 className="text-lg font-bold mb-4">Recent Activities</h2>
//                 <ul className="space-y-4">
//                   <li className="flex items-center">
//                     <div className="bg-blue-500 p-2 rounded-full text-white mr-4">
//                       <i className="fas fa-tasks"></i>
//                     </div>
//                     <div>
//                       <h3 className="text-md font-semibold">New Task Assigned</h3>
//                       <p className="text-sm text-gray-600">John Doe assigned a new task to Jane Smith.</p>
//                     </div>
//                   </li>
//                   <li className="flex items-center">
//                     <div className="bg-green-500 p-2 rounded-full text-white mr-4">
//                       <i className="fas fa-check-circle"></i>
//                     </div>
//                     <div>
//                       <h3 className="text-md font-semibold">Task Completed</h3>
//                       <p className="text-sm text-gray-600">Robert Brown completed the UI Design task.</p>
//                     </div>
//                   </li>
//                   <li className="flex items-center">
//                     <div className="bg-yellow-500 p-2 rounded-full text-white mr-4">
//                       <i className="fas fa-exclamation-circle"></i>
//                     </div>
//                     <div>
//                       <h3 className="text-md font-semibold">Task Delayed</h3>
//                       <p className="text-sm text-gray-600">Emily Johnson reported a delay in QA testing.</p>
//                     </div>
//                   </li>
//                   <li className="flex items-center">
//                     <div className="bg-red-500 p-2 rounded-full text-white mr-4">
//                       <i className="fas fa-bug"></i>
//                     </div>
//                     <div>
//                       <h3 className="text-md font-semibold">Bug Reported</h3>
//                       <p className="text-sm text-gray-600">Jane Smith found a bug in the login module.</p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
