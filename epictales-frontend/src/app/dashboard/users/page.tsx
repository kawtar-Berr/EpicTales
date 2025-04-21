"use client";

import React, { useState } from 'react';
import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';
import { Trash2, UserPlus, UserX, CheckCircle2 } from 'lucide-react';
import styles from '@/styles/users.module.css';
import ModalUser from '@/components/ModalAjoutUser'; 
import ModalModifierUser from '@/components/ModalEditUser'; 


const allUsers = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  nom: `Nom${i + 1}`,
  prenom: `Prenom${i + 1}`,
  email: `user${i + 1}@example.com`,
  username: `user${i + 1}`,
}));

const USERS_PER_PAGE = 8;

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);
  const [users, setUsers] = useState(allUsers);
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Ajout de l'état pour la modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <NavbarAdmin />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700">Utilisateurs</h1>
            <button
              onClick={() => setIsModalOpen(true)} // <-- Ouvre la modal
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <UserPlus size={18} />
              Ajouter
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className={`min-w-full text-sm text-left ${styles.userTable}`}>
              <thead className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                <tr>
                  <th className={styles.th}>Nom</th>
                  <th className={styles.th}>Prénom</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Username</th>
                  <th className={`${styles.th} text-center`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-purple-50">
                    <td className={styles.td}>{user.nom}</td>
                    <td className={styles.td}>{user.prenom}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.username}</td>
                    <td className={`${styles.td} text-center`}>
                      <div className="flex justify-center gap-2">
                        <CheckCircle2 className="text-green-600 cursor-pointer hover:scale-110 transition" onClick={() => setIsEditModalOpen(true)}/>
                        <UserX className="text-yellow-500 cursor-pointer hover:scale-110 transition" />
                        <Trash2 className="text-red-600 cursor-pointer hover:scale-110 transition" />
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

          {/* Affichage de la modal */}
          <ModalUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ModalModifierUser isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

        </main>
      </div>
    </div>
  );
}
