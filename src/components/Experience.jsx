import React from 'react';

// 3D libraries
import { Physics } from '@react-three/rapier';

// Components
import BlockSpinner from './BlockSpinner.jsx';
import BlockLimbo from './BlockLimbo.jsx';
import BlockAxe from './BlockAxe.jsx';
import Lights from './Lights.jsx';
import Player from './Player.jsx';
import Level from './Level.jsx';

// Helpers
import useGame from '../stores/useGame.js';
import Laser from './BlockLaser.jsx';

export default function Experience() {
  const blocksCount = useGame( (state) => state.blocksCount );
  const blocksSeed = useGame( (state) => state.blocksSeed );
  return (
    <>
    <color args={ [ '#bdedfc' ] } attach="background" />
      {/* <OrbitControls makeDefault /> */}

      <React.Suspense fallback={ null }>
        <Physics debug={ false }>
          <Lights />
          <Level 
            trapsCount={ blocksCount }
            seed={ blocksSeed }
            trapBlocks={ [ BlockSpinner, BlockLimbo, BlockAxe, Laser ] }
          />
          <Player />
        </Physics>
      </React.Suspense>
    </>
  );
}
