import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Calendar, Award, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AchievementCard = ({ achievement, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  // GSAP scroll animation
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1,
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePosition({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="group block cursor-pointer"
    >
      <div
        ref={cardRef}
        className="achievement-card group relative h-[420px] w-full max-w-sm mx-auto rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        role="article"
        aria-labelledby={`achievement-title-${achievement.id}`}
      >
        {/* Card container with enhanced glass morphism effect */}
        <div 
          className="relative h-full bg-transparent rounded-3xl overflow-hidden transition-all duration-500 border border-white/20"
          style={{
            boxShadow: isHovered 
              ? '0 0 0 2px #6d28d9, 0 4px 20px -1px rgba(109, 40, 217, 0.4)'
              : '0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          
          {/* Image section - full height */}
          <div className="relative h-full overflow-hidden">
            {/* Featured badge */}
            {achievement.featured && (
              <div className="absolute top-4 left-4 z-30 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </div>
            )}

            {/* Category badge */}
            <div 
              className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-semibold transform transition-all duration-300"
              style={{
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.9)',
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {achievement.category}
            </div>

            {/* Year badge */}
            <div 
              className="absolute bottom-4 right-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium transform transition-all duration-300 delay-75 shadow-lg"
              style={{
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <Calendar className="w-3 h-3" />
              <span>{achievement.year}</span>
            </div>

            {/* Image with parallax effect */}
            <div 
              ref={imageRef}
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Enhanced gradient overlay with more depth */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0.85,
              }}
            />
            
            {/* Title overlay with institution */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h2 
                id={`achievement-title-${achievement.id}`}
                className="text-lg text-center font-bold text-white line-clamp-2 text-shadow-sm mb-2"
              >
                {achievement.title}
              </h2>
              
              {/* Institution with icon */}
              <div className="flex items-center justify-center gap-1 mb-3">
                <Award className="w-3 h-3 text-purple-300" />
                <span className="text-sm text-purple-200">{achievement.institution}</span>
              </div>
              
              {/* Tags with enhanced styling */}
              {achievement.tags && achievement.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 opacity-100 transition-opacity duration-500">
                  {achievement.tags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-white/10 text-white text-xs rounded-full border border-purple-500/30 hover:bg-purple-500/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* View Details button with enhanced styling */}
            <div 
              ref={buttonRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500"
              style={{
                transform: isHovered 
                  ? 'translate(-50%, -50%) scale(1.05)' 
                  : 'translate(-50%, -50%) scale(0.9)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <button className="group/btn flex w-max items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/80 to-indigo-600/80 backdrop-blur-md border border-white/30 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg">
                <span className="text-sm">View Details</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;