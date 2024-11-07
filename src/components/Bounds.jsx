// 3D libraries
import { CuboidCollider, RigidBody } from '@react-three/rapier';

function Bounds({ length = 1 }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <CuboidCollider 
        args={[ 2, 0.1, 2 * length ]} position={[ 0, -0.1, -(length * 2) + 2 ]} 
        restitution={ 0.2 } 
        friction={ 1 } 
      />
    </RigidBody>
  )
}

export default Bounds;