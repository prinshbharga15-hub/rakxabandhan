import React from 'react';
import { Heart, Sparkles, Send, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#FAF5EE] via-[#F6ECE0] to-[#EFE2D2] border-t-2 border-amber-300 pt-16 pb-10 text-stone-700 overflow-hidden">
      {/* Decorative top border flourish */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-festive-crimson via-festive-gold to-festive-crimson" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sanskrit Shloka Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 p-6 rounded-3xl glass-card border border-amber-300/80 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-festive-saffron mb-2 block">
            — The Sacred Vedic Verse of Raksha Bandhan —
          </span>
          <p className="font-hindi text-base md:text-xl font-bold text-festive-crimson leading-relaxed tracking-wide">
            "येन बद्धो बली राजा दानवेन्द्रो महाबलः।<br className="hidden sm:inline" /> तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥"
          </p>
          <p className="text-xs md:text-sm text-stone-600 mt-2 italic">
            "I tie upon you the sacred thread that bound the mighty King Bali. May this sacred Raksha protect you steadfastly throughout life."
          </p>
        </div>

        {/* 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-amber-200/80">
          {/* Col 1: Brand & Message */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-festive-crimson to-festive-gold flex items-center justify-center text-white shadow-md">
                <span className="text-lg">🪔</span>
              </div>
              <span className="font-heading font-bold text-xl text-festive-dark">
                Raksha Bandhan
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Celebrate the bond. Cherish the memories. An interactive festival platform honoring the eternal bond of love, respect, and mutual defense between siblings.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-festive-kumkum">
              <Sparkles className="w-4 h-4 text-festive-gold" />
              <span>Happy Raksha Bandhan 2026 ❤️</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-festive-dark text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-festive-crimson">✦</span> Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'About', 'Traditions', '3D Showcase', 'Rakhi Studio', 'Memories'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-stone-600 hover:text-festive-crimson transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Festival Rituals */}
          <div>
            <h4 className="font-heading font-bold text-festive-dark text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-festive-crimson">✦</span> Sacred Rituals
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-1.5">
                <span>🪔</span> Rakhi Purnima Snan & Sankalp
              </li>
              <li className="flex items-center gap-1.5">
                <span>🔴</span> Roli Kumkum & Akshat Tilak
              </li>
              <li className="flex items-center gap-1.5">
                <span>🧵</span> Vedic Raksha Sutra Bandhan
              </li>
              <li className="flex items-center gap-1.5">
                <span>🍬</span> Ghevar & Traditional Sweet Bhog
              </li>
              <li className="flex items-center gap-1.5">
                <span>🎁</span> Raksha Vachan & Gift Exchange
              </li>
            </ul>
          </div>

          {/* Col 4: Auspicious Wishes */}
          <div>
            <h4 className="font-heading font-bold text-festive-dark text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-festive-crimson">✦</span> Festival Blessing
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              "May this Rakhi bring endless joy, robust health, and glowing prosperity to your family."
            </p>
            <div className="p-3 rounded-2xl bg-white/80 border border-amber-300 text-xs">
              <div className="font-semibold text-festive-saffron flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-festive-gold" />
                <span>Pavitra Shravana Purnima</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Auspicious festival celebrated globally by billions with divine grace.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Raksha Bandhan Festival Portal. Crafted with devotion & love ❤️.
          </p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-festive-crimson transition-colors">Heritage</a>
            <a href="#wishes" className="hover:text-festive-crimson transition-colors">Wishes Wall</a>
            <a href="#contact" className="hover:text-festive-crimson transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
