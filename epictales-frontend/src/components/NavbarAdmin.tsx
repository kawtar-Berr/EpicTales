import React from 'react';
import { BellIcon, UserCircleIcon, SunIcon, MenuIcon, SearchIcon } from '@heroicons/react/outline';
import styles from '../styles/dashboard.module.css'; // Import du CSS module

const NavbarAdmin = () => {
  return (
    <div className="bg-white text-gray-800 shadow-md px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* Logo + Extension du Sidebar */}
      <div className="flex items-center space-x-4">
        <MenuIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border-none rounded-lg focus:outline-none"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Icônes d'interaction */}
      <div className="flex items-center space-x-6">
        <SunIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        <BellIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        <UserCircleIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200" />
      </div>
    </div>
  );
};

export default NavbarAdmin;
