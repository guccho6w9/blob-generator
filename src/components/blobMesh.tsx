import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Color, ShaderMaterial } from 'three';
import { useRef } from 'react';

interface BlobProps {
  color: string;
  gradientColors: { color1: string; color2: string };
  useGradient: boolean;
  size: number;  // Tamaño base
  animation: string;
  intensity: number;
}

const BlobMesh: React.FC<BlobProps> = ({ color, gradientColors, useGradient, size, animation, intensity }) => {
  const blobRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!blobRef.current) return;
    
    // Calcula el factor de escala
    let scaleFactor = 1;
    if (animation === 'breathing') {
      scaleFactor = Math.sin(intensity * performance.now() * 0.001) * 0.5 + 1;
    }

    // Aplica la escala basada en el tamaño y el factor de escala
    blobRef.current.scale.set(size * scaleFactor, size * scaleFactor, size * scaleFactor);
  });

  const material = useGradient
    ? new ShaderMaterial({
        uniforms: {
          color1: { value: new Color(gradientColors.color1) },
          color2: { value: new Color(gradientColors.color2) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }
        `,
      })
    : new ShaderMaterial({
        uniforms: {
          color: { value: new Color(color) },
        },
        vertexShader: `
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

  return (
    <mesh ref={blobRef} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
};

export default BlobMesh;
