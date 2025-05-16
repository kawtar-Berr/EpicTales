// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import { BellIcon, ChevronDownIcon } from 'lucide-react';
import { getCurrentUser } from "@/utils/auth";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(2);
  const [username, setUsername] = useState("kawtar-b");

  // Sample notifications data
  const notificationsList = [
    { id: 1, text: "Nouvelle invitation à rejoindre une salle", time: "Il y a 10 minutes", read: false },
    { id: 2, text: "Votre histoire a reçu 5 nouveaux likes", time: "Il y a 2 heures", read: false },
    { id: 3, text: "Un nouvel épisode a été publié dans 'La Quête Mystérieuse'", time: "Hier", read: true },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      const user = getCurrentUser();
      if (user) setUsername(user.username);
    }
  }, [isLoggedIn]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full border-b-2 border-purple-300">
        <div className="flex items-center justify-between w-full px-4 md:px-6 py-2 max-w-[1400px] mx-auto">
          {/* Left side: Logo and Search */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/accueil" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="EpicTales Logo"
                width={150}
                height={32}
              />
            </Link>

            {/* Search Bar - right beside logo */}
            <div className="hidden md:block relative ml-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Navigation Links (to same-page components) */}
          <div className="hidden md:flex items-center justify-center space-x-10">
            <button 
              onClick={() => scrollToSection('accueil')} 
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('explorer')} 
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Explorer
            </button>
            <button 
              onClick={() => scrollToSection('mes-salles')} 
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Mes Salles
            </button>
          </div>

          {/* Right side: Mobile search, Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile dropdown */}
            {isLoggedIn ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button className="flex items-center space-x-2 cursor-pointer">
                    <Avatar
                      src="https://i.pravatar.cc/150"
                      className="w-8 h-8"
                      isBordered
                      color="secondary"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden md:inline">{username}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500 hidden md:inline" />
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
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Connexion
                </Link>
                <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Inscription
                </Link>
              </div>
            )}

            {/* Notifications Dropdown */}
            {isLoggedIn && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button className="relative text-gray-600 hover:text-purple-600 transition-colors">
                    <BellIcon className="h-6 w-6" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Notifications" className="w-80">
                  <DropdownItem key="header" className="px-4 py-2 border-b" textValue="Notifications Header">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                      <button className="text-purple-600 text-sm font-medium hover:underline">
                        Tout marquer comme lu
                      </button>
                    </div>
                  </DropdownItem>
                  <>
                    {notificationsList.map((notif) => (
                      <DropdownItem key={notif.id} className={`px-4 py-3 ${!notif.read ? 'bg-purple-50' : ''}`}>
                        <p className="text-sm font-medium text-gray-800">{notif.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </DropdownItem>
                    ))}
                  </>
                  <DropdownItem key="view-all" className="border-t px-4 py-2 text-center">
                    <span className="text-purple-600 text-sm font-medium hover:underline">
                      Voir toutes les notifications
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (shown when isSearchOpen is true) */}
      {isSearchOpen && (
        <motion.div
          className="md:hidden px-4 py-2"
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
              onChange={handleSearch}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation Menu */}
      <div className="md:hidden px-4 py-2 space-y-2 hidden">
        <button 
          onClick={() => scrollToSection('accueil')} 
          className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md"
        >
          Accueil
        </button>
        <button 
          onClick={() => scrollToSection('explorer')} 
          className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md"
        >
          Explorer
        </button>
        <button 
          onClick={() => scrollToSection('mes-salles')} 
          className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-purple-50 rounded-md"
        >
          Mes Salles
        </button>
      </div>
    </nav>
  );
}