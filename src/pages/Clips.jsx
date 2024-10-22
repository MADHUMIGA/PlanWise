import React from 'react';
import { Link } from 'react-router-dom';
import clip from '../assets/clip.jpg';
import clip2 from '../assets/clip2.jpg';
import clip3 from '../assets/clip3.jpg';

const Clips = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* First Container */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-gray-300 text-center" style={{height:'400px'}}>
          <h3 className="text-xl font-bold mb-4">Record in a Snap</h3>
          <p className="text-gray-600 mb-4">
            Capture your device's screen with just a few clicks. Record and effortlessly share your videos with anyone.
          </p>
          <img src={clip} alt="Record in a Snap" className="mx-auto" /> {/* Replace with actual image source */}
        </div>

        {/* Second Container */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-gray-300 text-center" style={{height:'400px'}}>
          <h3 className="text-xl font-bold mb-4">Unlock Async Productivity</h3>
          <p className="text-gray-600 mb-4">
            Skip the meetings and share all of your design updates, feedback videos, onboarding videos, and more in one place.
          </p>
          <img src={clip2} alt="Unlock Async Productivity" className="mx-auto" /> {/* Replace with actual image source */}
        </div>

        {/* Third Container */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-gray-300 text-center" style={{height:'400px'}}>
          <h3 className="text-xl font-bold mb-4">Watch, Share, Collaborate</h3>
          <p className="text-gray-600 mb-4">
            Clips automatically generate a link, allowing you to quickly share your clips anywhere, even outside of your Workspace.
          </p>
          <img src={clip3} alt="Watch, Share, Collaborate" className="mx-auto" /> {/* Replace with actual image source */}
        </div>
      </div>

      {/* Central Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Create your first Clip!</h3>
        <p className="text-gray-600 mb-4">
          Create and share screen recordings to give your teammates context. Save your recordings, attach them to tasks, or share them anywhere.{' '}
          <Link to="/learn-more" className="text-blue-500 hover:underline">
            Learn more
          </Link>
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => alert('Create Clip button clicked')}
        >
          Create Clip
        </button>
      </div>
    </div>
  );
};

export default Clips;