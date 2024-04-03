import { IMeasurementSettings as IMeasurementSettings } from "./models/IMeasurementSettings";
import colorSelectedParticle from "./functions/colorSelectedParticle";
import { colorParticleWithRange } from "./functions/colorParticlesWithRange";

export default function getRoomParameters(qubeSize: number, measurementSettings: IMeasurementSettings): [Float32Array, Float32Array] {
  const particlesCount = qubeSize * qubeSize * qubeSize;
  const numberOfParametersPerParticle = 3;
  const distanceBetweenParticles = 1;

  const positions = new Float32Array(particlesCount * numberOfParametersPerParticle);
  let colors = new Float32Array(particlesCount * numberOfParametersPerParticle);

  const [xIndex, yIndex, zIndex] = [0, 1, 2];

  const currentParticlePosition: number[] = [0, 0, 0];

  let currentPositionInFloatX: number;
  let currentPositionInFloatY: number;
  let currentPositionInFloatZ: number;
  
  let i: number;
  for(i = 0; i < particlesCount; i++) {
    currentPositionInFloatX = i * numberOfParametersPerParticle;
    currentPositionInFloatY = i * numberOfParametersPerParticle + yIndex;
    currentPositionInFloatZ = i * numberOfParametersPerParticle + zIndex;

    positions[currentPositionInFloatX] = currentParticlePosition[xIndex] * distanceBetweenParticles;
    positions[currentPositionInFloatY] = currentParticlePosition[yIndex] * distanceBetweenParticles;
    positions[currentPositionInFloatZ] = currentParticlePosition[zIndex] * distanceBetweenParticles;

    colors[currentPositionInFloatX] = 0.8;
    colors[currentPositionInFloatY] = 0.8;
    colors[currentPositionInFloatZ] = 0.8;

    generateNextParticle();
  }
  

  assignColors();

    return [positions, colors];

  function generateNextParticle(): void {
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

  function assignColors(): void {
    const [x, y ,z] = measurementSettings.position;
    const yIndexOffset = qubeSize;
    const zIndexOffset = qubeSize * qubeSize;
    
    const pointInFloat = x + y * yIndexOffset + z * zIndexOffset;
    const pointInFloatIndex = pointInFloat * numberOfParametersPerParticle;
    
    colors = colorParticleWithRange(colors, measurementSettings, yIndexOffset, zIndexOffset);
    colors = colorSelectedParticle(colors, pointInFloatIndex);
  }
}