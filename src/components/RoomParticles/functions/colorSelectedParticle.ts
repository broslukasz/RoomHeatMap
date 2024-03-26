import { IColorSettings } from "../models/IColorSettings";

export default function colorSelectedParticle(colors: Float32Array, colorSettings: IColorSettings): Float32Array {
  const [x, y ,z] = colorSettings.position;
  let pointInFloatIndex = x + y * 4 + z * 16;
  
  colors[pointInFloatIndex * 3] = 1;
  colors[pointInFloatIndex * 3 + 1] = 0;
  colors[pointInFloatIndex * 3 + 2] = 0;

  return colors;
}

export function colorParticleAroundSelected(colors: Float32Array, colorSettings: IColorSettings): Float32Array {
  const [x, y ,z] = colorSettings.position;
  let pointInFloatIndex = x + y * 4 + z * 16;
  
  colors[pointInFloatIndex * 3] = 1;
  colors[pointInFloatIndex * 3 + 1] = 0;
  colors[pointInFloatIndex * 3 + 2] = 0;

  const positives = Array.from(Array(colorSettings.colorRange + 1).keys()).filter(value => value !== 0)
  const negatives = Array.from(Array(colorSettings.colorRange + 1).keys()).map(value => -value).filter(value => value !== 0).reverse();
  const allValues = [...negatives, ...positives];

  let translatedPointInFloatIndex: number;
  let translatedX: number;
  let translatedY: number;

  allValues.forEach((value) => {
    translatedX = x + value;
    translatedPointInFloatIndex = translatedX + y * 4 + z * 16;
    
    colors[translatedPointInFloatIndex * 3] = 1;
    colors[translatedPointInFloatIndex * 3 + 1] = 0;
    colors[translatedPointInFloatIndex * 3 + 2] = 0;

    allValues.forEach((value) => {
      translatedY = y + value;
      translatedPointInFloatIndex = translatedX + translatedY * 4 + z * 16;

      colors[translatedPointInFloatIndex * 3] = 1;
      colors[translatedPointInFloatIndex * 3 + 1] = 0;
      colors[translatedPointInFloatIndex * 3 + 2] = 0;
    })
  })

  return colors;
}