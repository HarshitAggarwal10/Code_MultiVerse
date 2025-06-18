// Tech3DScene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Html } from '@react-three/drei';

const TechLogo = ({ position, emoji, color }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <mesh position={position}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.85} />
      <Html center>
        <div style={{ fontSize: '2rem' }}>{emoji}</div>
      </Html>
    </mesh>
  </Float>
);

export default function Tech3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ height: '100vh', background: 'radial-gradient(circle at center, #0f0c29, #302b63, #24243e)' }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <Stars radius={100} depth={50} count={8000} factor={4} fade />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />

      {/* Tech Logos */}
      <Suspense fallback={null}>
        <TechLogo position={[0, 2, 0]} emoji="⚛️" color="#61DAFB" /> {/* React */}
        <TechLogo position={[2.5, 0, 0]} emoji="🟢" color="#3FA037" /> {/* Node.js */}
        <TechLogo position={[-2.5, 0, 0]} emoji="🐳" color="#2496ED" /> {/* Docker */}
        <TechLogo position={[0, -2, 0]} emoji="☕" color="#f0db4f" /> {/* JavaScript */}
        <TechLogo position={[0, 0, 2.5]} emoji="🌐" color="#ffffff" /> {/* Web */}
        <TechLogo position={[0, 0, -2.5]} emoji="🧠" color="#FF6B6B" /> {/* AI */}
        <TechLogo position={[3, 2, -1]} emoji="🔐" color="#8E44AD" /> {/* Cybersecurity */}
        <TechLogo position={[-3, -2, 1]} emoji="📱" color="#2980B9" /> {/* Mobile */}
        <TechLogo position={[2, -3, 1]} emoji="⚙️" color="#F39C12" /> {/* DevOps */}
        <TechLogo position={[-2, 3, -1]} emoji="💾" color="#2ECC71" /> {/* DB */}
        <TechLogo position={[1, 2.5, -2.5]} emoji="⛓️" color="#34495E" /> {/* Blockchain */}
      </Suspense>
    </Canvas>
  );
}