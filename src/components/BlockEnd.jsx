import React from 'react';

// 3D libraries
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

// components
import MeshBlueprint from './MeshBlueprint';

function BlockEnd({ position, geometry, material }) {
  const currentPosition = position || [ 0, 0, 0 ];
  return (
    <group position={ currentPosition }>
      
      {/* Floor */}
      <MeshBlueprint 
        geometry={ geometry } 
        material={ material } 
        scale={[ 4, 0.2, 4 ]}
        receiveShadow
      />

      {/* Point */}
      <RigidBody type="fixed" colliders="hull" position={[ 0, 1, 0 ]} restitution={ 0.2 } friction={ 0 }>
        <MovedVertical>
          <mesh castShadow receiveShadow>
            <capsuleGeometry args={[ 0.5, 0.5, 8, 8 ]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </MovedVertical>
      </RigidBody>
    </group>
  );
}

function MovedVertical({ children }) {
  const ref = React.useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(time * 2) * 0.05;
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
}

export default BlockEnd;