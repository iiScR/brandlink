'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMouse } from '../../app/hooks/useMouse';
import { createGlassMaterial, createEmissiveMaterial } from '../../lib/threeMaterials';

function AssemblyStructure({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMouse();

  const panels = useMemo(() => [
    { pos: [-3, 2, -2], rot: [0.5, 0.8, 0], target: [0, 0, 0], targetRot: [0, 0.3, 0], scale: 1.2, color: '#7C3AED' },
    { pos: [4, -1, -3], rot: [-0.3, -0.6, 0.2], target: [-2.5, 0.5, -1], targetRot: [0.1, -0.4, 0], scale: 0.9, color: '#2563EB' },
    { pos: [-2, -3, 1], rot: [0.2, 0.5, -0.1], target: [2.5, -0.3, -0.5], targetRot: [-0.1, 0.5, 0], scale: 1, color: '#06B6D4' },
    { pos: [3, 3, -4], rot: [-0.4, 0.2, 0.3], target: [0, 1.8, -2], targetRot: [0.2, 0, 0], scale: 0.7, color: '#7C3AED' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05 + mouse.normalizedX * 0.05;
    groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.02 + mouse.normalizedY * 0.03;
  });

  return (
    <group ref={groupRef}>
      {panels.map((p, i) => {
        const eased = Math.min(1, progress * 1.5);
        const currentPos = [
          THREE.MathUtils.lerp(p.pos[0], p.target[0], eased),
          THREE.MathUtils.lerp(p.pos[1], p.target[1], eased),
          THREE.MathUtils.lerp(p.pos[2], p.target[2], eased),
        ];
        const currentRot = [
          THREE.MathUtils.lerp(p.rot[0], p.targetRot[0], eased),
          THREE.MathUtils.lerp(p.rot[1], p.targetRot[1], eased),
          THREE.MathUtils.lerp(p.rot[2], p.targetRot[2], eased),
        ];

        return (
          <Float key={i} speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <mesh position={currentPos as [number, number, number]} rotation={currentRot as [number, number, number]} scale={p.scale}>
              <boxGeometry args={[2, 2.8, 0.08]} />
              <primitive object={createGlassMaterial(p.color, 0.2 + progress * 0.1)} attach="material" />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(2, 2.8, 0.08)]} />
              <lineBasicMaterial color={p.color} transparent opacity={0.3 + progress * 0.3} />
            </lineSegments>
          </Float>
        );
      })}
    </group>
  );
}

function FloatingMetrics({ progress }: { progress: number }) {
  const metrics = useMemo(() => [
    { pos: [-3.5, 1.5, 1], color: '#7C3AED', delay: 0 },
    { pos: [3.7, -1, 0.5], color: '#06B6D4', delay: 1 },
    { pos: [0, -2.5, 1.5], color: '#2563EB', delay: 2 },
  ], []);

  return (
    <>
      {metrics.map((m, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={m.pos as [number, number, number]}>
            <mesh>
              <planeGeometry args={[1.6, 0.8]} />
              <meshPhysicalMaterial color={m.color} transparent opacity={0.06 + progress * 0.06} roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.8)]} />
              <lineBasicMaterial color={m.color} transparent opacity={0.3 + progress * 0.3} />
            </lineSegments>
          </group>
        </Float>
      ))}
    </>
  );
}

function Particles({ count = 300 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = Math.random() * 0.01 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10;
      if (Math.abs(posArray[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const s = 5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.8;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.02} />
    </mesh>
  );
}

function CameraRig({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const { camera } = useThree();
  const mouse = useMouse();

  useFrame(() => {
    const targetZ = THREE.MathUtils.lerp(6, 3.5, progressRef.current.value);
    const targetY = THREE.MathUtils.lerp(0.5, 0, progressRef.current.value);
    const targetX = mouse.normalizedX * 0.5;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#c4b5fd" />
      <pointLight position={[-5, 3, -5]} intensity={3} color="#7C3AED" distance={20} />
      <pointLight position={[5, -3, 5]} intensity={2} color="#06B6D4" distance={15} />
      <pointLight position={[0, 0, 4]} intensity={1} color="#2563EB" distance={10} />

      <AssemblyStructure progress={progressRef.current.value} />
      <FloatingMetrics progress={progressRef.current.value} />
      <CameraRig progressRef={progressRef} />
      <Particles />
      <AmbientGlow />

      <ContactShadows position={[0, -4, 0]} opacity={0.2} scale={20} blur={3} far={6} />
      <Environment preset="city" />
      <fog attach="fog" args={['#050505', 12, 35]} />
    </>
  );
}

export function HeroCanvas({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <SceneContent progressRef={progressRef} />
    </Canvas>
  );
}
