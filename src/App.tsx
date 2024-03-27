import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";

function App() {
  return (<>
      <Leva collapsed />
        <Canvas shadows camera={{ position: [5, 6, 10], fov: 30 }}>
          <color attach="background" args={["#000000"]} />
          <Experience />
        </Canvas>
    </>
  );
}

export default App;
