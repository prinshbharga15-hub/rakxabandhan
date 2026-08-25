import React from 'react';
import { motion } from 'framer-motion';

export const HeroFallback2D = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-8">
      {/* Glowing radial background ring */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.7, 0.35],
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-80 h-80 md:w-[460px] md:h-[460px] rounded-full border-2 border-dashed border-festive-gold/40 shadow-gold-glow pointer-events-none"
      />

      {/* High-Resolution HD Rakhi Image with 3D Float Animation */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 flex items-center justify-center"
      >
        <img
          src="/rakhi_premium.png"
          alt="Royal Kundan Rakhi"
          className="w-80 sm:w-96 md:w-[480px] lg:w-[540px] h-auto object-contain drop-shadow-2xl filter brightness-105"
        />
      </motion.div>

      {/* Interactive Hint */}
      <p className="mt-4 text-xs font-semibold text-festive-gold uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-festive-saffron animate-ping" />
        Royal Kundan & Ruby Rakhi
      </p>
    </div>
  );
};

export default HeroFallback2D;
