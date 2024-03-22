import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

import getRoomParameters from './getRoomParameters';
import { useRef } from 'react';

export default function RoomParticles() {
  const qubeSize = 4;
  const [positions, colors] = getRoomParameters(qubeSize, {position: [1, 1, 2], colorRange: 2 });

  const texture = useTexture('src/assets/particle.png');
  const particlesRef = useRef();

  // console.log(particlesRef.current.geometry.attributes);
  
  useFrame((state) =>
  {
    const elapsedTime = state.clock.getElapsedTime();
    const particleGeometry = particlesRef.current.geometry;
    const floatingFactor = 0.001;

    let i;
    let i3;
    for(i  = 0; i < positions.length; i++) {
      i3 = i * 3;
      particleGeometry.attributes.position.array[i3 + 0] = particleGeometry.attributes.position.array[i3 + 0] + Math.sin(elapsedTime) * floatingFactor;
    }

    particleGeometry.attributes.position.needsUpdate = true;
  })
  
  return <points ref={particlesRef} position={[-qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5, -qubeSize / 2 + 0.5]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
    <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial vertexColors={true} depthWrite={false} transparent={true} alphaMap={texture} size={4} sizeAttenuation={true}  />
</points>
}