import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

import getRoomParameters from './getRoomParameters';
import { useRef } from 'react';
import * as React from 'react';

export default function RoomParticles() {
  const qubeSize = 5;
  const [positions, colors] = getRoomParameters(qubeSize, {position: [2, 2, 3], colorRange: 1 });

  const texture = useTexture('src/assets/particle.png');
  const particlesRef = useRef<THREE.Points>(null!);

  let x: number, y: number, z: number;
  let i: number, i3: number;
  
  useFrame((state) =>
  {
    const elapsedTime = state.clock.getElapsedTime();
    const particleGeometry = particlesRef.current.geometry;
    const floatingFactor = 0.0003

    for(i  = 0; i < positions.length; i++) {
      i3 = i * 3;

      x = particleGeometry.attributes.position.array[i3];
      y = particleGeometry.attributes.position.array[i3 + 1];
      z = particleGeometry.attributes.position.array[i3 + 2];

      particleGeometry.attributes.position.array[i3] = particleGeometry.attributes.position.array[i3] + Math.sin(elapsedTime + x) * floatingFactor;
      particleGeometry.attributes.position.array[i3 + 1] = particleGeometry.attributes.position.array[i3 + 1] + Math.sin(elapsedTime + y) * floatingFactor;
      particleGeometry.attributes.position.array[i3 + 2] = particleGeometry.attributes.position.array[i3 + 2] + Math.sin(elapsedTime + z) * floatingFactor;
    }

    particleGeometry.attributes.position.needsUpdate = true;
  })
  
  return <points ref={particlesRef} position={[-qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
    <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial vertexColors={true} depthWrite={false} transparent={true} alphaMap={texture} size={3} sizeAttenuation={true}  />
</points>
}