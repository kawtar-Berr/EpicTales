// components/NavbarRoom.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button, Tooltip } from '@nextui-org/react';
import { BellIcon, ChevronDownIcon, Copy, CheckCircle, User } from 'lucide-react';
import { toast } from 'sonner';

interface NavbarRoomProps {
  isLoggedIn: boolean;
  roomName: string;
  roomCode: string;
  roomLink: string;
  username?: string;
}

export default function NavbarRoom({ isLoggedIn, roomName, roomCode, roomLink, username = "kawtar-b" }: NavbarRoomProps) {
  const [notifications, setNotifications] = useState(2);
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'none' | 'notifications' | 'profile'>('none');
  const [showRoomNameAnimation, setShowRoomNameAnimation] = useState(true);

  // Initial animation effect and room name dynamism
  useEffect(() => {
    // Show initial animation
    setShowRoomNameAnimation(true);
    
    // Turn off the animation after it completes
    const timer = setTimeout(() => {
      setShowRoomNameAnimation(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [roomName]); // Re-run the animation when roomName changes

  // Sample notifications data
  const notificationsList = [
    { id: 1, text: "Nouvelle invitation à rejoindre une salle", time: "Il y a 10 minutes", read: false },
    { id: 2, text: "Votre histoire a reçu 5 nouveaux likes", time: "Il y a 2 heures", read: false },
    { id: 3, text: "Un nouvel épisode a été publié dans 'La Quête Mystérieuse'", time: "Hier", read: true },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCodeCopied(true);
    toast.success('Code copié !');
    setTimeout(() => setCodeCopied(false), 1500);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(roomLink);
    setLinkCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setLinkCopied(false), 1500);
  };
  
  const toggleNotifications = () => {
    if (activeTab === 'notifications') {
      setActiveTab('none');
    } else {
      setActiveTab('notifications');
    }
  };
  
  const toggleProfile = () => {
    if (activeTab === 'profile') {
      setActiveTab('none');
    } else {
      setActiveTab('profile');
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(0);
    toast.success('Toutes les notifications ont été marquées comme lues');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full border-b-2 border-purple-300">
        <div className="flex items-center justify-between w-full px-4 md:px-6 py-2 max-w-[1400px] mx-auto">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <Link href="/accueil" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="EpicTales Logo"
                width={150}
                height={32}
              />
            </Link>
          </div>

          {/* Middle: Room Info */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-6">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-serif font-medium text-purple-700 hover:text-purple-900 transition-colors duration-300 group relative">
                {roomName}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-700 ${showRoomNameAnimation ? 'w-full animate-pulse' : 'w-0 group-hover:w-full'}`}></span>
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">#{roomCode}</span>
                <Tooltip content="Copier le code">
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    onPress={handleCopyCode}
                  >
                    {codeCopied ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 truncate max-w-[200px]">{roomLink}</span>
              <Tooltip content="Copier le lien">
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onPress={handleCopyLink}
                >
                  {linkCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Right side: Notifications and Profile */}
          <div className="flex items-center space-x-4">
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

      {/* Mobile Room Info */}
      <div className="md:hidden p-3 space-y-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-serif font-medium text-purple-700 hover:text-purple-900 transition-colors duration-300 group relative">
            {roomName}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-700 ${showRoomNameAnimation ? 'w-full animate-pulse' : 'w-0 group-hover:w-full'}`}></span>
          </span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">#{roomCode}</span>
            <Button 
              isIconOnly 
              size="sm" 
              variant="light" 
              onPress={handleCopyCode}
            >
              {codeCopied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 truncate max-w-[180px]">Lien:</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 truncate max-w-[150px] mr-2">{roomLink.split('/').pop()}</span>
            <Button 
              isIconOnly 
              size="sm" 
              variant="light" 
              onPress={handleCopyLink}
            >
              {linkCopied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}