import React from 'react';
import SectionHeader from '../common/SectionHeader';
import RakhiShowcase3D from '../3d/RakhiShowcase3D';
import { Sparkles, Eye, Shield, Award } from 'lucide-react';

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="py-20 md:py-28 relative bg-[#FDF8F0] overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="दिव्य रक्षा सूत्र दर्शन"
          badge="3D Interactive Experience"
          title="3D Rakhi Showcase"
          subtitle="Explore the intricate artistry, auspicious sacred beads, and timeless craftsmanship of the ceremonial Rakhi in complete 360-degree interactive 3D."
        />

        {/* 3D Showcase Component (Full Width & Height Frame) */}
        <div className="w-full max-w-6xl mx-auto">
          <RakhiShowcase3D />
        </div>

        {/* 3 Value Pillars under Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-festive-gold flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-festive-dark">Pure Vedic Silk</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Hand-twisted unbleached raw silk cords dipped in sacred turmeric and kumkum pigments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-festive-crimson flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-festive-dark">Royal Kundan Work</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Artisan jewelry craft inspired by Rajasthani and Mughal heritage medal designs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-festive-saffron flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-festive-dark">Sanctified Blessings</h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Imbued with positive cosmic vibrations and the heartfelt prayers of sisters worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
