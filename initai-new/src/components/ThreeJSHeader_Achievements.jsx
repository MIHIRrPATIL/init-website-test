import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import LiquidEther from './LiquidEther';

// Achievements-themed 3D Scene Component
function AchievementsScene() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate main group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }

    // Animate main mesh
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Trophy-like structure */}
      <group ref={meshRef}>
        {/* Trophy cup */}
        <Sphere args={[1, 32, 32]} position={[0, 0.5, 0]} scale={[1, 1.2, 1]}>
          <MeshDistortMaterial
            color="#9333ea"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Trophy base */}
        <Box args={[1.5, 0.2, 1.5]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#6d28d9" metalness={0.9} roughness={0.1} />
        </Box>
        
        {/* Trophy stem */}
        <Box args={[0.3, 1, 0.3]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
        </Box>

        {/* Decorative elements */}
        <Torus args={[1.2, 0.05, 16, 100]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#d8b4fe" metalness={0.8} roughness={0.2} />
        </Torus>
        
        {/* Stars around trophy */}
        <Sphere args={[0.2, 16, 16]} position={[1.5, 1, 1]}>
          <meshStandardMaterial color="#f9a8d4" emissive="#f9a8d4" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.15, 16, 16]} position={[-1.5, 0.8, -1]}>
          <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.25, 16, 16]} position={[-1.2, 1.2, 1.2]}>
          <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.18, 16, 16]} position={[1.3, 0.6, -1.3]}>
          <meshStandardMaterial color="#86efac" emissive="#86efac" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </group>
  );
}

// Main Header Component
const ThreeJSHeader_Achievements = () => {
  return (
    <div className="relative w-full h-screen bg-[#03071e] overflow-hidden">
      {/* Background Ether effect with purple theme */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#7c3aed", "#c084fc", "#4f46e5"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/20 rounded-2xl m-36 mx-60 border border-white/10">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
            <pointLight position={[10, -10, 5]} intensity={0.5} color="#c084fc" />
            
            <AchievementsScene />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Environment preset="night" />
          </Canvas>
        </div>
      </div>

      {/* 3 Rows of Achievement-related terms */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {/* Row 1 - Top third with subtle curve */}
        <div
          className="absolute top-[16%] left-0 w-full overflow-hidden"
          style={{ transform: 'perspective(1000px) rotateX(2deg)' }}
        >
          <div className="flex animate-scroll-left-ultra-slow whitespace-nowrap">
            {/* Row 1 - copy 1 */}
            <div className="flex items-center space-x-20">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
            </div>

            {/* Row 1 - copy 2 for seamless loop */}
            <div className="flex items-center space-x-20">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
            </div>
          </div>
        </div>

        {/* Row 2 - Middle third with slight downward curve */}
        <div
          className="absolute top-[50%] left-0 w-full overflow-hidden"
          style={{ transform: 'perspective(1000px) rotateX(-1deg)' }}
        >
          <div className="flex animate-scroll-right-ultra-slow whitespace-nowrap">
            {/* Row 2 - copy 1 */}
            <div className="flex items-center space-x-24">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
            </div>

            {/* Row 2 - copy 2 for seamless loop */}
            <div className="flex items-center space-x-24">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
            </div>
          </div>
        </div>

        {/* Row 3 - Bottom third with upward curve */}
        <div
          className="absolute top-[84%] left-0 w-full overflow-hidden"
          style={{ transform: 'perspective(1000px) rotateX(1deg)' }}
        >
          <div className="flex animate-scroll-left-ultra-slow whitespace-nowrap">
            {/* Row 3 - copy 1 */}
            <div className="flex items-center space-x-28">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
            </div>

            {/* Row 3 - copy 2 for seamless loop */}
            <div className="flex items-center space-x-28">
              <span className="text-white text-4xl font-bold uppercase tracking-wider">AWARDS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">RECOGNITION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">INNOVATION</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">SUCCESS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">MILESTONES</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">HONORS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">ACHIEVEMENTS</span>
              <span className="text-white text-4xl font-bold uppercase tracking-wider">EXCELLENCE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              ACHIEVEMENTS
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 mx-auto rounded-full animate-pulse" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm font-medium mb-2">Explore Our Achievements</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeJSHeader_Achievements;