import React from 'react';
import * as THREE from 'three';

// 3D libraries
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

// components
import MeshBlueprint from './MeshBlueprint';


function BlockSpinner({ position, geometry, floorMaterial, obstacleMaterial }) {
  const currentPosition = position || [ 0, 0, 0 ];
  const obstacleRef = React.useRef();

  const speed = React.useMemo(() => {
    const speed = Math.random() * 0.5 + 0.5;
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    return speed * direction;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (!obstacleRef.current) return;
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler( new THREE.Euler( 0, time * speed, 0 ) );
    obstacleRef.current.setNextKinematicRotation( rotation );
  });

  return (
    <group position={ currentPosition }>
      {/* Floor */}
      <MeshBlueprint 
        geometry={ geometry } 
        material={ floorMaterial } 
        position-y={ - 0.1 } 
        scale={[ 4, 0.2, 4 ]} 
        receiveShadow
      />

      {/* Spinner */}
      <RigidBody 
        ref={ obstacleRef } 
        type="kinematicPosition" 
        position={[ 0, 0.3, 0 ]} 
        restitution={ 0.2 } 
        friction={ 0 }
      >
        <MeshBlueprint
          geometry={ geometry }
          material={ obstacleMaterial }
          scale={[ 3.5, 0.3, 0.3 ]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockSpinner;