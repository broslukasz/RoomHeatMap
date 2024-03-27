import { OrbitControls } from "@react-three/drei";
import RoomParticles from "./RoomParticles/RoomParticles";
import * as React from "react";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <RoomParticles />
    </>
  );
};
