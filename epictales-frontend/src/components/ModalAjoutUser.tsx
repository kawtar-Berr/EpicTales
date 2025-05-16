'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalUser({ isOpen, onClose }: ModalUserProps) {
  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Google Font import (à mettre dans le layout ou global.css si tu préfères) */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');
      `}</style>

      <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          <button
            onClick={onClose}
            title="Close"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>

          {/* Titre manuscrit */}
          <h2
            className="text-center text-3xl mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Ajouter Nouvel User
          </h2>

          {/* Formulaire */}
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
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
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
          </div>
        </div>
      </div>
    </>
  );
}
