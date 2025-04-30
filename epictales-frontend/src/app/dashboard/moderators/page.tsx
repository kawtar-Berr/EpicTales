'use client';

import React, { useEffect, useState } from 'react';
import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';
import { Trash2, UserPlus, UserX, Pen, CheckCircle2 } from 'lucide-react';
import styles from '@/styles/users.module.css';
import ModalUser from '@/components/ModalAjoutUser';
import ModalModifierUser from '@/components/ModalEditUser';

const USERS_PER_PAGE = 8;

export default function ModerateursPage() {
  interface User {
    id: number;
    nom: string;
    email: string;
    username: string;
    isAbandoner: boolean;
    IsReported: boolean;
    role: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/utilisateurs');
      const data = await response.json();
      const moderateurs = data.filter((u: User) => u.role === 'Moderateur');
      setUsers(moderateurs);
    } catch (error) {
      console.error("Erreur lors de la récupération des modérateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (userId: number) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce modérateur ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        console.error("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur de requête :", error);
    }
  };

  const handleReportToggle = async (user: User) => {
    const action = user.IsReported ? "annuler le signalement" : "signaler ce compte";
    const confirmToggle = window.confirm(`Voulez-vous vraiment ${action} ?`);

    if (!confirmToggle) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IsReported: !user.IsReported,
        }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Erreur lors de la mise à jour du statut de signalement.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <NavbarAdmin />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-purple-700">Modérateurs</h1>
            <button
              onClick={() => setIsModalOpen(true)}
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
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Username</th>
                  <th className={`${styles.th} text-center`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-purple-50">
                    <td className={styles.td}>{user.nom}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.username}</td>
                    <td className={`${styles.td} text-center`}>
                      <div className="flex justify-center gap-2">
                        <Pen
                          className="text-green-600 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleEditClick(user)}
                        />
                        {user.IsReported ? (
                          <CheckCircle2
                            className="text-green-500 cursor-pointer hover:scale-110 transition"
                            onClick={() => handleReportToggle(user)}
                          />
                        ) : (
                          <UserX
                            className="text-yellow-500 cursor-pointer hover:scale-110 transition"
                            onClick={() => handleReportToggle(user)}
                          />
                        )}
                        <Trash2
                          className="text-red-600 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleDeleteClick(user.id)}
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

          <ModalUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ModalModifierUser
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            selectedUser={selectedUser}
          />
        </main>
      </div>
    </div>
  );
}
