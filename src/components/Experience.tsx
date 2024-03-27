import { OrbitControls } from "@react-three/drei";
import QubeParticles from "./RoomParticles/QubeParticles";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <QubeParticles qubeSize={5} position={[1, 1, 1]} colorRange={1} />
    </>
  );
};
