import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Compass, ShieldCheck, Gift } from 'lucide-react';
import Hero3DScene from '../3d/Hero3DScene';
import FestiveButton from '../common/FestiveButton';

export const HeroSection = ({ onOpenCeremony, onExploreClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 md:pt-28 md:pb-24 flex flex-col justify-center overflow-hidden bg-festive-gradient"
    >
      {/* Background soft ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-amber-300/25 via-red-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-[550px] h-[550px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Festive Headings, Subtitle & Action Buttons */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            
            {/* Auspicious Festive Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 shadow-sm"
            >
              <span className="text-festive-saffron">🪔</span>
              <span className="text-xs font-bold uppercase tracking-wider text-festive-kumkum">
                Shravana Purnima Mahotsav
              </span>
              <span className="text-amber-400">•</span>
              <span className="font-hindi text-xs text-festive-saffron font-bold">
                रक्षाबंधन
              </span>
              <span className="text-festive-saffron">✨</span>
            </motion.div>

            {/* Main Festive Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-2"
            >
              <span className="font-hindi text-2xl md:text-3xl text-festive-saffron font-bold block">
                शुभ रक्षाबंधन
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-festive-dark tracking-tight leading-[1.12]">
                Happy <br className="hidden sm:inline" />
                <span className="festive-gradient-text">
                  Raksha Bandhan
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-700 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              "A sacred bond of unconditional love, eternal protection, and cherished childhood memories that lasts forever."
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <FestiveButton
                variant="primary"
                size="lg"
                icon={Sparkles}
                onClick={onOpenCeremony}
              >
                Celebrate Together
              </FestiveButton>

              <FestiveButton
                variant="outline"
                size="lg"
                icon={Compass}
                onClick={onExploreClick}
              >
                Explore Traditions
              </FestiveButton>
            </motion.div>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-amber-200/80 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-festive-crimson flex-shrink-0">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>Pure Bond</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-festive-gold flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Sacred Vow</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-festive-saffron flex-shrink-0">
                  <Gift className="w-3.5 h-3.5" />
                </div>
                <span>Sweet Joy</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: 3D Interactive Floating Rakhi Scene (Normally Big & Perfectly Balanced) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 relative w-full h-full flex items-center justify-center"
          >
            {/* Seamless 3D Canvas Viewport */}
            <div className="w-full relative flex items-center justify-center">
              <Hero3DScene />
              
              {/* Subtle Floating Interactive 3D Badge */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-200 shadow-md text-[11px] font-semibold text-stone-700 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-festive-crimson animate-ping" />
                <span>3D Interactive Rakhi • Drag to Rotate 360°</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
