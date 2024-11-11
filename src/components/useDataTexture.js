import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

const width = 128; // Width of the texture
const height = 128; // Height of the texture
const size = width * height * 4; // RGBA

// Create a buffer for the texture
const data = new Uint8Array(size);
const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
texture.needsUpdate = true;

export function useDataTexture() {
  const updateTexture = React.useCallback( ( characterPosition ) => {
    // Update the data array to create a trail effect
    for (let i = 0; i < size; i += 4) {
        // Fade the trail
        data[i] = Math.max(0, data[i + 3] - 10); // Decrease alpha
        data[i + 3] = Math.max(0, data[i + 3] - 10); // Decrease alpha
    }

    // Set the new position of the character in the texture
    const x = Math.floor( characterPosition.x * width );
    const z = Math.floor( - characterPosition.z * height );
    const index = ( z * width + x ) * 4;

    // Set the color and alpha for the character's position
    data[index] = 255;     // Red
    data[index + 1] = 0;   // Green
    data[index + 2] = 0;   // Blue
    data[index + 3] = 255; // Alpha

    texture.needsUpdate = true; // Mark the texture for update
  }, []);

  // useFrame((state) => {
  //   if (!characterPosition) return;

  //   updateTexture( characterPosition ) ;
  // });

  return [ texture, updateTexture ];
}