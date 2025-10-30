import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, Star } from 'lucide-react';
import { Environment, Float, PerspectiveCamera, Text } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidEther from './LiquidEther'; // Corrected import statement

gsap.registerPlugin(ScrollTrigger);

// Trophy model component for 3D scene
function TrophyModel({ achievement, index, active, total }) {
  const group = useRef();
  const angle = (index / total) * Math.PI * 2;
  const radius = 8;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  useEffect(() => {
    if (group.current) {
      // Animate position when active state changes
      gsap.to(group.current.position, {
        x: active ? 0 : x,
        z: active ? 0 : z,
        y: active ? 1 : 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.8)"
      });
      
      // Animate scale when active state changes
      gsap.to(group.current.scale, {
        x: active ? 1.5 : 1,
        y: active ? 1.5 : 1,
        z: active ? 1.5 : 1,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }
  }, [active, x, z]);
  
  // Get color based on category
  const getColor = (category) => {
    switch (category.toLowerCase()) {
      case 'award':
        return '#9333ea'; // purple-600
      case 'recognition':
        return '#6366f1'; // indigo-500
      case 'competition':
        return '#8b5cf6'; // violet-500
      case 'publication':
        return '#a855f7'; // purple-500
      case 'partnership':
        return '#7c3aed'; // violet-600
      case 'milestone':
        return '#4f46e5'; // indigo-600
      case 'funding':
        return '#6d28d9'; // violet-700
      default:
        return '#8b5cf6'; // violet-500
    }
  };
  
  return (
    <group 
      ref={group} 
      position={[x, 0, z]} 
      rotation={[0, -angle, 0]}
    >
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} enabled={active}>
        {/* Base */}
        <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
          <meshStandardMaterial 
            color={getColor(achievement.category)} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
        
        {/* Stem */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
          <meshStandardMaterial 
            color={getColor(achievement.category)} 
            metalness={0.7} 
            roughness={0.3} 
          />
        </mesh>
        
        {/* Cup */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.3, 1.5, 32]} />
          <meshStandardMaterial 
            color={getColor(achievement.category)} 
            metalness={0.9} 
            roughness={0.1} 
          />
        </mesh>
        
        {/* Top sphere */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color="#fcd34d" 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#fcd34d"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Year text */}
        <Text
          position={[0, -2, 0]}
          rotation={[0, Math.PI / 2 + angle, 0]}
          fontSize={0.5}
          color="white"
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          {achievement.year}
        </Text>
        
        {/* Particles around active trophy */}
        {active && [
          ...Array(8).fill().map((_, i) => {
            const particleAngle = (i / 8) * Math.PI * 2;
            const particleRadius = 2;
            return (
              <Float 
                key={i}
                speed={3} 
                rotationIntensity={2} 
                floatIntensity={2}
                position={[
                  Math.sin(particleAngle) * particleRadius,
                  Math.sin(i) * 1.5,
                  Math.cos(particleAngle) * particleRadius
                ]}
              >
                <mesh>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial 
                    color={i % 2 === 0 ? '#8b5cf6' : '#6366f1'}
                    emissive={i % 2 === 0 ? '#8b5cf6' : '#6366f1'}
                    emissiveIntensity={0.8}
                    toneMapped={false}
                  />
                </mesh>
              </Float>
            );
          })
        ]}
      </Float>
    </group>
  );
}

// 3D Scene component
function AchievementScene({ achievements, currentIndex }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      {/* Trophy models */}
      {achievements.map((achievement, index) => (
        <TrophyModel 
          key={achievement.id}
          achievement={achievement}
          index={index}
          active={index === currentIndex}
          total={achievements.length}
        />
      ))}
      
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={50} />
    </>
  );
}

