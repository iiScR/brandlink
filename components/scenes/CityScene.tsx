'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createEmissiveMaterial } from '../../lib/threeMaterials';

function Building({ position, height, color, isLit, delay, activationProgress }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const litIntensity = Math.min(1, Math.max(0, (activationProgress - delay * 0.1) * 3));

  useFrame((state) => {
    if (!meshRef.current || !lightRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.15 + 0.85;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isLit ? 1.5 * litIntensity * pulse : 0, 0.05);
    lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, isLit ? 1.2 * litIntensity * pulse : 0, 0.05);
  });

  return (
    <group position={[position[0], position[1] + height / 2, position[2]]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshStandardMaterial
          color={isLit && litIntensity > 0.1 ? color : '#0c0c18'}
          emissive={isLit ? color : '#000000'}
          emissiveIntensity={isLit ? 0.5 : 0}
          roughness={0.3}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, height, 0.5)]} />
        <lineBasicMaterial color={isLit && litIntensity > 0.1 ? color : '#1a1a2e'} transparent opacity={isLit ? 0.5 * litIntensity : 0.15} />
      </lineSegments>
      <pointLight ref={lightRef} position={[0, height / 2 + 0.3, 0]} color={color} intensity={0} distance={4} />
    </group>
  );
}

function CityContent({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.06;
  });

  const buildings = useMemo(() => {
    const items = [];
    const litColors = ['#7C3AED', '#2563EB', '#06B6D4'];
    for (let i = 0; i < 45; i++) {
      const angle = (i / 45) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const radius = 2.5 + Math.random() * 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const height = 1.2 + Math.random() * 3.5;
      const isLit = i < 10;
      items.push({
        position: [x, 0, z],
        height,
        color: litColors[i % 3],
        isLit,
        delay: i * 0.2,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 10, 5]} intensity={0.3} color="#a78bfa" />
      <pointLight position={[0, 10, 0]} intensity={4} color="#7C3AED" distance={18} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#080810" roughness={0.95} metalness={0.3} />
      </mesh>

      {buildings.map((b, i) => (
        <Building key={i} {...b} activationProgress={progress} />
      ))}

      <Building position={[0, 0, 0]} height={8} color="#7C3AED" isLit delay={0} activationProgress={progress} />
      <Building position={[0.8, 0, 0.5]} height={6} color="#2563EB" isLit delay={0.5} activationProgress={progress} />
      <Building position={[-0.6, 0, 0.8]} height={4.5} color="#06B6D4" isLit delay={1} activationProgress={progress} />

      <fog attach="fog" args={['#050505', 7, 28]} />
    </group>
  );
}

export function CityCanvas({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  return (
    <Canvas camera={{ position: [8, 5, 10], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <CityContent progress={progressRef.current.value} />
    </Canvas>
  );
}
