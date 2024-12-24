<<<<<<< HEAD
// src/components/Header.js
=======
>>>>>>> 33e68cd (commit at 1.27 pm)
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons'; 
import profilePic from '../assets/profile-pic.png'; 

function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-4 ml-2 mr-2 mt-2 rounded-lg shadow-md shadow-slate-500">
      <div className="flex items-center bg-gray-100 text-gray-500 rounded-full p-2 w-1/2">
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        <input
          type="text"
          placeholder="Search courses"
          className="bg-gray-100 text-gray-500 outline-none flex-grow"
        />
      </div>
      <div className="flex items-center space-x-8">
        <div className="relative">
          <FontAwesomeIcon icon={faBell} className="text-gray-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="relative">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        <FontAwesomeIcon icon={faCog} className="text-gray-500" />
        <div className="flex items-center space-x-2 ml-4">
          <img src={profilePic} alt="Profile" className="h-8 w-8 rounded-full" />
          <span className="text-gray-700">Tarun</span>
        </div>
      </div>
    </header>
  );
}

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 33e68cd (commit at 1.27 pm)
