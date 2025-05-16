// components/Navbar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import { BellIcon } from 'lucide-react';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(2); // Sample notification count

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="EpicTales Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="text-purple-600 font-bold text-xl">EpicTales</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block relative mx-4 flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Accueil
            </Link>
            <Link href="/explorer" className="text-gray-700 hover:text-purple-600 transition-colors">
              Explorer
            </Link>
            <Link href="/mes-salles" className="text-gray-700 hover:text-purple-600 transition-colors">
              Mes Salles
            </Link>
          </div>

          {/* Notifications and Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <BellIcon className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center space-x-2">
                  <Avatar
                    src="https://i.pravatar.cc/150"
                    className="w-8 h-8 cursor-pointer"
                    isBordered
                    color="secondary"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden md:inline">Username</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hidden md:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile">Mon Profil</DropdownItem>
                <DropdownItem key="settings">Paramètres</DropdownItem>
                <DropdownItem key="logout" className="text-danger" color="danger">
                  Déconnexion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search Bar (shown when isSearchOpen is true) */}
        {isSearchOpen && (
          <motion.div
            className="md:hidden mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Navigation Menu (shown when menu is open) */}
        <div className="md:hidden mt-4 space-y-2 hidden">
          <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md">
            Accueil
          </Link>
          <Link href="/explorer" className="block py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md">
            Explorer
          </Link>
          <Link href="/mes-salles" className="block py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md">
            Mes Salles
          </Link>
        </div>
      </div>
    </nav>
  );
}