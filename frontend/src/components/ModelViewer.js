// frontend/src/components/ModelViewer.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ModelViewer({ model }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!model || !model.fileUrl) return;

    let scene, camera, renderer;
    let modelObject;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 1).normalize();
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(
        `/models${model.fileUrl}`, // Adjust the path to match the static route
        (gltf) => {
          modelObject = gltf.scene;
          scene.add(modelObject);
          animate();
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (modelObject) modelObject.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    init();

    return () => {
      if (modelObject) scene.remove(modelObject);
      if (renderer) {
        renderer.dispose();
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [model]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
}

export default ModelViewer;
