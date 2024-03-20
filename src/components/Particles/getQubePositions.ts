export default function getQubePositions(qubeSize: number): Float32Array {
  const particlesCount = qubeSize * qubeSize * qubeSize;
  const coordinatesPerParticleCount = 3;
  const positions = new Float32Array(particlesCount * coordinatesPerParticleCount);
  const [xIndex, yIndex, zIndex] = [0, 1, 2];

  const currentParticlePosition: number[] = [0, 0, 0]
  
  let i: number;
  for(i = 0; i < particlesCount; i++) {
    positions[i * coordinatesPerParticleCount] = currentParticlePosition[xIndex];
    positions[i * coordinatesPerParticleCount + yIndex] = currentParticlePosition[yIndex];
    positions[i * coordinatesPerParticleCount + zIndex] = currentParticlePosition[zIndex];

    generateNextParticle();
  }

  function generateNextParticle () {
    const maxSize = qubeSize - 1;

    if(currentParticlePosition[yIndex] === maxSize && currentParticlePosition[xIndex] === maxSize) {
      currentParticlePosition[xIndex] = 0;
      currentParticlePosition[yIndex] = 0;
      currentParticlePosition[zIndex]++;

      return;
    }

    if(currentParticlePosition[xIndex] === maxSize) {
      currentParticlePosition[xIndex] = 0;
      currentParticlePosition[yIndex]++;

      return;
    }

    currentParticlePosition[xIndex]++;
  }

  return positions;
}