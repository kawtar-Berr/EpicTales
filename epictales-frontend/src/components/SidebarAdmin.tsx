import React from 'react';
import { HomeIcon, UsersIcon, BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';
import styles from '../styles/dashboard.module.css'; // Import the CSS module

const SidebarAdmin = () => {
  return (
    <div className={`${styles.sidebarAdmin} w-64 bg-white h-screen flex flex-col shadow-lg rounded-t-lg rounded-b-lg`}>
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 flex justify-center">
        <img src="/images/logo.png" alt="EpicTales Logo" className="h-16" />
      </div>

      {/* Menu Title (Transparent) */}
      <div className="px-4 py-2 text-black opacity-50 text-sm font-semibold">
        Menu
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <a href="#" className={`${styles.sidebarItem} flex items-center p-4`}>
          <HomeIcon className="h-5 w-5 mr-4" />
          EpicTales
        </a>
        <a href="#" className={`${styles.sidebarItem} flex items-center p-4`}>
          <UsersIcon className="h-5 w-5 mr-4" />
          Utilisateurs
        </a>
        <a href="#" className={`${styles.sidebarItem} flex items-center p-4`}>
          <UsersIcon className="h-5 w-5 mr-4" />
          Modérateurs
        </a>
        <a href="#" className={`${styles.sidebarItem} flex items-center p-4`}>
          <BookOpenIcon className="h-5 w-5 mr-4" />
          Histoires
        </a>
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <a href="#" className={`${styles.sidebarItem} flex items-center p-4`}>
          <LogoutIcon className="h-5 w-5 mr-4" />
          Déconnexion
        </a>
      </div>
    </div>
  );
};

export default SidebarAdmin;
