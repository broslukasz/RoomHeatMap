import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'

import getRoomParameters from './getRoomParameters';
import { useEffect, useMemo, useRef } from 'react';

import particlesVertexShader from './shaders/particles.vertex.glsl'
import particlesFragmentShader from './shaders/particles.fragment.glsl'

type QubeParticlesProps = {
  particleSize: number;
  qubeSize: number;
  particlesDistance: number;
  position: [number, number, number],
  selectionRange?: number;
}

export default function QubeParticles({particleSize, qubeSize, particlesDistance, position, selectionRange = 0}: QubeParticlesProps) {
  const { clock, gl } = useThree();
  let geometryRef = useRef<THREE.BufferGeometry>(null);
  let pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  let particlesRef = useRef<THREE.Points>(null);

  let [positions, colors] = useMemo(() => {
    return getRoomParameters({qubeSize, particlesDistance}, {position, selectionRange });    
  }, [qubeSize, position, selectionRange])

  useEffect(() =>{
    geometryRef.current.dispose();
    pointsMaterialRef.current.dispose();
    particlesRef.current.clear();

  }, [qubeSize, selectionRange, position])

  const texture = useTexture('src/assets/particle.png');
  
  useFrame(() =>
  {
    // Update Material
    pointsMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  })

  const translatedPosition = -qubeSize / 2 * particlesDistance + 0.5;

  return (
    <points ref={particlesRef} position={[translatedPosition, translatedPosition, translatedPosition]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3} />
        <bufferAttribute 
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={pointsMaterialRef}
        depthWrite={false}
        vertexColors={true}
        needsUpdate={true}
        transparent={true}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={{
          uSize: {value: particleSize * gl.getPixelRatio()},
          uTime: {value: 0},
        }}
         />
    </points>
  )
}