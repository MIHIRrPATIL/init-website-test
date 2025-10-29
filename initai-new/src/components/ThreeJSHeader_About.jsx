import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import LiquidEther from './LiquidEther';

// Simplified 3D Research-themed Scene Component
function ResearchScene() {
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
      {/* Main research molecule-like structure - keeping only the center */}
      <group ref={meshRef}>
        {/* Central sphere */}
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#ff6b35"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Orbiting smaller spheres */}
        <Sphere args={[0.3, 16, 16]} position={[2, 0, 0]}>
          <meshStandardMaterial color="#4f46e5" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[-2, 0, 0]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#10b981" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[0, -2, 0]}>
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[0, 0, 2]}>
          <meshStandardMaterial color="#ef4444" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[0, 0, -2]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.9} roughness={0.1} />
        </Sphere>

        {/* Connecting torus rings */}
        <Torus args={[2.5, 0.1, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </Torus>
        <Torus args={[2.5, 0.1, 8, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </Torus>
        <Torus args={[2.5, 0.1, 8, 100]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </Torus>
      </group>
    </group>
  );
}

// Main Header Component
const ThreeJSHeader_Team = () => {
  return (
    <div className="relative w-full h-screen bg-[#03071e] overflow-hidden">
      {/* Background Ether effect */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
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
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
            <pointLight position={[10, -10, 5]} intensity={0.5} color="#ec4899" />
            
            <ResearchScene />
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

      {/* 3 Rows Evenly Spaced Across Complete Viewport */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {/* Row 1 - Top third with subtle curve */}
        <div className="absolute top-[16%] left-0 w-full flex animate-scroll-left-ultra-slow" style={{ transform: 'perspective(1000px) rotateX(2deg)' }}>
          <div className="flex items-center space-x-20">
            <span className="text-white text-4xl font-bold uppercase tracking-wider">ARTIFICIAL INTELLIGENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">MACHINE LEARNING</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NLP</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">COMPUTER VISION</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DEEP LEARNING</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NEURAL NETWORKS</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DATA SCIENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">RESEARCH</span>
          </div>
        </div>
        
        {/* Row 2 - Middle third with slight downward curve */}
        <div className="absolute top-[50%] left-0 w-full flex animate-scroll-left-ultra-slow" style={{ transform: 'perspective(1000px) rotateX(-1deg)' }}>
          <div className="flex items-center space-x-24">
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DEEP LEARNING</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NEURAL NETWORKS</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DATA SCIENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">RESEARCH</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">ARTIFICIAL INTELLIGENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">MACHINE LEARNING</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NLP</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">COMPUTER VISION</span>
          </div>
        </div>
        
        {/* Row 3 - Bottom third with upward curve */}
        <div className="absolute top-[84%] left-0 w-full flex animate-scroll-left-ultra-slow" style={{ transform: 'perspective(1000px) rotateX(1deg)' }}>
          <div className="flex items-center space-x-28">
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NLP</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">COMPUTER VISION</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DEEP LEARNING</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">NEURAL NETWORKS</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">DATA SCIENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">RESEARCH</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">ARTIFICIAL INTELLIGENCE</span>
            <span className="text-white text-4xl font-bold uppercase tracking-wider">MACHINE LEARNING</span>
          </div>
        </div>
      </div>

      {/* Typography overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {/* <div className="backdrop-blur-xl bg-black/20 rounded-2xl p-12 border border-white/10"> */}
          <div className="text-center">
            <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full animate-pulse" />
          </div>
        {/* </div> */}
      </div>

      {/* Scroll indicator
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center text-white/70">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ThreeJSHeader_Team;
