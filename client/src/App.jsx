import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FestiveParticles from './components/effects/FestiveParticles';
import PetalShower from './components/effects/PetalShower';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import TraditionsSection from './components/sections/TraditionsSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import RakhiCustomizer from './components/sections/RakhiCustomizer';
import MemoriesCarousel from './components/sections/MemoriesCarousel';
import WishesGenerator from './components/sections/WishesGenerator';
import WishesWall from './components/sections/WishesWall';
import CountdownSection from './components/sections/CountdownSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import VirtualRakhiModal from './components/sections/VirtualRakhiModal';
import FestiveSelfieModal from './components/sections/FestiveSelfieModal';
import MusicPlayer from './components/common/MusicPlayer';
import Toast from './components/common/Toast';

export function App() {
  const [isCeremonyOpen, setIsCeremonyOpen] = useState(false);
  const [isSelfieOpen, setIsSelfieOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [wishesRefresh, setWishesRefresh] = useState(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleExploreClick = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-festive-cream text-festive-dark font-sans selection:bg-festive-gold/30 selection:text-festive-kumkum">
      {/* Background Visual Atmospheric Layers */}
      <FestiveParticles />
      <PetalShower />

      {/* Navigation Header */}
      <Navbar
        onOpenCeremony={() => setIsCeremonyOpen(true)}
        onOpenSelfie={() => setIsSelfieOpen(true)}
      />

      {/* Main Experience Sections */}
      <main className="relative z-10">
        {/* 1. Hero 3D Section */}
        <HeroSection
          onOpenCeremony={() => setIsCeremonyOpen(true)}
          onExploreClick={handleExploreClick}
        />

        {/* 2. About Raksha Bandhan */}
        <AboutSection />

        {/* 3. Traditions (3D Tilt Cards) */}
        <TraditionsSection />

        {/* 4. 3D Rakhi Showcase (360° Inspection & Hotspots) */}
        <ShowcaseSection />

        {/* 5. "Design Your Rakhi" 3D Studio */}
        <RakhiCustomizer
          onOpenCeremony={() => setIsCeremonyOpen(true)}
          showToast={showToast}
        />

        {/* 6. Brother & Sister Memories Carousel */}
        <MemoriesCarousel showToast={showToast} />

        {/* 7. Personalized Wishes Generator */}
        <WishesGenerator
          onWishSubmitted={() => setWishesRefresh((prev) => prev + 1)}
          showToast={showToast}
        />

        {/* 8. Live Community Wishes Wall */}
        <WishesWall
          refreshTrigger={wishesRefresh}
          showToast={showToast}
        />

        {/* 9. Festival Countdown & Auspicious Muhurat */}
        <CountdownSection showToast={showToast} />

        {/* 10. Festive Celebration Gallery & Lightbox */}
        <GallerySection showToast={showToast} />

        {/* 11. Contact & Greetings */}
        <ContactSection showToast={showToast} />
      </main>

      {/* Traditional Indian Festive Footer */}
      <Footer />

      {/* Floating Indian Classical & Festive Music Player */}
      <MusicPlayer />

      {/* Virtual 5-Step Rakhi Tying Ceremony Modal */}
      <VirtualRakhiModal
        isOpen={isCeremonyOpen}
        onClose={() => setIsCeremonyOpen(false)}
        showToast={showToast}
      />

      {/* Direct Festive Sibling Selfie Modal */}
      <FestiveSelfieModal
        isOpen={isSelfieOpen}
        onClose={() => setIsSelfieOpen(false)}
        showToast={showToast}
      />

      {/* Toast Notification System */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}

export default App;
