import { RigidBody } from '@react-three/rapier';
import MeshBlueprint from './MeshBlueprint';
import useGame from '../stores/useGame';
import { useFrame } from '@react-three/fiber';
import React from 'react';

function Laser({ position, geometry, floorMaterial, obstacleMaterial }) {
  const laserRef = React.useRef();
  const currentPosition = position || [ 0, 0, 0 ];
  const restart = useGame( (state) => state.restart );
  const timeOffset = React.useMemo(() => Math.random() * Math.PI * 2, []);
  
  React.useEffect(() => {
    const unsubscribeReset = useGame.subscribe( 
      (state) => state.phase,
      (phase) => {
        if ( phase === 'ready' ) reset();
      }
    );
    return () => unsubscribeReset();
  }, []);

  useFrame((state, delta) => {
    if (!laserRef.current) return;
    const time = state.clock.getElapsedTime();
    const y = (Math.sin(time + timeOffset) * 0.5 + 0.5) * 1.25;
    laserRef.current.setNextKinematicTranslation({ x: position[ 0 ], y: position[ 1 ] + y, z: position[ 2 ] });
  })

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

      {/* Laser */}
      <RigidBody ref={laserRef} type="kinematicPosition" onCollisionEnter={ restart } position={[ 0, 1, 0 ]} restitution={ 0.2 } friction={ 0 }>
        <MeshBlueprint
          geometry={ geometry }
          material={ obstacleMaterial }
          scale={[ 3.5, 0.2, 0.2 ]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

export default Laser;