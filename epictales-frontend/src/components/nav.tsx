"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { getCurrentUser } from "@/utils/auth"; 

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("Utilisateur");

  useEffect(() => {
    if (isLoggedIn) {
      const user = getCurrentUser();
      if (user) setUsername(user.username);
    }
  }, [isLoggedIn]);

  return (
    <nav className="bg-navbar shadow-md flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <Link href="/" className="text-primary font-bold text-xl">EpicTales</Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-white text-lg">
        <li><Link href="/explore" className="hover:text-gold">Explorer</Link></li>
        <li><Link href="/how-it-works" className="hover:text-gold">Comment ça marche</Link></li>
        <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
      </ul>

      {/* Profile & Auth Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Rechercher..."
          className="px-3 py-2 border rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {isLoggedIn ? (
          <>
            {/* Notifications Icon */}
            <Button isIconOnly color="secondary" variant="light">
              🔔
            </Button>

            {/* Profile Picture & Modal */}
            <Avatar 
              src="/profile.jpg" 
              size="lg" 
              className="cursor-pointer" 
              onClick={onOpen} 
            />

            {/* Profile Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <h2 className="text-xl font-bold mb-2">Profil</h2>
                <p>Bienvenue, <strong>{username}</strong>!</p>
                <Button color="primary" fullWidth>Modifier profil</Button>
                <Button color="danger" fullWidth onClick={() => window.location.href="/logout"}>Déconnexion</Button>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-gold">Connexion</Link>
            <Link href="/register" className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-gold">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
