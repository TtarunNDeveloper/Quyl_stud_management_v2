// src/components/NavBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBook, faBookOpen, faQuestion, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons'; // Added faBookOpen for Chapter
import logo from '../assets/logo.png'; 

function NavBar() {
  return (
    <nav className="bg-white text-gray-500 w-64 h-screen p-4 ml-2 mt-2 rounded-lg">
      <div className="mb-8">
        <img src={logo} alt="Logo" className="h-16 mx-auto" /> 
      </div>
      <ul className="space-y-5 justify-between">
        <li className="flex items-center p-2 hover:bg-gray-200 hover:text-black font-normal hover:font-bold">
          <FontAwesomeIcon icon={faClock} className="mr-3" />
          <a href="/" className="hover:underline">Dashboard</a>
        </li>
        <li className="flex items-center p-2 bg-gray-100 rounded font-bold hover:bg-gray-200 hover:text-black">
          <FontAwesomeIcon icon={faBook} className="mr-3" />
          <a href="/students" className="hover:underline">Students</a>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-200 hover:text-black font-normal hover:font-bold">
          <FontAwesomeIcon icon={faBookOpen} className="mr-3" />
          <a href="/chapter" className="hover:underline">Chapter</a>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-200 hover:text-black font-normal hover:font-bold">
          <FontAwesomeIcon icon={faQuestion} className="mr-3" />
          <a href="/help" className="hover:underline">Help</a>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-200 hover:text-black font-normal hover:font-bold">
          <FontAwesomeIcon icon={faChartPie} className="mr-3" />
          <a href="/reports" className="hover:underline">Reports</a>
        </li>
        <li className="flex items-center p-2 hover:bg-gray-200 hover:text-black font-normal hover:font-bold">
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          <a href="/settings" className="hover:underline">Settings</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
