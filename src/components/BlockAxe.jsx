import React from 'react';

// 3D libraries
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

// components
import MeshBlueprint from './MeshBlueprint';


function BlockAxe({ position, geometry, floorMaterial, obstacleMaterial }) {
  const currentPosition = position || [ 0, 0, 0 ];
  const obstacleRef = React.useRef();

  const timeOffset = React.useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (!obstacleRef.current) return;
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacleRef.current.setNextKinematicTranslation({ x: position[ 0 ] + x, y: position[ 1 ] + 0.75, z: position[ 2 ] });
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

      {/* Axe */}
      <RigidBody ref={ obstacleRef } type="kinematicPosition" position={[ 0, 1, 0 ]} restitution={ 0.2 } friction={ 0 } >
        <MeshBlueprint
          geometry={ geometry }
          material={ obstacleMaterial }
          scale={[ 1.5, 1.5, 0.2 ]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export default BlockAxe;