import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import React from "../quizpics/react.png";
import node from "../quizpics/node.png";
import js from "../quizpics/js.png";    
import git from "../quizpics/git.png";
import mongo from "../quizpics/mongo.png";

const LogoSphere = ({ textureUrl, position = [0, 0, 0], scale = 1 }) => {
  const texture = useTexture(textureUrl);
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const TechLogos3DSection = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-[#f0f4ff] to-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Technologies that Power <span className="text-blue-600">CodeMultiVerse</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A constellation of modern tools and languages forming the backbone of every developer’s journey.
          </p>
        </div>

        <div className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-xl">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 2, 1]} intensity={1} />
            <Stars radius={100} depth={40} count={3000} factor={4} fade speed={2} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />

            <LogoSphere textureUrl={React} position={[-4, 1, 0]} scale={1.1} />
            <LogoSphere textureUrl={node} position={[3, -1.5, 0]} scale={1.2} />
            <LogoSphere textureUrl={js} position={[-1.5, -2.5, 1]} scale={1.2} />
            <LogoSphere textureUrl={git} position={[1.5, 2.2, -1]} scale={1} />
            <LogoSphere textureUrl={mongo} position={[0, 0, 2]} scale={1.1} />
          </Canvas>
        </div>

        <div className="text-center mt-12">
          <p className="text-md md:text-lg text-gray-700 max-w-2xl mx-auto">
            These dynamic tools orbit the core of your learning universe — get hands-on and master them as you build your intergalactic portfolio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechLogos3DSection;
