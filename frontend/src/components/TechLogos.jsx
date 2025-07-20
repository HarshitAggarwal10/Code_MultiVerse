import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import ReactLogo from "../quizpics/react.png";
import node from "../quizpics/node.png";
import js from "../quizpics/js.png";
import git from "../quizpics/git.png";
import mongo from "../quizpics/mongo.png";

// Center glowing sun (core of CodeMultiVerse)
const GlowingCore = () => {
  const meshRef = useRef();
  const matRef = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.02;
    if (matRef.current) {
      matRef.current.emissiveIntensity = 1.4 + Math.sin(time.current) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        ref={matRef}
        emissive={new THREE.Color("#ffaa00")}
        emissiveIntensity={2}
        color="#1a1a1a"
      />
    </mesh>
  );
};

// Orbiting spheres with logos
const LogoSphere = ({
  textureUrl,
  label,
  link,
  radius = 4.5,
  speed = 0.0045,
  y = 0,
  angleOffset = 0,
}) => {
  const texture = useTexture(textureUrl);
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const angle = useRef(angleOffset);

  useFrame(() => {
    angle.current += speed;
    const x = Math.cos(angle.current) * radius;
    const z = Math.sin(angle.current) * radius;
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.25 : 1.05}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(link, "_blank")}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
      <Html distanceFactor={10}>
        <div className="text-white text-xs font-semibold bg-black/60 px-2 py-0.5 rounded shadow-md">
          {label}
        </div>
      </Html>
    </mesh>
  );
};

const TechLogos3DSection = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-[#0b0820] via-[#100530] to-[#130738] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Technologies that Power{" "}
            <span className="text-yellow-400">CodeMultiVerse</span>
          </h2>
          <p className="text-lg md:text-xl text-indigo-300 max-w-3xl mx-auto">
            A constellation of modern tools forming the backbone of your dev journey.
          </p>
        </div>

        <div className="relative h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-indigo-900">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 5]} intensity={1.2} color={"#ffaa00"} />
            <Stars radius={100} depth={50} count={6000} factor={4} fade speed={1.2} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />

            <GlowingCore />

            <LogoSphere textureUrl={ReactLogo} label="React" link="https://reactjs.org" y={1} angleOffset={0} />
            <LogoSphere textureUrl={node} label="Node.js" link="https://nodejs.org" y={-1.2} angleOffset={1.5} />
            <LogoSphere textureUrl={js} label="JavaScript" link="https://developer.mozilla.org/en-US/docs/Web/JavaScript" y={-1.8} angleOffset={2.4} />
            <LogoSphere textureUrl={git} label="Git" link="https://git-scm.com" y={1.5} angleOffset={3.2} />
            <LogoSphere textureUrl={mongo} label="MongoDB" link="https://www.mongodb.com" y={0} angleOffset={4.1} />
          </Canvas>
        </div>

        <div className="text-center mt-12 text-indigo-300">
          <p className="text-md md:text-lg max-w-2xl mx-auto">
            These dynamic tools orbit the core of your learning universe — get hands-on and master them as you build your intergalactic portfolio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechLogos3DSection;
