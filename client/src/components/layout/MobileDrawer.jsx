import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, HeartHandshake } from 'lucide-react';
import FestiveButton from '../common/FestiveButton';
import SoundToggle from '../common/SoundToggle';

export const MobileDrawer = ({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavClick,
  onOpenCeremony
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FDF6E9] border-l border-amber-300 shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div>
              {/* Header with close button */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪔</span>
                  <div>
                    <h3 className="font-heading font-bold text-festive-crimson text-lg">
                      Raksha Bandhan
                    </h3>
                    <p className="text-[11px] font-hindi text-festive-saffron font-semibold">
                      रक्षाबंधन पावन उत्सव
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-amber-100 text-stone-700 hover:bg-amber-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sound Controls */}
              <div className="my-4 flex items-center justify-between bg-white/70 p-3 rounded-2xl border border-amber-200">
                <span className="text-xs font-semibold text-stone-700">Festive Music & Chimes</span>
                <SoundToggle />
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-1.5 my-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(link.href);
                        onClose();
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-red-100 to-amber-100 text-festive-crimson font-bold border border-festive-crimson/40 shadow-sm'
                          : 'text-stone-700 hover:bg-amber-50/80 hover:text-festive-kumkum'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-festive-gold">✦</span>
                        <span>{link.name}</span>
                      </div>
                      <span className="font-hindi text-xs text-stone-400 font-normal">
                        {link.hindi}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Ceremony CTA Button */}
            <div className="pt-4 border-t border-amber-200 flex flex-col gap-3">
              <FestiveButton
                variant="primary"
                size="md"
                className="w-full"
                icon={Sparkles}
                onClick={() => {
                  onClose();
                  onOpenCeremony();
                }}
              >
                Celebrate Now (Virtual Rakhi)
              </FestiveButton>
              <p className="text-[11px] text-center text-stone-500">
                "A bond of love & protection that lasts forever."
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
