import { IColorSettings } from "../models/IColorSettings";

export function colorParticleWithRange(colors: Float32Array, colorSettings: IColorSettings, yIndexOffset: number, zIndexOffset: number): Float32Array {
  const [x, y ,z] = colorSettings.position;

  const positives = Array.from(Array(colorSettings.colorRange + 1).keys())
  const negatives = Array.from(Array(colorSettings.colorRange + 1).keys()).map(value => -value).filter(value => value !== 0).reverse();
  const allValues = [...negatives, ...positives];

  let translatedPointInFloatIndex: number;
  let translatedX: number;
  let translatedY: number;
  let translatedZ: number;

  allValues.forEach((value) => {
    translatedX = x + value;
    translatedPointInFloatIndex = translatedX + y * yIndexOffset + z * zIndexOffset;
    
    colors[translatedPointInFloatIndex * 3] = 1;
    colors[translatedPointInFloatIndex * 3 + 1] = 0;
    colors[translatedPointInFloatIndex * 3 + 2] = 0;

    allValues.forEach((value) => {
      translatedY = y + value;
      translatedPointInFloatIndex = translatedX + translatedY * yIndexOffset + z * zIndexOffset;

      colors[translatedPointInFloatIndex * 3] = 1;
      colors[translatedPointInFloatIndex * 3 + 1] = 0;
      colors[translatedPointInFloatIndex * 3 + 2] = 0;

      allValues.forEach((value) => {
        translatedZ = z + value;
        translatedPointInFloatIndex = translatedX + translatedY * yIndexOffset + translatedZ * zIndexOffset;
  
        colors[translatedPointInFloatIndex * 3] = 1;
        colors[translatedPointInFloatIndex * 3 + 1] = 0;
        colors[translatedPointInFloatIndex * 3 + 2] = 0;
      })
    })
  })

  return colors;

}