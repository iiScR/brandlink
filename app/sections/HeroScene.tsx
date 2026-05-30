'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useMouse } from '../hooks/useMouse';

function FloatingPanel({ position, rotation, color, scale = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMouse();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05 + mouse.normalizedY * 0.1;
    meshRef.current.rotation.y = rotation[1] + Math.cos(state.clock.elapsedTime * 0.2) * 0.05 + mouse.normalizedX * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[2, 2.8, 0.08]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.25}
        roughness={0.05}
        metalness={0.9}
        transmission={0.4}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function FloatingCard({ position, color, delay = 0 }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMouse();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime + delay;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.4) * 0.3;
    groupRef.current.position.y = position[1] + Math.cos(t * 0.3) * 0.2;
    groupRef.current.rotation.z = (mouse.normalizedX * 0.05) + Math.sin(t * 0.2) * 0.02;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <planeGeometry args={[1.6, 0.8]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.9}
          transmission={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.8)]} />
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
      <pointsMaterial size={0.04} color="#7C3AED" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const s = 4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.03} />
    </mesh>
  );
}

function SceneContent() {
  const { camera } = useThree();
  const mouse = useMouse();

  useFrame((state) => {
    const targetX = mouse.normalizedX * 1;
    const targetY = mouse.normalizedY * 0.3 + 0.5;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-5, 3, -5]} intensity={2} color="#7C3AED" distance={15} />
      <pointLight position={[5, -3, 5]} intensity={1.5} color="#06B6D4" distance={15} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#2563EB" distance={10} />

      <FloatingPanel position={[0, 0, 0]} rotation={[0, 0.3, 0]} color="#7C3AED" scale={1.2} />
      <FloatingPanel position={[-2.5, 0.5, -1]} rotation={[0.1, -0.4, 0]} color="#2563EB" scale={0.9} />
      <FloatingPanel position={[2.5, -0.3, -0.5]} rotation={[-0.1, 0.5, 0]} color="#06B6D4" scale={1} />
      <FloatingPanel position={[0, 1.8, -2]} rotation={[0.2, 0, 0]} color="#7C3AED" scale={0.7} />

      <FloatingCard position={[-3, 1.5, 1]} color="#7C3AED" delay={0} />
      <FloatingCard position={[3.2, -1, 0.5]} color="#06B6D4" delay={1} />
      <FloatingCard position={[0, -2, 1.5]} color="#2563EB" delay={2} />

      <Particles />
      <AmbientGlow />

      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={15} blur={2.5} far={4} />
      <Environment preset="city" />
      <fog attach="fog" args={['#050505', 10, 30]} />
    </>
  );
}

export function HeroScene() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }} dpr={[1, 2]}>
          <SceneContent />
        </Canvas>
      </div>

      {/* Dark vignette for text readability */}
      <div className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 70%, rgba(5,5,5,0.95) 100%)'
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 font-heading">
            Websites That Make{' '}
            <span className="text-gradient">Small Businesses</span>{' '}
            Look Unstoppable
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 animate-fade-in-up-delay-1">
          We design high-converting landing pages that turn visitors into real customers.
        </p>

        <div className="flex flex-wrap gap-4 pointer-events-auto animate-fade-in-up-delay-2">
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-full bg-white text-[#050505] font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            View Work
          </a>
          <a
            href="#cta"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300 hover:scale-105"
          >
            Get Free Preview
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up-delay-3">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 animate-bounce">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
