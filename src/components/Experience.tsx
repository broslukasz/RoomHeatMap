import { OrbitControls } from "@react-three/drei";
import QubeParticles from "./RoomParticles/QubeParticles";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <QubeParticles qubeSize={5} position={[2, 2, 3]} colorRange={1} />
    </>
  );
};
