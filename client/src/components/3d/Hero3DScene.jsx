import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TexturedRakhi3D from './TexturedRakhi3D';
import DiyaModel from './DiyaModel';
import HeroFallback2D from './HeroFallback2D';

// Floating Marigold blossom in 3D
const FloatingFlower = ({ position = [0, 0, 0], scale = 0.35, color = '#F59E0B' }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={[scale, scale, scale]}>
      {/* Central Flower Core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#B45309" roughness={0.8} />
      </mesh>
      {/* Petals Ring */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]} position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.7, 0.08]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Scene composition
const SceneContent = () => {
  return (
    <>
      {/* Dynamic Festive Lighting */}
      <ambientLight intensity={1.35} />
      <directionalLight position={[2, 6, 6]} intensity={2.0} color="#FFFDF9" />
      <directionalLight position={[-2, -4, 4]} intensity={0.95} color="#FEF08A" />
      <pointLight position={[-4, 2, 3]} intensity={1.6} color="#F59E0B" />
      <pointLight position={[4, -1, 3]} intensity={1.6} color="#DC2626" />
      <spotLight position={[0, 6, 6]} intensity={2.4} angle={0.85} penumbra={0.6} color="#FFFBEB" />

      {/* Floating Gold & Crimson Sparkles */}
      <Sparkles
        count={75}
        scale={[15, 11, 6]}
        size={3.8}
        speed={0.4}
        color="#F59E0B"
        opacity={0.85}
      />
      <Sparkles
        count={45}
        scale={[13, 9, 5]}
        size={3.2}
        speed={0.3}
        color="#DC2626"
        opacity={0.7}
      />

      {/* Main 3D Floating Rakhi (Naturally Big, perfectly proportioned & centered) */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.25}>
        <group position={[0, 0, 0]}>
          <TexturedRakhi3D scale={1.0} />
        </group>
      </Float>

      {/* Floating 3D Animated Terracotta Diyas */}
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        <DiyaModel position={[-5.8, -3.2, 0.5]} scale={1.05} lightIntensity={3.4} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.4}>
        <DiyaModel position={[5.8, -3.0, 0.3]} scale={1.0} lightIntensity={3.2} />
      </Float>

      {/* Floating Festive Marigold Petals/Blossoms */}
      <Float speed={1.2} floatIntensity={0.7}>
        <FloatingFlower position={[-5.2, 3.2, -0.8]} scale={0.5} color="#F59E0B" />
      </Float>
      <Float speed={1.5} floatIntensity={0.6}>
        <FloatingFlower position={[5.4, 3.0, -0.4]} scale={0.45} color="#EA580C" />
      </Float>
      <Float speed={1.9} floatIntensity={0.8}>
        <FloatingFlower position={[-3.2, -3.4, -0.9]} scale={0.4} color="#FBBF24" />
      </Float>

      {/* OrbitControls with smooth damping */}
      <OrbitControls
        enableZoom={true}
        minDistance={3.5}
        maxDistance={11.0}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        rotateSpeed={0.6}
      />
    </>
  );
};

export const Hero3DScene = () => {
  return (
    <div className="w-full h-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px] relative webgl-canvas-container flex items-center justify-center">
      <Suspense fallback={<HeroFallback2D />}>
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="cursor-grab active:cursor-grabbing"
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3DScene;
