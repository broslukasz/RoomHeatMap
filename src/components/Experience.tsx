import { OrbitControls } from "@react-three/drei";
import QubeParticles from "./RoomParticles/QubeParticles";
import { useControls } from "leva";

export const Experience = () => {
  const qubeSizeControl = {
    value: 5,
    min: 1,
    max: 20,
    step: 1
  }
  const { qubeSize } = useControls({ qubeSize: qubeSizeControl})
  
  return (
    <>
      <OrbitControls />
      <QubeParticles qubeSize={qubeSize} position={[2, 2, 3]} colorRange={1} />
    </>
  );
};
