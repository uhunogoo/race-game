import React from 'react';
import MeshBlueprint from './MeshBlueprint';
import { Float, Text } from '@react-three/drei';

function BlockStart({ position, geometry, material }) {
  const currentPosition = position || [ 0, 0, 0 ];
  return (
    <group position={ currentPosition }>
      {/* Strt Text */}
      {/* <Float>
        <Text color="black" anchorX="center" anchorY="middle">Marble race</Text>
      </Float> */}

      {/* Floor */}
      <MeshBlueprint 
        geometry={ geometry } 
        material={ material } 
        position-y={ - 0.1 } 
        scale={[ 4, 0.2, 4 ]}
        receiveShadow
      />

    </group>
  );
}

export default BlockStart;