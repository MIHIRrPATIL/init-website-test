import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
  const meshRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Animated mesh gradient
    if (meshRef.current) {
      gsap.to(meshRef.current, {
        backgroundPosition: '200% 200%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
    }

    // Floating particles animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: 'random(-100, 100)',
          x: 'random(-50, 50)',
          rotation: 'random(0, 360)',
          duration: 'random(8, 15)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div
        ref={meshRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)
          `,
          backgroundSize: '400% 400%',
          animation: 'meshMove 20s ease-in-out infinite'
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 30s linear infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes meshMove {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
