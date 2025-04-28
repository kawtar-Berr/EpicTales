"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';
import { toast, Toaster } from 'sonner';
import { PlusCircleIcon } from '@heroicons/react/outline';

interface Room {
  id: number;
  nom: string;
  statut: string;
  code: string;
  link: string;
  dateCreation: string;
}

const Profile = () => {
  const [publicRooms, setPublicRooms] = useState<Room[]>([]);
  const [joinedRooms, setJoinedRooms] = useState<Room[]>([]);
  const userId = 12;
  const router = useRouter();

  const fetchPublicRooms = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/storyrooms/public`);
      const data = await res.json();
      setPublicRooms(data);
    } catch (error) {
      console.error('Erreur rooms publiques:', error);
    }
  };

  const fetchJoinedRooms = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${userId}/rooms`);
      const data = await res.json();
      setJoinedRooms(data);
    } catch (error) {
      console.error('Erreur rooms rejointes:', error);
    }
  };

  const rejoindreRoom = async (roomId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${userId}/rooms/${roomId}/join`, {
        method: 'POST',
      });

      if (res.ok) {
        toast.success("Vous avez rejoint la room !");
        await fetchJoinedRooms();
      } else {
        toast.error("Erreur lors de la tentative de rejoindre la room.");
      }
    } catch (error) {
      toast.error("Erreur réseau en rejoignant la room.");
      console.error('Erreur en rejoignant la room:', error);
    }
  };

  useEffect(() => {
    fetchPublicRooms();
    fetchJoinedRooms();
  }, []);

  const hasJoined = (roomId: number) => joinedRooms.some((room) => room.id === roomId);

  const handleChatRedirect = (roomId: number) => {
    router.push(`/accueil/chat?id=${roomId}`);
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Toaster richColors position="top-center" />

      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        <NavbarAdmin />

        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Profil Utilisateur</h1>

          {/* Liste des rooms publiques */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Rooms Publiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicRooms.map((room) => (
                <div key={room.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition relative">
                  <h3 className="text-xl font-bold text-[#5e17eb]">{room.nom}</h3>
                  <p className="text-sm text-gray-500">Créée le {new Date(room.dateCreation).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 mt-2">Code: {room.code}</p>
                  <a href={room.link} className="text-blue-500 underline text-sm mt-2 inline-block">Lien d'accès</a>

                  {!hasJoined(room.id) && (
                    <button
                      onClick={() => rejoindreRoom(room.id)}
                      className="absolute top-3 right-3 text-green-600 hover:text-green-800"
                      title="Rejoindre la room"
                    >
                      <PlusCircleIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Liste des rooms rejointes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Vos Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinedRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleChatRedirect(room.id)}
                  className="cursor-pointer border rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-[#445bfb]">{room.nom}</h3>
                  <p className="text-sm text-gray-500">Statut: {room.statut}</p>
                  <a href={room.link} className="text-blue-500 underline text-sm mt-2 inline-block">Lien</a>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
