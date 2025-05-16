'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true}/>
      <main className="flex-grow">
        <HeroSection />
        <StoriesSection />
        <HowToPlaySection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-purple-600 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bienvenue sur EpicTales, prêt à continuer vos histoires ?
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Rejoignez une Room existante ou créez-en une nouvelle pour collaborer en temps réel avec vos amis
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            as={Link}
            href="/join-room"
            className="bg-white text-purple-600 font-medium rounded-md hover:bg-gray-100 transition-all"
            size="lg"
          >
            Rejoindre une salle
          </Button>
          <Button
            as={Link}
            href="/create-room"
            className="bg-white text-purple-600 font-medium rounded-md hover:bg-gray-100 transition-all"
            size="lg"
          >
            Créer une salle
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function StoriesSection() {
  const stories = [
    { id: 1, title: "Histoire 1", description: "A brief description of the story goes here." },
    { id: 2, title: "Histoire 2", description: "A brief description of the story goes here." },
    { id: 3, title: "Histoire 3", description: "A brief description of the story goes here." },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold inline-flex items-center">
            Explorer nos Histoires 
            <span className="ml-2">
              <Image 
                src="/images/book-icon.png" 
                alt="Book icon" 
                width={32} 
                height={32}
                className="object-contain"
              />
            </span>
          </h2>
        </motion.div>
        
        <div className="relative">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-10">
            {stories.map((story) => (
              <motion.div 
                key={story.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-xl font-light">300 × 200</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{story.description}</p>
                  <Link href={`/stories/${story.id}`} className="text-purple-600 text-sm hover:underline">
                    Lire plus ...
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function HowToPlaySection() {
  const steps = [
    {
      icon: "group",
      title: "Rejoindre une salle",
      description: "Rejoignez une Room avec un code ou un lien"
    },
    {
      icon: "pencil",
      title: "Créer votre histoire",
      description: "Écrivez à tour de rôle un fragment d'histoire"
    },
    {
      icon: "book-open",
      title: "Partager et Collaborer",
      description: "Écrivez ensemble pour découvrir l'histoire finale"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Comment jouer ?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-4">
                {step.icon === "group" && (
                  <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                )}
                {step.icon === "pencil" && (
                  <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                )}
                {step.icon === "book-open" && (
                  <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}