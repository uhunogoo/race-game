import React from 'react';

// 3D libraries
import { useFrame } from '@react-three/fiber';

export default function Lights() {
  const directionalLightRef = React.useRef();

  useFrame((state, delta) => {
    if (!directionalLightRef.current) return;
    
    // Light follows camera
    directionalLightRef.current.position.z = state.camera.position.z + 1 - 4;
    directionalLightRef.current.target.position.z = state.camera.position.z - 4;

    // Update light matrix
    directionalLightRef.current.target.updateMatrixWorld();
  });

  return <>
    <directionalLight
      ref={ directionalLightRef }
      castShadow
      position={ [ 4, 4, 1 ] }
      intensity={ 4.5 }
      shadow-mapSize={ [ 1024, 1024 ] }
      shadow-camera-near={ 1 }
      shadow-camera-far={ 10 }
      shadow-camera-top={ 10 }
      shadow-camera-right={ 10 }
      shadow-camera-bottom={ - 10 }
      shadow-camera-left={ - 10 }
    />
    <ambientLight intensity={ 1.5 } />
  </>
}