'use client';

import React, { useEffect, useState } from 'react';
import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';
import { Trash2, Pen, PlusCircle } from 'lucide-react';
import styles from '@/styles/users.module.css';
import ModalRoom from '@/components/ModalAjoutRoom';
import ModalModifierRoom from '@/components/ModalEditRoom';

const ROOMS_PER_PAGE = 8;

export default function RoomsPage() {
  interface Room {
    id: number;
    nom: string;
    statut: string;
    code: string;
    link: string;
  }

  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE;
  const currentRooms = rooms.slice(startIndex, startIndex + ROOMS_PER_PAGE);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/storyrooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleEditClick = (room: Room) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (roomId: number) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette room ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/storyrooms/${roomId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      } else {
        console.error("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur de requête:", error);
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <NavbarAdmin />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700">Rooms</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Ajouter
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className={`min-w-full text-sm text-left ${styles.userTable}`}>
              <thead className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                <tr>
                  <th className={styles.th}>Nom</th>
                  <th className={styles.th}>Statut</th>
                  <th className={styles.th}>Code</th>
                  <th className={styles.th}>Lien</th>
                  <th className={`${styles.th} text-center`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-purple-50">
                    <td className={styles.td}>{room.nom}</td>
                    <td className={styles.td}>{room.statut}</td>
                    <td className={styles.td}>{room.code}</td>
                    <td className={styles.td}>{room.link}</td>
                    <td className={`${styles.td} text-center`}>
                      <div className="flex justify-center gap-2">
                        <Pen
                          className="text-green-600 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleEditClick(room)}
                        />
                        <Trash2
                          className="text-red-600 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleDeleteClick(room.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-white hover:bg-purple-100 text-purple-600 border-purple-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <ModalRoom isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ModalModifierRoom
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            selectedRoom={selectedRoom}
          />
        </main>
      </div>
    </div>
  );
}
