import React, { useState } from 'react';
import { FaFilm, FaSignOutAlt, FaBars, FaTimes, FaPlay } from "react-icons/fa";
import { FiChrome, FiHeart, FiCalendar } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   alert('Logged out successfully!');
  //   navigate('/');
  // };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar with Sliding Animation */}
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen  bg-gray-800 text-white shadow-lg z-50 
          transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:h-screen md:block`}
      >
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold p-5 flex items-center">
          <FaFilm className="mr-2 text-red-500" /> Apex.STUDIO
        </h1>

        {/* Navigation Menu */}
        <div className="grow">
          <p className="text-gray-500 text-xs px-5">News Feed</p>
          <nav>
            <ul className="p-5 space-y-4 text-gray-500 cursor-pointer">
              <li className="flex flex-row gap-5">
                <FiChrome size={20} className="text-red-500" /> Browse
              </li>
              <NavLink to='/moviedetails' className="flex flex-row gap-5">
                <FiHeart size={20} /> Watchlist
              </NavLink>
              <NavLink to='/home' className="flex flex-row gap-5">
                <FaPlay size={20} /> MOVIE
              </NavLink>
              <li className="flex flex-row gap-5">
                <FiCalendar size={20} /> Coming soon
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-5">
          <button
            // onClick={handleLogout}
            className="flex items-center text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <FaSignOutAlt className="mr-2" /> Log Out
          </button>
        </div>
      </aside>

      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
