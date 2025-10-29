import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FloatingElements = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const elements = elementsRef.current;
    
    elements.forEach((element, index) => {
      if (element) {
        // Random floating animation
        gsap.to(element, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-10, 10)",
          duration: "random(4, 8)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });

        // Pulsing scale animation
        gsap.to(element, {
          scale: "random(0.8, 1.2)",
          duration: "random(2, 4)",
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating geometric shapes */}
      <div
        ref={el => elementsRef.current[0] = el}
        className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm"
      />
      <div
        ref={el => elementsRef.current[1] = el}
        className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-sm"
      />
      <div
        ref={el => elementsRef.current[2] = el}
        className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-sm"
      />
      <div
        ref={el => elementsRef.current[3] = el}
        className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-full blur-sm"
      />
      <div
        ref={el => elementsRef.current[4] = el}
        className="absolute top-60 left-1/2 w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-sm"
      />
      <div
        ref={el => elementsRef.current[5] = el}
        className="absolute bottom-60 right-1/3 w-18 h-18 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-sm"
      />
      
      {/* Floating lines */}
      <div
        ref={el => elementsRef.current[6] = el}
        className="absolute top-1/3 left-10 w-32 h-1 bg-gradient-to-r from-blue-400/30 to-transparent rotate-45"
      />
      <div
        ref={el => elementsRef.current[7] = el}
        className="absolute bottom-1/3 right-10 w-24 h-1 bg-gradient-to-r from-purple-400/30 to-transparent -rotate-45"
      />
    </div>
  );
};

export default FloatingElements;
