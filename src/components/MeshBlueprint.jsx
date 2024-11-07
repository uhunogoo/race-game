import React from "react";

function MeshBlueprint({ geometry, material, ...delegated }, ref) {
  return (
    <mesh
      ref={ ref }
      geometry={ geometry }
      material={ material }
      receiveShadow
      { ...delegated }
    >
      { !geometry && <boxGeometry /> }
      { !material && <meshStandardMaterial color="limegreen" /> }
    </mesh>
  )
}

export default React.forwardRef( MeshBlueprint );