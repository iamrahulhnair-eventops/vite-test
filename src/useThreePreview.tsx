import { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';

// Example: useThreePreview hook
export function useThreePreview({
  renderContent,
  cameraPosition = [0, 0, 5],
  background = '#222',
}: {
  renderContent?: () => React.ReactNode;
  cameraPosition?: [number, number, number];
  background?: string;
} = {}) {
  // The hook returns a component to render the 3D preview
  const ThreePreview = () => (
    <Canvas camera={{ position: cameraPosition }} style={{ width: '100%', height: '100%', background }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {renderContent ? renderContent() : <DefaultBox />}
    </Canvas>
  );
  return { ThreePreview };
}

function DefaultBox() {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
