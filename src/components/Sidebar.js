import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { MdDashboard, MdTaskAlt } from 'react-icons/md';
import { FaTasks, FaUsers } from 'react-icons/fa';
import { BiSolidVideoRecording } from "react-icons/bi";

import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";

import boardsSlice from "../redux/projectSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  const linkData = [
    { label: 'Dashboard', link: '/dashboard', icon: <MdDashboard /> },
    { label: 'Kanban Board', link: '/kanbanboard', icon: <FaTasks /> },
    { label: 'Projects', link: '/projects', icon: <MdTaskAlt /> },
    { label: 'Team', link: '/team', icon: <FaUsers /> },
    // { label: 'Clips', link: '/clips', icon: <BiSolidVideoRecording /> },
  ];


  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[64px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl">
              {/* <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3> */}

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">

                <div>
                {linkData.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#2695d1] dark:hover:bg-white dark:hover:text-[#2695d1] dark:text-white ${isActive ? 'bg-[#2695d1] rounded-r-full text-white mr-8' : ''
                      }`
                    }
                  >
                    <span className="mr-3 text-2xl">{item.icon}</span>
                    <p className="text-lg font-bold">{item.label}</p>
                  </NavLink>
                ))}
            </div>

                <div className=" mx-5 top-10  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${darkSide ? "bg-[#2695d1]" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${darkSide ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className=" flex  items-center mt-2  absolute bottom-10  text-lg font-bold  rounded-r-full hover:text-[#2695d1] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute  rounded-r-full bg-[#2695d1] p-5  " onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;
