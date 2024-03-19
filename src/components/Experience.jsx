import { OrbitControls } from "@react-three/drei";

const count = 1000;
const positions = new Float32Array(count * 3);

let i;
for(i = 0; i < count * 3; i++) {
  positions[i] = Math.random();
}

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <points position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} sizeAttenuation={true}  />
      </points>
    </>
  );
};
