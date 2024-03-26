import { IColorSettings } from "./models/IColorSettings";
import colorSelectedParticle, { colorParticleAroundSelected } from "./functions/colorSelectedParticle";

export default function getRoomParameters(qubeSize: number, colorSettings: IColorSettings): [Float32Array, Float32Array] {
  const particlesCount = qubeSize * qubeSize * qubeSize;
  const numberOfParametersPerParticle = 3;

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

    positions[currentPositionInFloatX] = currentParticlePosition[xIndex];
    positions[currentPositionInFloatY] = currentParticlePosition[yIndex];
    positions[currentPositionInFloatZ] = currentParticlePosition[zIndex];

    colors[currentPositionInFloatX] = 1;
    colors[currentPositionInFloatY] = 1;
    colors[currentPositionInFloatZ] = 1;

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
    colors = colorSelectedParticle(colors, colorSettings);
    colors = colorParticleAroundSelected(colors, colorSettings);
  }
}