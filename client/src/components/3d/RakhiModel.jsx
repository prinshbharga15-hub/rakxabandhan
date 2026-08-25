import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RakhiModel = ({
  threadColor = '#DC2626',
  secondaryColor = '#F59E0B',
  centerMotif = 'floral_mandala',
  gemstoneColor = '#DC2626',
  beadType = 'gold_pearl',
  beadColor = '#FBBF24',
  scale = 1.8,
  rotationSpeed = 0.35,
  isInteractive = false
}) => {
  const groupRef = useRef();
  const dialRef = useRef();
  const gemRef = useRef();

  // Create curved thread paths matching traditional Rakhi curves
  const { leftCurve, rightCurve } = useMemo(() => {
    const leftPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.6, -0.05, 0.02),
      new THREE.Vector3(-1.3, -0.08, -0.02),
      new THREE.Vector3(-2.1, -0.15, 0.03),
      new THREE.Vector3(-2.9, -0.32, -0.02),
      new THREE.Vector3(-3.5, -0.55, 0.01)
    ];
    const rightPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.6, -0.05, -0.02),
      new THREE.Vector3(1.3, -0.08, 0.02),
      new THREE.Vector3(2.1, -0.15, -0.03),
      new THREE.Vector3(2.9, -0.32, 0.02),
      new THREE.Vector3(3.5, -0.55, -0.01)
    ];

    return {
      leftCurve: new THREE.CatmullRomCurve3(leftPoints),
      rightCurve: new THREE.CatmullRomCurve3(rightPoints)
    };
  }, []);

  // Frame animation for smooth auto rotation
  useFrame((state, delta) => {
    if (groupRef.current && rotationSpeed > 0) {
      groupRef.current.rotation.y += delta * 0.35 * rotationSpeed;
    }
  });

  // 16 Teardrop / Petal ruby gems for the sunburst ring
  const sunburstPetals = useMemo(() => {
    const arr = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * 0.68,
        y: Math.sin(angle) * 0.68
      });
    }
    return arr;
  }, []);

  // 24 Tiny Diamond Crystals for the inner bezel halo
  const diamondHalo = useMemo(() => {
    const arr = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr.push({
        angle,
        x: Math.cos(angle) * 0.44,
        y: Math.sin(angle) * 0.44
      });
    }
    return arr;
  }, []);

  // Elaborate bead pairs on both sides matching user's image
  const beadSets = [
    { x: -0.65, type: 'gold_filigree', radius: 0.14 },
    { x: -0.95, type: 'ruby_pearl', radius: 0.16 },
    { x: -1.25, type: 'diamond_spacer', radius: 0.08 },
    { x: -1.45, type: 'gold_ball', radius: 0.15 },
    { x: -1.75, type: 'ruby_small', radius: 0.11 },
    { x: -2.05, type: 'gold_small', radius: 0.1 },

    { x: 0.65, type: 'gold_filigree', radius: 0.14 },
    { x: 0.95, type: 'ruby_pearl', radius: 0.16 },
    { x: 1.25, type: 'diamond_spacer', radius: 0.08 },
    { x: 1.45, type: 'gold_ball', radius: 0.15 },
    { x: 1.75, type: 'ruby_small', radius: 0.11 },
    { x: 2.05, type: 'gold_small', radius: 0.1 }
  ];

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      
      {/* 1. THICK BRAIDED SILK CORDS (Left & Right) */}
      {/* Primary Red Cords */}
      <mesh>
        <tubeGeometry args={[leftCurve, 64, 0.05, 12, false]} />
        <meshStandardMaterial
          color={threadColor}
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[rightCurve, 64, 0.05, 12, false]} />
        <meshStandardMaterial
          color={threadColor}
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>

      {/* Intertwined Gold Zari Strands */}
      <mesh position={[0, 0.012, 0.01]}>
        <tubeGeometry args={[leftCurve, 64, 0.025, 8, false]} />
        <meshStandardMaterial
          color={secondaryColor}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, 0.012, 0.01]}>
        <tubeGeometry args={[rightCurve, 64, 0.025, 8, false]} />
        <meshStandardMaterial
          color={secondaryColor}
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* 2. STRUNG BEADS & SPACERS */}
      {beadSets.map((b, idx) => {
        const yPos = -Math.abs(b.x) * 0.12;

        if (b.type === 'gold_filigree') {
          return (
            <group key={idx} position={[b.x, yPos, 0]}>
              <mesh>
                <sphereGeometry args={[b.radius, 20, 20]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.95} roughness={0.2} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[b.radius * 0.85, 0.02, 10, 16]} />
                <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
          );
        }

        if (b.type === 'ruby_pearl') {
          return (
            <group key={idx} position={[b.x, yPos, 0]}>
              <mesh>
                <sphereGeometry args={[b.radius, 24, 24]} />
                <meshPhysicalMaterial
                  color={gemstoneColor}
                  roughness={0.1}
                  metalness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </mesh>
              {/* Gold end caps */}
              <mesh position={[-0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.08, 0.02, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
              </mesh>
              <mesh position={[0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.08, 0.02, 8, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
              </mesh>
            </group>
          );
        }

        if (b.type === 'diamond_spacer') {
          return (
            <group key={idx} position={[b.x, yPos, 0]}>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
                <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.13, 0.025, 8, 16]} />
                <meshPhysicalMaterial color="#FFFFFF" roughness={0.1} metalness={0.8} />
              </mesh>
            </group>
          );
        }

        return (
          <group key={idx} position={[b.x, yPos, 0]}>
            <mesh>
              <sphereGeometry args={[b.radius, 20, 20]} />
              <meshStandardMaterial
                color={b.type.includes('ruby') ? gemstoneColor : '#FBBF24'}
                metalness={b.type.includes('ruby') ? 0.3 : 0.95}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* 3. CENTRAL KUNDAN GOLD MEDALLION (Large & Prominent) */}
      <group ref={dialRef} position={[0, 0, 0.06]}>
        
        {/* Main Base Gold Plate */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.08, 48]} />
          <meshStandardMaterial color="#D97706" metalness={0.95} roughness={0.2} />
        </mesh>

        {/* Outer Rope Twist Ring Border */}
        <mesh position={[0, 0, 0.045]}>
          <torusGeometry args={[1.0, 0.048, 16, 48]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <torusGeometry args={[0.9, 0.035, 16, 48]} />
          <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* 16 Teardrop Ruby Stones with Gold Bezels */}
        {sunburstPetals.map((p, i) => (
          <group key={i} position={[p.x, p.y, 0.05]} rotation={[0, 0, p.angle]}>
            {/* Gold Bezel Cup */}
            <mesh scale={[0.16, 0.28, 0.08]}>
              <sphereGeometry args={[1, 14, 14]} />
              <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Inner Red Ruby Gemstone */}
            <mesh scale={[0.12, 0.22, 0.09]} position={[0, 0, 0.02]}>
              <sphereGeometry args={[1, 14, 14]} />
              <meshPhysicalMaterial
                color={gemstoneColor}
                roughness={0.1}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive={gemstoneColor}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Inner Gold Rim separating Rubies & Diamond Halo */}
        <mesh position={[0, 0, 0.06]}>
          <torusGeometry args={[0.52, 0.03, 14, 36]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* 24 Sparkling Diamond / Crystal Studs Halo */}
        {diamondHalo.map((d, i) => (
          <mesh key={i} position={[d.x, d.y, 0.07]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.05}
              metalness={0.9}
              transmission={0.8}
              thickness={0.5}
              clearcoat={1}
            />
          </mesh>
        ))}

        {/* Central Bezel Gold Wall */}
        <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.06, 32]} />
          <meshStandardMaterial color="#D97706" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* 4. MAIN CENTRAL RUBY CABOCHON (Glossy Red Dome Center) */}
        <group ref={gemRef} position={[0, 0, 0.09]}>
          <mesh scale={[0.34, 0.34, 0.2]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color={gemstoneColor}
              roughness={0.08}
              metalness={0.15}
              transmission={0.7}
              thickness={0.8}
              clearcoat={1}
              clearcoatRoughness={0.08}
              emissive={gemstoneColor}
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Inner Light Flare Core */}
          <pointLight color={gemstoneColor} intensity={0.8} distance={1.2} />
        </group>
      </group>

      {/* 5. LUXURIOUS TASSELS & WHITE PEARLS (Left & Right Ends) */}
      {/* Left Tassel Cluster */}
      <group position={[-3.5, -0.55, 0]} rotation={[0, 0, Math.PI / 3.5]}>
        {/* Golden Tassel Cap */}
        <mesh>
          <cylinderGeometry args={[0.12, 0.08, 0.18, 16]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* White Freshwater Pearl */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshPhysicalMaterial color="#FFFDF9" roughness={0.15} metalness={0.1} clearcoat={1} />
        </mesh>
        {/* Red Silk Thread Tassel Strands */}
        <mesh position={[0, -0.32, 0]}>
          <coneGeometry args={[0.22, 0.6, 16]} />
          <meshStandardMaterial color={threadColor} roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Dangling Gold Beads */}
        <mesh position={[-0.1, -0.65, 0.05]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} />
        </mesh>
        <mesh position={[0.1, -0.65, -0.05]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} />
        </mesh>
      </group>

      {/* Right Tassel Cluster */}
      <group position={[3.5, -0.55, 0]} rotation={[0, 0, -Math.PI / 3.5]}>
        {/* Golden Tassel Cap */}
        <mesh>
          <cylinderGeometry args={[0.12, 0.08, 0.18, 16]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* White Freshwater Pearl */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshPhysicalMaterial color="#FFFDF9" roughness={0.15} metalness={0.1} clearcoat={1} />
        </mesh>
        {/* Red Silk Thread Tassel Strands */}
        <mesh position={[0, -0.32, 0]}>
          <coneGeometry args={[0.22, 0.6, 16]} />
          <meshStandardMaterial color={threadColor} roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Dangling Gold Beads */}
        <mesh position={[-0.1, -0.65, 0.05]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} />
        </mesh>
        <mesh position={[0.1, -0.65, -0.05]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} />
        </mesh>
      </group>
    </group>
  );
};

export default RakhiModel;
