'use client';

import { useState,useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import NavbarRoom from '@/components/NavbarRoom';
import { toast } from 'sonner';

export default function RoomPage() {
    const { code } = useParams();
    const [copied, setCopied] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // You can replace with actual auth check

  // Example room name - in real app, you would fetch this from your backend
  const roomName = "Salle d'Aventures";

  const roomLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/accueil/room/${code}`
      : `http://localhost:3000/accueil/room/${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setCopied(false), 1500);
  };

  // Simulate auth check
  useEffect(() => {
    // Replace with your actual auth check logic
    const checkAuth = async () => {
      // Example: const user = await getCurrentUser();
      // setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);

  return (
    <>
    <NavbarRoom 
        isLoggedIn={isLoggedIn} 
        roomName={roomName} 
        roomCode={code as string} 
        roomLink={roomLink}
      />
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Bienvenue dans la salle #{code}</h1>
          <p className="text-gray-600">Partagez le lien ou commencez à écrire votre histoire</p>
        </div>

        <div className="flex justify-center mb-8">
          <Link href={`/accueil/room/${code}/add-story`}>
            <Button color="secondary" size="lg">
              Nouvelle Histoire
            </Button>
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {/* Liste des histoires ici plus tard */}
          <div className="p-4 bg-gray-100 rounded shadow-sm text-center text-gray-500">
            Aucune histoire pour le moment.
          </div>
        </div>
      </div>
    </>
  );
}
