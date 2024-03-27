import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'

import getRoomParameters from './getRoomParameters';
import { useEffect, useMemo, useRef, useState } from 'react';

type QubeParticlesProps = {
  qubeSize: number;
  position: [number, number, number],
  selectionRange?: number;
}

export default function QubeParticles({qubeSize, position, selectionRange = 0}: QubeParticlesProps) {
  const { clock } = useThree();
  let geometryRef = useRef<THREE.BufferGeometry>(null);
  let pointsMaterialRef = useRef<THREE.PointsMaterial>(null);
  let particlesRef = useRef<THREE.Points>(null);

  let [positions, colors] = useMemo(() => {
    return getRoomParameters(qubeSize, {position, selectionRange });    
  }, [qubeSize, position, selectionRange])

  useEffect(() =>{
    geometryRef.current.dispose();
    pointsMaterialRef.current.dispose();
    particlesRef.current.clear();
  }, [qubeSize, selectionRange, position])

  const texture = useTexture('src/assets/particle.png');

  let x: number, y: number, z: number;
  let i: number, i3: number;
  
  useFrame(() =>
  {
    const elapsedTime = clock.getElapsedTime();
    const particleGeometry = particlesRef.current.geometry;
    const floatingFactor = 0.0003;
    
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
  
  return (
    <points ref={particlesRef} position={[-qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3} />
        <bufferAttribute 
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3} />
      </bufferGeometry>
      <pointsMaterial ref={pointsMaterialRef} needsUpdate={true} vertexColors={true} depthWrite={false} transparent={true} alphaMap={texture} size={3} sizeAttenuation={true}  />
    </points>
  )
}