"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <Navbar isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            {isLoggedIn
              ? "Créez et jouez à des histoires collaboratives en temps réel !"
              : "Bienvenue sur EpicTales, prêt à continuer vos histoires ?"}
          </h1>
          <p>
            {isLoggedIn
              ? "Rejoignez une Room et écrivez ensemble une aventure unique."
              : "Rejoignez une Room existante ou créez-en une nouvelle pour collaborer en temps réel avec vos amis."}
          </p>
          <div className="buttons">
            <button>Rejoindre une salle</button>
            <button>Créer une salle</button>
          </div>
        </motion.div>
      </section>

      {/* Explorer Section */}
      <section className="explorer">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explorer nos Histoires 📖
        </motion.h2>
        <div className="stories">
          {[1, 2, 3].map((story) => (
            <motion.div
              key={story}
              className="story-card"
              whileHover={{ scale: 1.05 }}
            >
              <img src={`https://via.placeholder.com/300x200`} alt={`Histoire ${story}`} />
              <p>Histoire {story}</p>
              <a href="#">Lire plus ...</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comment Jouer Section */}
      <section className="how-to-play">
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Comment jouer ?
        </motion.h2>
        <div className="steps">
          <motion.div whileHover={{ scale: 1.1 }}>
            <p>Rejoindre une salle</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <p>Créer votre histoire</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <p>Partager et Collaborer</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;