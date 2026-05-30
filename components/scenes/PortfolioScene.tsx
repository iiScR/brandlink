'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HolographicCard({ position, project, index, hovered, onHover }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.08;

    const targetScale = hovered ? 1.15 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    const targetRotY = hovered ? 0.15 : 0;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
  });

  return (
    <group ref={groupRef} position={position} onPointerOver={(e) => { e.stopPropagation(); onHover(index); }} onPointerOut={() => onHover(null)}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2.4, 1.6]} />
        <meshPhysicalMaterial
          color={project.color}
          transparent
          opacity={0.08}
          roughness={0.05}
          metalness={0.95}
          transmission={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.4, 1.6)]} />
        <lineBasicMaterial color={project.color} transparent opacity={hovered ? 0.8 : 0.4} />
      </lineSegments>
      {/* Glow border */}
      {hovered && (
        <mesh scale={[1.02, 1.02, 1]}>
          <planeGeometry args={[2.4, 1.6]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function PortfolioContent({ progress }: { progress: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const projects = useMemo(() => [
    { title: 'Bella Bistro', category: 'Restaurant', color: '#7C3AED' },
    { title: 'Luxe Salon', category: 'Beauty Salon', color: '#06B6D4' },
    { title: 'Iron Forge Gym', category: 'Fitness', color: '#2563EB' },
    { title: 'Bean & Bloom', category: 'Café', color: '#7C3AED' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
  });

  const visibility = Math.min(1, progress * 2);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 4]} intensity={3} color="#7C3AED" distance={12} />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#06B6D4" distance={10} />
      <pointLight position={[4, -2, 3]} intensity={1.5} color="#2563EB" distance={10} />

      {projects.map((p, i) => {
        const x = (i - 1.5) * 2.8;
        const y = Math.sin(i * 0.5) * 0.3;
        const z = Math.cos(i * 0.5) * 0.5 - 1;
        return (
          <HolographicCard
            key={i}
            position={[x, y, z]}
            project={p}
            index={i}
            hovered={hovered === i}
            onHover={setHovered}
          />
        );
      })}

      <fog attach="fog" args={['#050505', 6, 20]} />
    </group>
  );
}

export function PortfolioCanvas({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <PortfolioContent progress={progressRef.current.value} />
    </Canvas>
  );
}
