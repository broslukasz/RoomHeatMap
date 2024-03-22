import { useTexture } from '@react-three/drei';
import getRoomParameters from './getRoomParameters';

export default function RoomParticles() {
  const qubeSize = 4;
  const [positions, colors] = getRoomParameters(qubeSize, {position: [1, 1, 2], colorRange: 2 });

  const texture = useTexture('src/assets/particle.png');
  
  return <points position={[-qubeSize / 2, -qubeSize / 2, -qubeSize / 2]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
    <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial vertexColors={true} depthWrite={false} transparent={true} alphaMap={texture} size={4} sizeAttenuation={true}  />
</points>
}