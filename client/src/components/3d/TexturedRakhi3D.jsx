import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { loadTransparentRakhiTexture } from '../../utils/textureLoader';

export const TexturedRakhi3D = ({
  scale = 1.0,
  rotationSpeed = 0.25
}) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    loadTransparentRakhiTexture().then((tex) => {
      setTexture(tex);
    });
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle 3D floating and smooth mouse parallax tilt
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.1 + (mouse.x * 0.18);
      groupRef.current.rotation.x = Math.cos(t * 0.5) * 0.04 - (mouse.y * 0.14);
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.02;
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* High-Resolution Transparent 3D Rakhi Mesh in Perfect 1.5:1 Aspect Ratio */}
      {texture && (
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <planeGeometry args={[12.0, 8.0, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            transparent={true}
            alphaTest={0.01}
            roughness={0.25}
            metalness={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Central Radiance Point Light */}
      <pointLight position={[0, 0, 0.8]} color="#FEF08A" intensity={1.8} distance={4.5} />
    </group>
  );
};

export default TexturedRakhi3D;
