// app/chat/page.tsx  (ou pages/chat.tsx selon ta config)
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import NavbarAdmin from '@/components/NavbarAdmin';
import SidebarAdmin from '@/components/SidebarAdmin';
import { UsersIcon, ChatAlt2Icon, ArrowLeftIcon } from '@heroicons/react/outline';
import { toast, Toaster } from 'sonner';

interface Participant {
  id: number;
  nom: string;
}

interface Message {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

const ChatPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("id");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages] = useState<Message[]>([
    { id: 1, author: "Alice", text: "Hey tout le monde !", timestamp: "10:00" },
    { id: 2, author: "Bob", text: "Salut Alice, prêt pour l’écriture ?", timestamp: "10:02" },
    { id: 3, author: "Alice", text: "Oui, je propose qu’on commence par un prologue...", timestamp: "10:05" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll automatique en bas
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Récupérer les participants
    const fetchParticipants = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/storyrooms/${roomId}/members`);
        const data = await res.json();
        setParticipants(data);
      } catch (err) {
        console.error("Erreur fetch participants:", err);
      }
    };
    if (roomId) fetchParticipants();
  }, [roomId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    toast.success("Message envoyé (simulation)!");
    setNewMsg("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster richColors position="top-center" />

      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        <NavbarAdmin />

        <main className="flex flex-1 p-4 space-x-4">
          {/* Participants */}
          <aside className="w-64 bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="flex items-center text-lg font-semibold mb-4 text-purple-700">
              <UsersIcon className="h-5 w-5 mr-2"/> Participants
            </h2>
            <ul className="space-y-2 overflow-y-auto flex-1">
              {participants.map(p => (
                <li key={p.id} className="flex items-center gap-2 p-2 rounded hover:bg-purple-50 cursor-pointer">
                  <ChatAlt2Icon className="h-4 w-4 text-purple-500"/>
                  <span className="text-gray-800">{p.nom}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Zone de chat */}
          <section className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
            {/* En-tête */}
            <header className="flex items-center justify-between border-b border-gray-200 p-4">
              <button
                onClick={() => window.history.back()}
                className="text-gray-500 hover:text-gray-800"
                title="Retour"
              >
                <ArrowLeftIcon className="h-6 w-6"/>
              </button>
              <h1 className="text-xl font-bold text-purple-700">Room #{roomId}</h1>
              <div /> {/* espace pour équilibrer */}
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">{msg.author}</span>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  <p className="bg-gray-50 p-2 rounded-lg">{msg.text}</p>
                </div>
              ))}
              <div ref={msgEndRef} />
            </div>

            {/* Barre d'envoi */}
            <footer className="border-t border-gray-200 p-4 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                Envoyer
              </button>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
