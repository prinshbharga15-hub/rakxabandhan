import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const DiyaModel = ({ position = [0, 0, 0], scale = 0.6, lightIntensity = 2 }) => {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flameRef.current) {
      // Natural flame flicker animation
      flameRef.current.scale.y = 1 + Math.sin(t * 12) * 0.15 + Math.cos(t * 18) * 0.08;
      flameRef.current.scale.x = 1 + Math.cos(t * 14) * 0.1;
      flameRef.current.rotation.z = Math.sin(t * 8) * 0.08;
    }
    if (lightRef.current) {
      lightRef.current.intensity = lightIntensity + Math.sin(t * 15) * 0.4;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Terracotta Clay Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.25, 0.28, 24]} />
        <meshStandardMaterial
          color="#B45309"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Rim Beading */}
      <mesh position={[0, 0.14, 0]}>
        <torusGeometry args={[0.5, 0.05, 12, 24]} />
        <meshStandardMaterial color="#D97706" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Oil Pool */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.02, 20]} />
        <meshStandardMaterial
          color="#FEF08A"
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Cotton Baati / Wick */}
      <mesh position={[0.25, 0.15, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#1F2937" roughness={0.9} />
      </mesh>

      {/* Flickering Flame Mesh */}
      <group ref={flameRef} position={[0.3, 0.28, 0]}>
        {/* Outer Flame (Orange) */}
        <mesh>
          <coneGeometry args={[0.12, 0.35, 16]} />
          <meshBasicMaterial color="#EA580C" />
        </mesh>
        {/* Inner Flame (Bright Yellow) */}
        <mesh position={[0, -0.04, 0]}>
          <coneGeometry args={[0.07, 0.24, 16]} />
          <meshBasicMaterial color="#FEF08A" />
        </mesh>
        {/* Flame Core (White-Blue) */}
        <mesh position={[0, -0.09, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Dynamic Warm Point Light */}
        <pointLight
          ref={lightRef}
          color="#F59E0B"
          intensity={lightIntensity}
          distance={4}
          decay={2}
        />
      </group>
    </group>
  );
};

export default DiyaModel;
