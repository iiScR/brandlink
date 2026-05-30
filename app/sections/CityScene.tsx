'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

function Building({ position, height, color, isLit, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const topGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!matRef.current || !topGlowRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.15 + 0.85;
    const targetIntensity = isLit ? 1.2 * pulse : 0;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetIntensity,
      0.05
    );
    topGlowRef.current.intensity = THREE.MathUtils.lerp(
      topGlowRef.current.intensity,
      isLit ? 0.8 * pulse : 0,
      0.05
    );
  });

  return (
    <group position={[position[0], position[1] + height / 2, position[2]]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshStandardMaterial
          ref={matRef}
          color={isLit ? color : '#0f0f1a'}
          emissive={isLit ? color : '#000000'}
          emissiveIntensity={isLit ? 0.5 : 0}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Window grid lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, height, 0.5)]} />
        <lineBasicMaterial color={isLit ? color : '#1a1a2e'} transparent opacity={isLit ? 0.6 : 0.2} />
      </lineSegments>
      {/* Top glow light */}
      <pointLight
        ref={topGlowRef}
        position={[0, height / 2 + 0.2, 0]}
        color={color}
        intensity={0}
        distance={3}
      />
    </group>
  );
}

function GroundGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#080810" roughness={0.9} metalness={0.3} />
    </mesh>
  );
}

function CityContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  const buildings = useMemo(() => {
    const items = [];
    const litColors = ['#7C3AED', '#2563EB', '#06B6D4'];
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
      const radius = 2 + Math.random() * 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const height = 1 + Math.random() * 4;
      const isLit = i < 8;
      const color = litColors[i % 3];
      items.push({
        position: [x, 0, z],
        height,
        color,
        isLit,
        delay: i * 0.3,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#a78bfa" />
      <pointLight position={[0, 8, 0]} intensity={3} color="#7C3AED" distance={15} />
      <pointLight position={[-4, 3, 4]} intensity={0.6} color="#06B6D4" distance={10} />

      <GroundGrid />

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}

      {/* Central lit towers */}
      <Building position={[0, 0, 0]} height={7} color="#7C3AED" isLit delay={0} />
      <Building position={[0.7, 0, 0.4]} height={5.5} color="#2563EB" isLit delay={0.5} />
      <Building position={[-0.5, 0, 0.7]} height={4} color="#06B6D4" isLit delay={1} />

      <fog attach="fog" args={['#050505', 6, 25]} />
    </group>
  );
}

export function CityScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="city" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [7, 4, 9], fov: 55 }} dpr={[1, 2]}>
          <CityContent />
        </Canvas>
      </div>

      {/* Text readability overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.2) 100%)'
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center px-6 md:px-16">
        <div
          className={`max-w-xl transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#7C3AED] mb-4 block">
            Digital Presence
          </span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-heading">
            Every Business Deserves{' '}
            <span className="text-gradient">To Be Seen</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            In a city of competitors, most businesses stay in the dark. 
            BrandLink turns the spotlight on you — lighting up your digital 
            presence so customers find you first.
          </p>
        </div>
      </div>
    </section>
  );
}
