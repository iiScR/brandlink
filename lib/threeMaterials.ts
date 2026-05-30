import * as THREE from 'three';

export const GlassMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#7C3AED'),
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.6,
  thickness: 1.5,
  transparent: true,
  opacity: 0.3,
  envMapIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  side: THREE.DoubleSide,
});

export const NeonPurple = new THREE.MeshStandardMaterial({
  color: '#7C3AED',
  emissive: '#7C3AED',
  emissiveIntensity: 2,
  roughness: 0.2,
  metalness: 0.8,
  transparent: true,
  opacity: 0.9,
});

export const NeonBlue = new THREE.MeshStandardMaterial({
  color: '#2563EB',
  emissive: '#2563EB',
  emissiveIntensity: 1.5,
  roughness: 0.2,
  metalness: 0.8,
  transparent: true,
  opacity: 0.9,
});

export const NeonCyan = new THREE.MeshStandardMaterial({
  color: '#06B6D4',
  emissive: '#06B6D4',
  emissiveIntensity: 1.5,
  roughness: 0.2,
  metalness: 0.8,
  transparent: true,
  opacity: 0.9,
});

export const DarkBuilding = new THREE.MeshStandardMaterial({
  color: '#0a0a15',
  roughness: 0.6,
  metalness: 0.7,
});

export const createGlassMaterial = (color: string, opacity = 0.25) =>
  new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.5,
    thickness: 1.2,
    transparent: true,
    opacity,
    envMapIntensity: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  });

export const createEmissiveMaterial = (color: string, intensity = 1.5) =>
  new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
  });
