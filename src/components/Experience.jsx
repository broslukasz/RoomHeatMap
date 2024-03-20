import { OrbitControls } from "@react-three/drei";

const dimentionSize = 5;
const particlesCount = dimentionSize * dimentionSize * dimentionSize;

const positions = new Float32Array(particlesCount * 3);

let i;

let currentParticlePosition = [0, 0, 0]
let allPositions = [];

for(i = 0; i < particlesCount; i++) {
  positions[i * 3] = currentParticlePosition[0];
  positions[i * 3 + 1] = currentParticlePosition[1];
  positions[i * 3 + 2] = currentParticlePosition[2];

  generateNextParticle();
}

function generateNextParticle () {
  const maxSize = dimentionSize - 1;

  if(currentParticlePosition[1] === maxSize && currentParticlePosition[0] === maxSize) {
    currentParticlePosition[0] = 0;
    currentParticlePosition[1] = 0;
    currentParticlePosition[2]++;

    return;
  }

  if(currentParticlePosition[0] === maxSize) {
    currentParticlePosition[0] = 0;
    currentParticlePosition[1]++;

    return;
  }

  currentParticlePosition[0]++;
}

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <points position={[-0.5, -0.5, -0.5]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.5} sizeAttenuation={true}  />
      </points>
    </>
  );
};