const AchievementCarousel = ({ achievements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef(null);
  const currentAchievement = achievements[currentIndex];
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay, achievements.length]);
  
  // Pause autoplay when user interacts
  const handleUserInteraction = () => {
    setAutoplay(false);
    // Resume autoplay after 30 seconds of inactivity
    setTimeout(() => setAutoplay(true), 30000);
  };
  
  // Animate content when index changes
  useEffect(() => {
    const detailElements = document.querySelectorAll('.achievement-detail-animate');
    
    gsap.fromTo(
      detailElements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, [currentIndex]);
  
  // Card animation variants
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  };
  
  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'award':
        return <Award className="h-6 w-6 text-purple-400" />;
      case 'recognition':
        return <Star className="h-6 w-6 text-indigo-400" />;
      default:
        return <Award className="h-6 w-6 text-purple-400" />;
    }
  };
  
  return (
    <div className="relative h-[90vh] w-full overflow-hidden" ref={containerRef}>
      {/* 3D Scene */}
      <div className="absolute inset-0">
        {/* Background Ether effect */}
        <LiquidEther baseColor="#4c1d95" midColor="#6d28d9" tipColor="#8b5cf6" />
        <Canvas shadows>
          <AchievementScene 
            achievements={achievements} 
            currentIndex={currentIndex} 
          />
        </Canvas>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="flex space-x-4 animate-scroll-left-slow whitespace-nowrap py-4">
          {Array(10).fill().map((_, i) => (
            <span key={i} className="text-4xl font-bold text-purple-300/10">EXCELLENCE</span>
          ))}
        </div>
        
        <div className="flex space-x-8 animate-scroll-right-slow whitespace-nowrap py-4">
          {Array(8).fill().map((_, i) => (
            <span key={i} className="text-4xl font-bold text-indigo-300/10">INNOVATION</span>
          ))}
        </div>
        
        <div className="flex space-x-6 animate-scroll-left-ultra-slow whitespace-nowrap py-4">
          {Array(12).fill().map((_, i) => (
            <span key={i} className="text-4xl font-bold text-purple-300/10">RECOGNITION</span>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        className="absolute left-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
        onClick={() => {
          prevSlide();
          handleUserInteraction();
        }}
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>
      
      <button 
        className="absolute right-10 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
        onClick={() => {
          nextSlide();
          handleUserInteraction();
        }}
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </button>
      
      {/* Achievement details panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="mx-auto mb-10 max-w-3xl overflow-hidden rounded-xl bg-black/30 backdrop-blur-lg border border-white/10"
          >
            <div className="relative">
              {/* Background image with gradient overlay */}
              <div className="absolute inset-0 opacity-20">
                {currentAchievement.image && (
                  <img 
                    src={currentAchievement.image} 
                    alt={currentAchievement.title} 
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-indigo-900/50"></div>
              </div>
              
              {/* Content */}
              <div className="relative p-8">
                <div className="mb-4 flex items-center justify-between achievement-detail-animate">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(currentAchievement.category)}
                    <span className="rounded-full bg-purple-900/50 px-4 py-1 text-sm font-medium text-purple-200">
                      {currentAchievement.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-300" />
                    <span className="text-lg font-medium text-indigo-300">{currentAchievement.year}</span>
                  </div>
                </div>
                
                <h2 className="mb-6 text-4xl font-bold text-white achievement-detail-animate">
                  {currentAchievement.title}
                </h2>
                
                <p className="mb-6 text-lg leading-relaxed text-gray-200 achievement-detail-animate">
                  {currentAchievement.excerpt}
                </p>
                
                <div className="mb-6 flex flex-wrap gap-2 achievement-detail-animate">
                  {currentAchievement.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-indigo-900/50 px-3 py-1 text-sm text-indigo-200 hover:bg-indigo-800/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {currentAchievement.institution && (
                  <div className="achievement-detail-animate">
                    <span className="text-lg font-medium text-purple-300">@ {currentAchievement.institution}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {achievements.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${index === currentIndex ? 'bg-purple-500 w-6' : 'bg-white/30 hover:bg-white/50'}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              handleUserInteraction();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementCarousel;