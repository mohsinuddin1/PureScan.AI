import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSlideImages = ['/foodResult.webp', '/cosmeticResult.webp', '/historyScreen.webp'];

export default function Slideshow({ slides = defaultSlideImages }) {
  const images = Array.isArray(slides) && slides.length > 0 ? slides : defaultSlideImages;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative border-[6px] md:border-[10px] border-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 w-full max-w-[260px] md:max-w-[300px] aspect-[9/18.5] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={images[currentSlide]}
          alt="App Scan Result"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
