import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { traditionsData } from '../../data/defaultData';
import { ChevronRight } from 'lucide-react';

// 3D Tilt Card Component for Traditions matching user's uploaded graphic
const TiltCard = ({ tradition, index, onSelect }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(tradition)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
        }}
        className={`h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
          tradition.isSpecialDark
            ? 'bg-gradient-to-b from-[#1E1035] via-[#140A26] to-[#0A0514] text-white border-purple-800/60'
            : 'bg-white text-stone-800 border-amber-200/80 hover:border-amber-400'
        }`}
      >
        {/* Top Image Preview Banner */}
        <div className="h-44 sm:h-48 w-full relative overflow-hidden bg-amber-50">
          <img
            src={tradition.artImage || tradition.cardImage}
            alt={tradition.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Floating Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border flex items-center gap-1.5 ${
                tradition.badgeColor || 'bg-white text-stone-800 border-amber-200'
              }`}
            >
              <span>{tradition.badgeIcon}</span>
              <span>{tradition.badge}</span>
            </span>
          </div>

          {/* Top Right Floating Icon Circle */}
          <div
            className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md z-10 ${
              tradition.topIconBg || 'bg-festive-crimson text-white'
            }`}
          >
            {tradition.topIcon}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
          <div>
            <span
              className={`font-hindi text-xs sm:text-sm font-bold block mb-1 ${
                tradition.isSpecialDark ? 'text-amber-300' : 'text-festive-crimson'
              }`}
            >
              {tradition.hindiTitle}
            </span>

            <h3
              className={`text-base sm:text-lg font-heading font-extrabold tracking-tight leading-snug mb-2 ${
                tradition.isSpecialDark ? 'text-white' : 'text-stone-900 group-hover:text-festive-crimson transition-colors'
              }`}
            >
              {tradition.title}
            </h3>

            <p
              className={`text-xs leading-relaxed ${
                tradition.isSpecialDark ? 'text-purple-200/90' : 'text-stone-600'
              }`}
            >
              {tradition.shortDesc}
            </p>
          </div>

          {/* Bottom Action Pill Button */}
          <div className="pt-4 mt-4 border-t border-amber-100/60 flex items-center justify-between">
            <span
              className={`text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                tradition.isSpecialDark
                  ? 'text-amber-300 group-hover:text-white'
                  : 'text-festive-crimson group-hover:text-festive-saffron'
              }`}
            >
              <span>{tradition.footerText ? 'Shravana Purnima Blessings' : 'Explore Ritual Details'}</span>
            </span>

            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform ${
                tradition.btnColor || 'bg-festive-crimson'
              }`}
            >
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TraditionsSection = () => {
  const [selectedTradition, setSelectedTradition] = useState(null);

  return (
    <section id="traditions" className="py-20 md:py-28 relative bg-[#FFFDF9] overflow-hidden">
      {/* Subtle radial background flourishes */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="पंच पावन परंपराएं"
          badge="Timeless Rituals & Customs"
          title="Raksha Bandhan Traditions"
          subtitle="Explore the sacred customs of the auspicious Rakhi festival, each infused with deep spiritual blessings, filial affection, and lifelong companionship."
        />

        {/* 6 Cards Responsive Grid (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {traditionsData.map((tradition, index) => (
            <TiltCard
              key={tradition.id}
              tradition={tradition}
              index={index}
              onSelect={setSelectedTradition}
            />
          ))}
        </div>
      </div>

      {/* Tradition Details Modal */}
      {selectedTradition && (
        <div
          onClick={() => setSelectedTradition(null)}
          className="fixed inset-0 bg-stone-900/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-white rounded-3xl overflow-hidden border border-amber-300 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedTradition(null)}
              className="absolute top-4 right-4 z-10 text-stone-700 hover:text-stone-900 text-sm p-2 rounded-full bg-white/90 shadow-md"
            >
              ✕
            </button>

            <div className="h-48 w-full relative">
              <img
                src={selectedTradition.artImage || selectedTradition.cardImage}
                alt={selectedTradition.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30 flex items-end p-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-festive-kumkum shadow-sm border border-amber-200">
                    {selectedTradition.badge}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-festive-crimson mt-2">
                    {selectedTradition.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <p className="font-hindi text-sm text-festive-saffron font-bold">
                {selectedTradition.hindiTitle}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-festive-gold text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedTradition.description}
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Spiritual & Emotional Significance
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedTradition.significance}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default TraditionsSection;
