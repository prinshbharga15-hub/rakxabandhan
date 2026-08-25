import React, { useState, useEffect } from 'react';
import { Menu, Sparkles, Heart, Camera } from 'lucide-react';
import FestiveButton from '../common/FestiveButton';
import SoundToggle from '../common/SoundToggle';
import MobileDrawer from './MobileDrawer';

export const Navbar = ({ onOpenCeremony, onOpenSelfie }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', hindi: 'गृह', href: '#home' },
    { name: 'About', hindi: 'परिचय', href: '#about' },
    { name: 'Traditions', hindi: 'परंपराएं', href: '#traditions' },
    { name: '3D Showcase', hindi: 'राखी दर्शन', href: '#showcase' },
    { name: 'Rakhi Studio', hindi: 'राखी सृजन', href: '#customizer' },
    { name: 'Memories', hindi: 'यादें', href: '#memories' },
    { name: 'Wishes', hindi: 'शुभकामनाएं', href: '#wishes' },
    { name: 'Countdown', hindi: 'मुहूर्त', href: '#countdown' },
    { name: 'Gallery', hindi: 'चित्र वीथिका', href: '#gallery' },
    { name: 'Contact', hindi: 'संपर्क', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-amber-200/80 shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-festive-crimson to-festive-gold flex items-center justify-center text-white shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
              <span className="text-xl">🪔</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg md:text-xl text-festive-dark tracking-tight">
                  Raksha Bandhan
                </span>
                <span className="text-xs text-festive-saffron">✨</span>
              </div>
              <p className="text-[10px] font-hindi text-festive-saffron font-bold -mt-1 tracking-wide">
                रक्षाबंधन पावन पर्व
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-200/70 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'text-festive-crimson bg-gradient-to-r from-red-50 to-amber-50 shadow-xs'
                      : 'text-stone-700 hover:text-festive-kumkum hover:bg-amber-50/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-festive-crimson rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Sibling Selfie Photo Booth Button */}
            <button
              onClick={onOpenSelfie}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-md transition-transform active:scale-95 border border-pink-400"
              title="Take Sibling Selfie with Festive Frames"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Selfie Booth</span>
            </button>

            {/* Ambient Sound Toggle */}
            <SoundToggle />

            {/* Desktop Celebrate CTA Button */}
            <div className="hidden sm:block">
              <FestiveButton
                variant="primary"
                size="sm"
                icon={Sparkles}
                onClick={onOpenCeremony}
              >
                Celebrate Now
              </FestiveButton>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-2xl bg-white/80 border border-amber-300 text-stone-800 hover:bg-amber-50"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-festive-crimson" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onOpenCeremony={onOpenCeremony}
      />
    </>
  );
};

export default Navbar;
