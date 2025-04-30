'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalModifierUserProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: {
    id: number;
    nom: string;
    email: string;
    username: string;
  } | null;
}

export default function ModalModifierUser({ isOpen, onClose, selectedUser }: ModalModifierUserProps) {
  const [formData, setFormData] = React.useState({
    nom: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nom: selectedUser.nom || '',
        email: selectedUser.email || '',
        username: selectedUser.username || '',
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Échec de la mise à jour');

      alert('Utilisateur modifié avec succès');
      onClose(); // Ferme la modale
      window.location.reload(); // Recharge la page pour rafraîchir la liste (optionnel)
    } catch (error) {
      console.error('Erreur lors de la modification :', error);
      alert('Une erreur est survenue.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>

          <h2
            className="text-center text-3xl mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Modifier Utilisateur
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
