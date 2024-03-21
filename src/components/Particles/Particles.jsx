import { useTexture } from '@react-three/drei';
import getQubePositions from './getQubePositions'

export default function Particles() {
  const qubeSize = 10;
  const positions = getQubePositions(qubeSize);

  const texture = useTexture('src/assets/particle.png');
  
  return <points position={[-qubeSize / 2, -qubeSize / 2, -qubeSize / 2]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial depthWrite={false} transparent={true} alphaMap={texture} size={2} sizeAttenuation={true}  />
</points>
}