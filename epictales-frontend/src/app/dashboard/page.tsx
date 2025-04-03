"use client";

import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import NavbarAdmin from '../../components/NavbarAdmin';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { UserIcon, UsersIcon, BookmarkIcon, ChatAltIcon } from '@heroicons/react/outline';
import styles from '../../styles/dashboard.module.css'; // Import du CSS module

// Enregistrement des composants ChartJS nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Exemple de données pour le graphique linéaire
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ventes mensuelles',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#5e17eb', // Violet
      backgroundColor: 'rgba(94, 23, 235, 0.2)',
      tension: 0.4,
    },
  ],
};

// Exemple de données pour le graphique circulaire (camembert)
const pieData = {
  labels: ['Catégorie A', 'Catégorie B', 'Catégorie C'],
  datasets: [
    {
      label: 'Répartition',
      data: [300, 50, 100],
      backgroundColor: ['#5e17eb', '#445bfb', '#fcd34d'], // Violet, Bleu et Jaune
      hoverOffset: 4,
    },
  ],
};

const Dashboard = () => {
  const [nombreUtilisateurs, setNombreUtilisateurs] = useState(0);

  useEffect(() => {
    const fetchNombreUtilisateurs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/utilisateurs/count');
        const data = await response.json();
        setNombreUtilisateurs(data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre d\'utilisateurs:', error);
      }
    };

    fetchNombreUtilisateurs();
  }, []);
  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <SidebarAdmin />
      
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavbarAdmin />
        
        {/* Contenu principal */}
        <main className="p-4 mt-6">
          {/* Section des statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Statistique Utilisateurs */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-4 border border-gray-200 transition transform duration-500 hover:scale-105">
              <div className="flex flex-col">
                <span className={`${styles.statsTitle} text-xl opacity-50 text-sm font-semibold`}>Utilisateurs</span>
                <span className="text-3xl font-bold"> {nombreUtilisateurs} </span>
              </div>
              <div className={`${styles.bgLightGray} p-4 rounded-lg`}>
                <UserIcon className="h-10 w-10 text-[#5e17eb]" />
              </div>
            </div>

            {/* Statistique Modérateurs */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-4 border border-gray-200 transition transform duration-500 hover:scale-105">
              <div className="flex flex-col">
                <span className={`${styles.statsTitle} text-xl opacity-50 text-sm font-semibold`}>Modérateurs</span>
                <span className="text-3xl font-bold">12</span>
              </div>
              <div className={`${styles.bgLightGray} p-4 rounded-lg`}>
                <UsersIcon className="h-10 w-10 text-[#5e17eb]" />
              </div>
            </div>

            {/* Statistique Histoires */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-4 border border-gray-200 transition transform duration-500 hover:scale-105">
              <div className="flex flex-col">
                <span className={`${styles.statsTitle} text-xl opacity-50 text-sm font-semibold`}>Histoires</span>
                <span className="text-3xl font-bold">35</span>
              </div>
              <div className={`${styles.bgLightGray} p-4 rounded-lg`}>
                <BookmarkIcon className="h-10 w-10 text-[#5e17eb]" />
              </div>
            </div>

            {/* Statistique Rooms */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-4 border border-gray-200 transition transform duration-500 hover:scale-105">
              <div className="flex flex-col">
                <span className={`${styles.statsTitle} text-xl opacity-50 text-sm font-semibold`}>Rooms</span>
                <span className="text-3xl font-bold">8</span>
              </div>
              <div className={`${styles.bgLightGray} p-4 rounded-lg`}>
                <ChatAltIcon className="h-10 w-10 text-[#5e17eb]" />
              </div>
            </div>
          </div>

          {/* Deux cartes de graphiques disposées en deux colonnes égales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte du graphique linéaire */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition transform duration-500 hover:scale-105">
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Sacramento, cursive' }}>
                Graphique Linéaire
              </h2>
              <Line data={lineData} />
            </div>
            {/* Carte du graphique circulaire */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition transform duration-500 hover:scale-105">
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Sacramento, cursive' }}>
                Graphique Circulaire
              </h2>
              <Pie data={pieData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
