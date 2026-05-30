'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

function Emblem() {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !orbRef.current) return;
    groupRef.current.rotation.y += 0.003;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    orbRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.6} transparent opacity={0.3} />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={6} color="#7C3AED" distance={15} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#06B6D4" distance={10} />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color="#2563EB" distance={10} />
    </group>
  );
}

function LightParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 150;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7C3AED" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function VaultScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Emblem />
      <LightParticles />
      <fog attach="fog" args={['#050505', 3, 12]} />
    </>
  );
}

export function CTAVault() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="cta" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
          <VaultScene />
        </Canvas>
      </div>

      {/* Vignette for text readability */}
      <div className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.8) 60%, rgba(5,5,5,0.95) 100%)'
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div
          className={`max-w-3xl transition-all duration-1200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-heading">
            Your Competitors Already Have{' '}
            <span className="text-gradient">Attention</span>.{' '}
            Let&apos;s Build Something Better.
          </h2>

          <p className="text-lg md:text-xl text-white/50 mb-12 max-w-xl mx-auto">
            Don&apos;t let another month go by with a website that underperforms. 
            Let&apos;s create something that works as hard as you do.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#050505] font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Start My Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <p className="mt-6 text-sm text-white/30">
            Free 15-minute consultation. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
