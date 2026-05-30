'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Emblem() {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !orbRef.current) return;
    groupRef.current.rotation.y += 0.002;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    orbRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2.5} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.012, 16, 100]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.2} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <torusGeometry args={[1.4, 0.008, 16, 100]} />
        <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.9} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
        <torusGeometry args={[1.7, 0.006, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.7} transparent opacity={0.25} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={8} color="#7C3AED" distance={15} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#06B6D4" distance={10} />
      <pointLight position={[-3, -3, 3]} intensity={2} color="#2563EB" distance={10} />
    </group>
  );
}

function LightParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#a78bfa" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function VaultContent() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Emblem />
      <LightParticles />
      <fog attach="fog" args={['#050505', 4, 14]} />
    </>
  );
}

export function CTACanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <VaultContent />
    </Canvas>
  );
}
