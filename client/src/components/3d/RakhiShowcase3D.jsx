import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Float, Sparkles } from '@react-three/drei';
import TexturedRakhi3D from './TexturedRakhi3D';
import HeroFallback2D from './HeroFallback2D';
import { Sparkles as SparkleIcon, RotateCcw, ZoomIn, Info } from 'lucide-react';

const hotspots = [
  {
    id: 'thread',
    title: 'Sacred Mauli Silk Cord',
    hindi: 'पवित्र मौली सूत्र',
    position: [-3.6, -0.6, 0.2],
    desc: 'Woven with raw cotton & silk strands in auspicious Kumkum Red and Saffron Gold. Represents the unbreakable vow of protection, devotion, and mutual well-being.'
  },
  {
    id: 'dial',
    title: 'Royal Kundan & Ruby Medallion',
    hindi: 'कुंदन एवं माणिक चक्र',
    position: [0.2, 0.05, 0.3],
    desc: 'Artisan filigree centerpiece featuring 16 teardrop red rubies, a diamond crystal bezel halo, and a glossy royal ruby cabochon radiating divine solar grace.'
  },
  {
    id: 'beads',
    title: 'Gold Filigree & Red Lac Pearls',
    hindi: 'स्वर्ण नक्काशी एवं लाख मोती',
    position: [2.2, 0.35, 0.2],
    desc: 'Alternating golden carved beads, ruby pearls, and diamond rondelles strung along the cords to ward off negative energies and bring auspicious prosperity.'
  },
  {
    id: 'tassel',
    title: 'Kalawa Tassels & Freshwater Pearls',
    hindi: 'वैदिक कलावा छोर एवं मुक्ता',
    position: [4.2, -1.3, 0.2],
    desc: 'Traditional silk tassel ends crowned with gold caps, freshwater white pearls, and sanctified Vedic knots.'
  }
];

const InteractiveHotspot = ({ spot, activeSpot, setActiveSpot }) => {
  const isSelected = activeSpot?.id === spot.id;

  return (
    <Html position={spot.position} center distanceFactor={9} zIndexRange={[100, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActiveSpot(isSelected ? null : spot);
        }}
        className={`group relative flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'scale-125' : 'hover:scale-110'
        }`}
      >
        <span className="relative flex h-8 w-8 items-center justify-center">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isSelected ? 'bg-festive-crimson' : 'bg-festive-gold'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-xs font-bold text-white shadow-lg ${
              isSelected ? 'bg-festive-crimson ring-2 ring-white' : 'bg-festive-gold ring-2 ring-white/90'
            }`}
          >
            ✦
          </span>
        </span>
      </button>
    </Html>
  );
};

const ShowcaseScene = ({ activeSpot, setActiveSpot, themePreset }) => {
  const controlsRef = useRef();

  return (
    <>
      <ambientLight intensity={themePreset === 'night' ? 0.6 : 1.3} />
      <directionalLight
        position={[3, 6, 5]}
        intensity={themePreset === 'night' ? 1.0 : 1.9}
        color={themePreset === 'night' ? '#FBBF24' : '#FFFDF9'}
      />
      <directionalLight position={[-3, -3, 3]} intensity={0.8} color="#FEF08A" />
      <pointLight position={[-4, 2, 3]} intensity={1.4} color="#DC2626" />
      <pointLight position={[4, -2, 3]} intensity={1.4} color="#F59E0B" />

      <Sparkles count={60} scale={[15, 11, 6]} size={3.6} speed={0.4} color="#F59E0B" />

      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.25}>
        <group position={[0, 0, 0]}>
          <TexturedRakhi3D scale={1.0} />
        </group>
      </Float>

      {/* Interactive 3D Hotspot Pins */}
      {hotspots.map((spot) => (
        <InteractiveHotspot
          key={spot.id}
          spot={spot}
          activeSpot={activeSpot}
          setActiveSpot={setActiveSpot}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        minDistance={4.0}
        maxDistance={12.0}
        enablePan={false}
        rotateSpeed={0.6}
        autoRotate={!activeSpot}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

export const RakhiShowcase3D = () => {
  const [activeSpot, setActiveSpot] = useState(hotspots[1]);
  const [themePreset, setThemePreset] = useState('gold');

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-amber-300/60 shadow-2xl p-4 md:p-8">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-200/50 z-20 relative">
        <div>
          <span className="text-xs font-bold tracking-widest text-festive-saffron uppercase flex items-center gap-1.5">
            <SparkleIcon className="w-3.5 h-3.5" /> 360° Interactive 3D Inspection
          </span>
          <h3 className="text-lg md:text-xl font-heading font-bold text-festive-dark">
            Anatomy of the Royal Rakhi
          </h3>
        </div>

        {/* Action Tips */}
        <div className="flex items-center gap-2 text-xs text-stone-600 bg-amber-50/80 px-3 py-1.5 rounded-full border border-amber-200">
          <RotateCcw className="w-3.5 h-3.5 text-festive-gold" />
          <span>Drag to Rotate 360°</span>
          <span className="text-amber-300">•</span>
          <ZoomIn className="w-3.5 h-3.5 text-festive-gold" />
          <span>Pinch/Scroll to Zoom</span>
        </div>
      </div>

      {/* Main 3D Canvas Area (100% full height in view) */}
      <div className="relative w-full h-[460px] md:h-[550px] my-2 bg-gradient-to-b from-amber-50/40 via-festive-cream to-amber-100/40 rounded-2xl overflow-hidden flex items-center justify-center">
        <Suspense fallback={<HeroFallback2D />}>
          <Canvas
            camera={{ position: [0, 0, 9.0], fov: 52 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            className="cursor-grab active:cursor-grabbing"
          >
            <ShowcaseScene
              activeSpot={activeSpot}
              setActiveSpot={setActiveSpot}
              themePreset={themePreset}
            />
          </Canvas>
        </Suspense>

        {/* Floating Active Lore Details Card */}
        {activeSpot && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-amber-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 z-30">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="text-[11px] font-hindi font-semibold text-festive-saffron">
                  {activeSpot.hindi}
                </span>
                <h4 className="text-base font-bold text-festive-crimson">
                  {activeSpot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveSpot(null)}
                className="text-xs text-stone-400 hover:text-stone-700 p-1"
                aria-label="Close card"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {activeSpot.desc}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Hotspots Quick Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
        {hotspots.map((spot) => {
          const isActive = activeSpot?.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setActiveSpot(spot)}
              className={`p-3 rounded-xl text-left text-xs transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-red-50 to-amber-50 border-festive-crimson/80 shadow-md ring-1 ring-festive-crimson/50'
                  : 'bg-white/70 hover:bg-amber-50/70 border-amber-200/60'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-festive-dark truncate">
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-festive-crimson' : 'bg-festive-gold'}`} />
                {spot.title}
              </div>
              <p className="text-[10px] text-stone-500 truncate mt-0.5">{spot.hindi}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RakhiShowcase3D;
