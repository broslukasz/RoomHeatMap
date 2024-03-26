export default function colorSelectedParticle(colors: Float32Array, position: [number, number, number]): Float32Array {
  const [x, y ,z] = position;
  let pointInFloatIndex = x + y * 4 + z * 16;
  
  colors[pointInFloatIndex * 3] = 1;
  colors[pointInFloatIndex * 3 + 1] = 0;
  colors[pointInFloatIndex * 3 + 2] = 0;

  return colors;
}