// frontend/src/components/Viewer.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Viewer({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);

  return (
    <Canvas style={{ height: '400px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} />
      <primitive object={scene} />
      <OrbitControls />
    </Canvas>
  );
}

export default Viewer;
