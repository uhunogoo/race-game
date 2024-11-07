import React from 'react';
import * as THREE from 'three';

// Components
import BlockSpinner from './BlockSpinner';
import BlockStart from './BlockStart';
import BlockLimbo from './BlockLimbo';
import BlockAxe from './BlockAxe';
import BlockEnd from './BlockEnd';
import Bounds from './Bounds';
import Laser from './BlockLaser';

const boxGeometry = new THREE.BoxGeometry();
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
// const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategray' });


function Level({ trapsCount = 0, trapBlocks = null, seed = 0 }) {
  const count = trapsCount || 5;
  // const traps = trapBlocks || [ BlockSpinner, BlockLimbo, BlockAxe, Laser ];
  const traps = [ Laser ];

  const blocks = React.useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      blocks.push(traps[Math.floor(Math.random() * traps.length)]);
    }
    return blocks;
  }, [ count, traps, seed ]);

  
  return (
    <>
      {/* start section */}
      <BlockStart 
        position={[ 0, 0, 0 ]} 
        geometry={ boxGeometry } 
        material={ floor1Material } 
      />

      {/* traps section */}
      { blocks.map((Block, i) => (
        <Block
          key={i}
          position={[ 0, 0, - (i + 1) * 4 ]}
          geometry={ boxGeometry }
          floorMaterial={ floor2Material }
          obstacleMaterial={ obstacleMaterial }
        />
      )) }

      {/* end section */}
      <BlockEnd
        position={[ 0, 0, - (count + 1) * 4 ]}
        geometry={ boxGeometry }
        material={ floor1Material }
      />

      {/* bounds */}
      <Bounds length={ count + 2 } />
    </>
  );
}

export default Level;