'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EnergyTube({ curve, color, speed = 3 }: any) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const tubeGeometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3(curve);
    return new THREE.TubeGeometry(path, 64, 0.025, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial ref={materialRef} color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
    </mesh>
  );
}

function CoreOrb({ progress }: { progress: number }) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    orbRef.current.rotation.y += 0.005;
    orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    orbRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={1.5 + progress}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function FloatingRing({ radius, color, speed, rotationAxis }: any) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation[rotationAxis[0]] += speed * 0.3;
    ringRef.current.rotation[rotationAxis[1]] += speed * 0.2;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.5} />
    </mesh>
  );
}

function GrowthContent({ progress }: { progress: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#7C3AED" distance={12} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#06B6D4" distance={8} />
      <pointLight position={[-3, -2, 3]} intensity={2} color="#2563EB" distance={8} />

      <CoreOrb progress={progress} />

      <FloatingRing radius={1.2} color="#7C3AED" speed={0.5} rotationAxis={['x', 'y']} />
      <FloatingRing radius={1.6} color="#2563EB" speed={0.3} rotationAxis={['y', 'z']} />
      <FloatingRing radius={2.0} color="#06B6D4" speed={0.2} rotationAxis={['x', 'z']} />

      <EnergyTube curve={[new THREE.Vector3(-2, 1, 0), new THREE.Vector3(-1, 0.5, 0.5), new THREE.Vector3(0, 0, 0)]} color="#7C3AED" />
      <EnergyTube curve={[new THREE.Vector3(2, -1, 0), new THREE.Vector3(1, -0.5, -0.5), new THREE.Vector3(0, 0, 0)]} color="#06B6D4" />
      <EnergyTube curve={[new THREE.Vector3(0, 2, -1), new THREE.Vector3(0, 1, -0.5), new THREE.Vector3(0, 0, 0)]} color="#2563EB" />

      <fog attach="fog" args={['#050505', 5, 18]} />
    </>
  );
}

export function GrowthCanvas({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <GrowthContent progress={progressRef.current.value} />
    </Canvas>
  );
}
