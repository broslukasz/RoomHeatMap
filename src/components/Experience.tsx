import { OrbitControls } from "@react-three/drei";
import QubeParticles from "./RoomParticles/QubeParticles";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export const Experience = () => {
  const particleSizeControl = { value: 200, min: 50, max: 400, step: 10 };
  const qubeSizeControl = { value: 5, min: 1, max: 20, step: 1 };

  const positionControl = {
    x: { value: 2, min: 1, max: 20, step: 1 },
    y: { value: 2, min: 1, max: 20, step: 1 },
    z: { value: 3, min: 1, max: 20, step: 1 }
  }

  const selectionRangeControl = {
    value: 1, min: 0, max: 5, step: 1
  }

  const {  particleSize, qubeSize, performanceVisible, selectionRange, X, Y, Z } = useControls({ 
      particleSize: particleSizeControl,  
      qubeSize: qubeSizeControl,
      X: positionControl.x,
      Y: positionControl.y,
      Z: positionControl.z,
      selectionRange: selectionRangeControl,
      performanceVisible: false,
  })
  
  return (
    <>
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <OrbitControls />
      <QubeParticles particleSize={particleSize} qubeSize={qubeSize} position={[X, Y, Z]} selectionRange={selectionRange} />
    </>
  );
};
