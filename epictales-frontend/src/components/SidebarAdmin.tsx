import React from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  LogoutIcon,
  CubeIcon,
} from '@heroicons/react/outline';
import styles from '../styles/dashboard.module.css';

const SidebarAdmin = () => {
  return (
    <div className={`${styles.sidebarAdmin} w-64 bg-white h-screen flex flex-col shadow-lg rounded-t-lg rounded-b-lg`}>
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 flex justify-center">
        <img src="/images/logo.png" alt="EpicTales Logo" className="h-16" />
      </div>

      {/* Menu Title */}
      <div className="px-4 py-2 text-black opacity-50 text-sm font-semibold">
        Menu
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <HomeIcon className="h-5 w-5 mr-4" />
            EpicTales
          </div>
        </Link>

        <Link href="/dashboard/users">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <UsersIcon className="h-5 w-5 mr-4" />
            Utilisateurs
          </div>
        </Link>

        <Link href="/dashboard/moderators">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <UsersIcon className="h-5 w-5 mr-4" />
            Modérateurs
          </div>
        </Link>

        <Link href="/dashboard/histoires">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <BookOpenIcon className="h-5 w-5 mr-4" />
            Histoires
          </div>
        </Link>

        <Link href="/dashboard/rooms">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <CubeIcon className="h-5 w-5 mr-4" />
            Rooms
          </div>
        </Link>
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-gray-200">
        <Link href="/logout">
          <div className={`${styles.sidebarItem} flex items-center p-4`}>
            <LogoutIcon className="h-5 w-5 mr-4" />
            Déconnexion
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarAdmin;
