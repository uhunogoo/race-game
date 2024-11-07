// 3D libraries
import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// Components
import Experience from './Experience';
import Interface from './Interface';

function Game() {
  return (
    <KeyboardControls map={ [
      { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
      { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
      { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
      { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
      { name: 'jump', keys: [ 'Space' ] }
    ] }>
      <Canvas
        shadows
        style={ { width: '100%', height: '100%', position: 'fixed' } }
        camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 2.5, 4, 6 ]
        } }
      >
        <Experience />
      </Canvas>

      <Interface />
    
    </KeyboardControls>
  )
}

export default Game;