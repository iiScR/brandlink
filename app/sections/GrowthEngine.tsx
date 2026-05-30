'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { AnimatedCounter } from '../components/AnimatedCounter';

function EnergyTube({ curve, color }: any) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const tubeGeometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3(curve);
    return new THREE.TubeGeometry(path, 64, 0.03, 8, false);
  }, [curve]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.emissiveIntensity =
      0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function CoreOrb() {
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
        emissiveIntensity={1.5}
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
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function EngineContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={4} color="#7C3AED" distance={12} />
      <pointLight position={[3, 2, 3]} intensity={1.5} color="#06B6D4" distance={8} />
      <pointLight position={[-3, -2, 3]} intensity={1.5} color="#2563EB" distance={8} />

      <CoreOrb />

      <FloatingRing radius={1.2} color="#7C3AED" speed={0.5} rotationAxis={['x', 'y']} />
      <FloatingRing radius={1.6} color="#2563EB" speed={0.3} rotationAxis={['y', 'z']} />
      <FloatingRing radius={2.0} color="#06B6D4" speed={0.2} rotationAxis={['x', 'z']} />

      <EnergyTube
        curve={[
          new THREE.Vector3(-2, 1, 0),
          new THREE.Vector3(-1, 0.5, 0.5),
          new THREE.Vector3(0, 0, 0),
        ]}
        color="#7C3AED"
      />
      <EnergyTube
        curve={[
          new THREE.Vector3(2, -1, 0),
          new THREE.Vector3(1, -0.5, -0.5),
          new THREE.Vector3(0, 0, 0),
        ]}
        color="#06B6D4"
      />
      <EnergyTube
        curve={[
          new THREE.Vector3(0, 2, -1),
          new THREE.Vector3(0, 1, -0.5),
          new THREE.Vector3(0, 0, 0),
        ]}
        color="#2563EB"
      />

      <fog attach="fog" args={['#050505', 4, 15]} />
    </>
  );
}

const metrics = [
  { label: 'Leads Generated', value: 1247, suffix: '+', color: 'purple' as const },
  { label: 'Bookings Scheduled', value: 856, suffix: '+', color: 'blue' as const },
  { label: 'Calls Received', value: 2341, suffix: '+', color: 'cyan' as const },
  { label: 'Revenue Boost', value: 340, prefix: '$', suffix: 'K+', color: 'purple' as const },
];

export function GrowthEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  return (
    <section ref={sectionRef} id="growth" className="relative min-h-screen w-full py-32 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
          <EngineContent />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-[#06B6D4] mb-4 block">
            The Engine
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading">
            Your <span className="text-gradient">Growth Engine</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We don&apos;t just build pretty pages. We architect conversion machines 
            that turn traffic into measurable business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <GlassCard glowColor={metric.color} className="p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 font-heading text-gradient">
                  <AnimatedCounter
                    end={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-sm text-white/50">{metric.label}</div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
