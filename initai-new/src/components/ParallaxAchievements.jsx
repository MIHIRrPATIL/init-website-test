import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxAchievements = ({ achievements }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  useEffect(() => {
    // Create staggered entrance animations
    const sections = gsap.utils.toArray('.achievement-section');
    
    sections.forEach((section, i) => {
      const elements = section.querySelectorAll('.animate-in');
      
      gsap.fromTo(
        elements,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [achievements]);
  
  return (
    <div ref={containerRef} className="relative">
      {achievements.map((achievement, index) => {
        // Calculate parallax speeds based on index
        const isEven = index % 2 === 0;
        const bgY = useTransform(scrollYProgress, [0, 1], ['0%', `${(index + 1) * 10}%`]);
        const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${(index + 1) * 5}%`]);
        
        return (
          <section 
            key={achievement.id}
            className={`achievement-section relative min-h-screen w-full flex items-center ${isEven ? 'justify-end' : 'justify-start'}`}
          >
            {/* Parallax background */}
            <motion.div 
              className="absolute inset-0 z-0 overflow-hidden"
              style={{ y: bgY }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${achievement.image})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 to-purple-950/90"></div>
            </motion.div>
            
            {/* Content */}
            <motion.div 
              className={`relative z-10 w-full max-w-2xl ${isEven ? 'mr-20' : 'ml-20'}`}
              style={{ y: contentY }}
            >
              <div className="rounded-xl bg-black/30 p-10 backdrop-blur-lg">
                <div className="mb-4 animate-in">
                  <span className="inline-block rounded-full bg-purple-700 px-4 py-1 text-sm font-medium text-white">
                    {achievement.year}
                  </span>
                </div>
                
                <h2 className="mb-6 text-4xl font-bold text-white animate-in">
                  {achievement.title}
                </h2>
                
                <p className="mb-8 text-xl leading-relaxed text-gray-300 animate-in">
                  {achievement.excerpt}
                </p>
                
                <div className="mb-6 flex flex-wrap gap-2 animate-in">
                  {achievement.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-indigo-900/50 px-3 py-1 text-sm text-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {achievement.institution && (
                  <div className="animate-in">
                    <span className="text-lg font-medium text-purple-300">@ {achievement.institution}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        );
      })}
    </div>
  );
};

export default ParallaxAchievements;