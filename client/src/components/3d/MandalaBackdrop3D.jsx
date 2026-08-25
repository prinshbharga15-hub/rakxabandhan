import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MandalaBackdrop3D = ({ radius = 2.2, color = '#F59E0B' }) => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const auraRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.1;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.15;
    }
    if (auraRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      auraRef.current.scale.set(pulse, pulse, 1);
    }
  });

  // 16 Sacred Lotus Petals in circular arrangement
  const petals = useMemo(() => {
    const arr = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * (radius * 0.8),
        y: Math.sin(angle) * (radius * 0.8)
      });
    }
    return arr;
  }, [radius]);

  // 32 Sacred Sun Rays
  const sunRays = useMemo(() => {
    const arr = [];
    const count = 32;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * (radius * 1.05),
        y: Math.sin(angle) * (radius * 1.05)
      });
    }
    return arr;
  }, [radius]);

  return (
    <group position={[0, 0, -0.2]}>
      {/* 1. Soft Radiant Golden Sun Aura Disc */}
      <mesh ref={auraRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[radius * 1.35, 48]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Crimson Rosette Halo */}
      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[radius * 0.95, 36]} />
        <meshBasicMaterial
          color="#DC2626"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Outer Rotating Sacred Mandala Ring */}
      <group ref={outerRingRef}>
        {/* Outer Filigree Beaded Ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.035, 16, 64]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[radius * 0.92, 0.025, 16, 64]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 32 Sunburst Rays */}
        {sunRays.map((r, i) => (
          <mesh key={i} position={[r.x, r.y, 0]} rotation={[0, 0, r.angle]}>
            <boxGeometry args={[0.03, 0.28, 0.02]} />
            <meshStandardMaterial color="#FEF08A" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* 3. Inner Counter-Rotating Lotus Petals Ring */}
      <group ref={innerRingRef}>
        {petals.map((p, i) => (
          <group key={i} position={[p.x, p.y, 0.01]} rotation={[0, 0, p.angle]}>
            <mesh scale={[0.18, 0.42, 0.04]}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Tiny gold pearl at tip */}
            <mesh position={[0, 0.42, 0.01]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial color="#FFFDF9" metalness={0.4} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Middle Golden Ring */}
        <mesh position={[0, 0, 0.02]}>
          <torusGeometry args={[radius * 0.65, 0.03, 14, 48]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
};

export default MandalaBackdrop3D;
