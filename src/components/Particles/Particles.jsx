import getQubePositions from './getQubePositions'

export default function Particles() {
  const qubeSize = 10;
  const positions = getQubePositions(qubeSize);
  return <points position={[-qubeSize / 2, -qubeSize / 2, -qubeSize / 2]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
  </bufferGeometry>
  <pointsMaterial size={0.5} sizeAttenuation={true}  />
</points>
}