import React from 'react'
import status from '../assets/status.svg';
import collab from '../assets/collab.svg';
import assign from '../assets/assign.svg';
import deadline from '../assets/deadline.svg';
import backgroundImage from '../assets/pm1.jpg';

// import '../App.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">WorkflowManager</h1>
            </div>
            <div className="flex items-center">
              <button className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate("/login")}
              >Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Section */}
      <header
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">Manage Your Projects Efficiently</h2>
        <p className="mt-4 text-xl md:text-2xl">Boost your team's productivity and streamline your workflow</p>
        <p className="mt-2 text-lg md:text-xl italic">"The secret to getting ahead is getting started."</p>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </header>

      {/* Alternating Sections */}
      <section className="min-h-screen py-12 flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-between">
            <div className="lg:w-1/2">
              <img src={status} alt="Description1" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:mr-8 flex flex-col justify-center">
              <h6 className="text-blue-800">TRACK PROCESS</h6>
              <h3 className="text-4xl font-bold text-gray-900">Manage and update <br />task statuses</h3>
              <p className="mt-4 text-gray-600">Keep track of your tasks with customizable statuses like "To Do," "In Progress," "Review," and "Done." Easily visualize your project's progress and stay organized. Regular updates ensure no task is forgotten.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-12 flex items-center bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="lg:w-1/2">
              <img src={collab} alt="Description2" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8 flex flex-col justify-center">
              <h6 className="text-blue-800">STAY ORGANIZED</h6>
              <h3 className="text-3xl font-bold text-gray-900">Team Collaboration</h3>
              <p className="mt-4 text-gray-600">Invite team members to collaborate on tasks, share insights, and solve problems together. Use built-in chat and comment features to keep everyone connected and informed. Foster a collaborative and transparent work environment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-12 flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-between">
            <div className="lg:w-1/2">
              <img src={assign} alt="Description3" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:mr-8 flex flex-col justify-center">
              <h6 className="text-blue-800">SAVE TIME</h6>
              <h3 className="text-4xl font-bold text-gray-900">Smart Resource Allocation</h3>
              <p className="mt-4 text-gray-600">Utilize AI to suggest the best resources for each task, helping your team work smarter and more effectively. Ensure everyone has what they need to complete their tasks successfully. Minimize downtime and maximize efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-12 flex items-center bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="lg:w-1/2 flex justify-center">
              <img src={deadline} alt="Description4" className="w-3/4 lg:w-2/3 h-auto" />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8 flex flex-col justify-center h-full">
              <h6 className="text-blue-800">STAY ON SCHEDULE</h6>
              <h3 className="text-3xl font-bold text-gray-900">Predict Deadlines</h3>
              <p className="mt-4 text-gray-600">Use predictive analytics to accurately forecast task deadlines and keep your project on track. Plan ahead and manage your timeline with confidence. Avoid last-minute rushes and stay on top of your schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p>&copy; {new Date().getFullYear()} WorkflowManager. All rights reserved.</p>
            <p>Contact us at: contact@workflowmanager.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

