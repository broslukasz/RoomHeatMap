import { OrbitControls } from "@react-three/drei";
import QubeParticles from "./RoomParticles/QubeParticles";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <QubeParticles qubeSize={5} />
    </>
  );
};
