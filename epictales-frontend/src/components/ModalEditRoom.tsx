'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalModifierRoomProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: {
    id: number;
    nom: string;
    statut: string;
    code: string;
    link: string;
  } | null;
}

export default function ModalModifierRoom({ isOpen, onClose, selectedRoom }: ModalModifierRoomProps) {
  const [formData, setFormData] = useState({
    nom: '',
    statut: '',
    code: '',
    link: '',
  });

  useEffect(() => {
    if (selectedRoom) {
      setFormData({
        nom: selectedRoom.nom || '',
        statut: selectedRoom.statut || '',
        code: selectedRoom.code || '',
        link: selectedRoom.link || '',
      });
    }
  }, [selectedRoom]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedRoom) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/storyrooms/${selectedRoom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
      alert('Room modifiée avec succès');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erreur :', error);
      alert('Une erreur est survenue.');
    }
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
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={22} />
        </button>

        <h2
            className="text-center text-3xl mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
           Modifier la Room</h2>

        <div className="space-y-4">
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
          <input type="text" name="statut" placeholder="Statut" value={formData.statut} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
          <input type="text" name="code" placeholder="Code" value={formData.code} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
          <input type="text" name="link" placeholder="Lien" value={formData.link} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />

          <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
    </>
);
}