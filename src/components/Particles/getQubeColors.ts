export default function getQubeColors(qubeSize: number, coloredParticle: [number, number, number], colorRange = 1): Float32Array {
  const particlesCount = qubeSize * qubeSize * qubeSize;
  const coordinatesPerParticleCount = 3;
  const positions = new Float32Array(particlesCount * coordinatesPerParticleCount);
  const [xIndex, yIndex, zIndex] = [0, 1, 2];
  let currentFloatPosition: [number, number, number] = [0, 0, 0];
  
  let i: number;
  for(i = 0; i < particlesCount; i++) {
    const floatPositionX = i * coordinatesPerParticleCount;
    const floatPositionY = i * coordinatesPerParticleCount + yIndex;
    const floatPositionZ = i * coordinatesPerParticleCount + zIndex;

    currentFloatPosition = [floatPositionX, floatPositionY, floatPositionZ];
  
    
    positions[floatPositionX] = 1;
    positions[floatPositionY] = 1;
    positions[floatPositionZ] = 1;
  }

  const [x, y ,z] = coloredParticle;
  let pointInFloatIndex = x + y * 4 + z * 16;
  
  positions[pointInFloatIndex * 3] = 1
  positions[pointInFloatIndex * 3 + 1] = 0
  positions[pointInFloatIndex * 3 + 2] = 0

  return positions;
}