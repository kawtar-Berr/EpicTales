// components/StoryCarousel.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type Story = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

interface StoryCarouselProps {
  stories: Story[];
}

export default function StoryCarousel({ stories }: StoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [stories]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  // Calculate visible stories based on screen size
  const visibleStories = Math.min(3, stories.length);
  
  // Normalized index to handle looping
  const normalizedIndex = stories.length > visibleStories 
    ? currentIndex % stories.length 
    : 0;

  return (
    <div className="relative w-full py-4">
      <button 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <motion.div 
        ref={carouselRef}
        className="overflow-hidden px-10"
      >
        <motion.div
          className="flex"
          animate={{ x: -normalizedIndex * (100 / visibleStories) + '%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {stories.map((story, index) => (
            <motion.div 
              key={story.id}
              className={`flex-none w-full md:w-1/3 px-3 ${
                index < normalizedIndex || index >= normalizedIndex + visibleStories ? 'opacity-0' : 'opacity-100'
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="h-48 bg-gray-300 flex items-center justify-center">
                  {story.image ? (
                    <Image 
                      src={story.image} 
                      alt={story.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xl font-light">300 × 200</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{story.description}</p>
                  <Link href={`/stories/${story.id}`} className="text-purple-600 text-sm hover:underline">
                    Lire plus ...
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6">
        {stories.length > visibleStories && stories.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === normalizedIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}