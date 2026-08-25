import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Text } from '@react-three/drei';
import RakhiModel from './RakhiModel';
import HeroFallback2D from './HeroFallback2D';

const CustomizerScene = ({ config }) => {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 6, 4]} intensity={1.8} color="#FFFDF9" />
      <directionalLight position={[-3, -3, 3]} intensity={0.7} color="#FEF08A" />
      <pointLight position={[-3, 2, 2.5]} intensity={1.3} color={config.threadColor || '#DC2626'} />
      <pointLight position={[3, -2, 2.5]} intensity={1.3} color="#F59E0B" />

      <Sparkles count={45} scale={[8, 5, 4]} size={3.0} speed={0.4} color="#F59E0B" />

      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.4}>
        <group position={[0, 0, 0]}>
          <RakhiModel
            scale={1.85}
            threadColor={config.threadColor}
            secondaryColor={config.secondaryColor}
            centerMotif={config.centerMotif}
            gemstoneColor={config.gemstoneColor}
            beadType={config.beadType}
            beadColor={config.beadColor}
            rotationSpeed={0.25}
          />

          {/* Custom Inscription Text at center dial */}
          {config.customText && (
            <Text
              position={[0, -0.9, 0.2]}
              fontSize={0.28}
              color="#B45309"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#FFFDF9"
            >
              {config.customText.toUpperCase()}
            </Text>
          )}
        </group>
      </Float>

      <OrbitControls
        enableZoom={true}
        minDistance={2.2}
        maxDistance={6.0}
        enablePan={false}
        rotateSpeed={0.6}
      />
    </>
  );
};

export const Customizer3DCanvas = ({ config }) => {
  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[460px] relative webgl-canvas-container">
      <Suspense fallback={<HeroFallback2D />}>
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 46 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <CustomizerScene config={config} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Customizer3DCanvas;
