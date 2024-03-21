import { useTexture } from '@react-three/drei';
import getQubePositions from './getQubePositions';
import getQubeColors from './getQubeColors';

export default function Particles() {
  const qubeSize = 4;
  const positions = getQubePositions(qubeSize);
  const colors = getQubeColors(qubeSize, [1, 1, 2], 2);

  const texture = useTexture('src/assets/particle.png');
  
  return <points position={[-qubeSize / 2, -qubeSize / 2, -qubeSize / 2]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
    <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial vertexColors={true} depthWrite={false} transparent={true} alphaMap={texture} size={4} sizeAttenuation={true}  />
</points>
}