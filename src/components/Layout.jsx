// Layout.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6">
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
      )}
      <div className={`flex-grow ${isSideBarOpen ? 'ml-[240px]' : ''}`}>
        <Header
          // setIsBoardModalOpen={setIsBoardModalOpen}
          // isBoardModalOpen={isBoardModalOpen}
        />
        <div className="pt-20"> 
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
