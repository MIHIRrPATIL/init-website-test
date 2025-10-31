import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidEther from './LiquidEther';

gsap.registerPlugin(ScrollTrigger);

const InfiniteScrollCards = ({ achievements }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !wrapperRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const cardWidth = container.offsetWidth;
    const totalCards = achievements.length;
    const totalWidth = cardWidth * totalCards;

    // Create a single-pass horizontal scroll tied to vertical scroll - FASTER SCROLLING
    const horizontalTween = gsap.to(wrapperRef.current, {
      x: -(totalWidth - cardWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth * 0.7}`, // Reduced by 30% for faster scrolling
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(totalCards - 1, Math.floor(progress * totalCards));
          setCurrentCard(index);
        },
      },
    });

    // Resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      horizontalTween?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [achievements]);

  // Get color based on category
  const getCategoryColor = (category) => {
    const colors = {
      'hackathon': 'from-purple-600 via-purple-700 to-purple-900',
      'competition': 'from-indigo-600 via-indigo-700 to-indigo-900',
      'publication': 'from-pink-600 via-pink-700 to-pink-900',
      'award': 'from-blue-600 via-blue-700 to-blue-900',
      'recognition': 'from-cyan-600 via-cyan-700 to-cyan-900',
      'milestone': 'from-violet-600 via-violet-700 to-violet-900',
      'funding': 'from-green-600 via-green-700 to-green-900',
    };
    return colors[category?.toLowerCase()] || 'from-purple-600 via-purple-700 to-purple-900';
  };

  const getCategoryBorder = (category) => {
    const colors = {
      'hackathon': 'border-purple-400/50',
      'competition': 'border-indigo-400/50',
      'publication': 'border-pink-400/50',
      'award': 'border-blue-400/50',
      'recognition': 'border-cyan-400/50',
      'milestone': 'border-violet-400/50',
      'funding': 'border-green-400/50',
    };
    return colors[category?.toLowerCase()] || 'border-purple-400/50';
  };

  // Format date from "MM/DD/YY" to more readable format with error handling
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    
    try {
      const [month, day, year] = dateString.split('/');
      if (!month || !day || !year) return dateString; // Return original if format is wrong
      
      const date = new Date(`20${year}`, month - 1, day);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid date
      
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.warn('Error formatting date:', error);
      return dateString; // Return original string if any error occurs
    }
  };

  // Safe data access helper functions
  const getCompetitionType = (achievement) => {
    return achievement['Competition Type'] || achievement.CompetitionType || 'Hackathon';
  };

  const getTeamMembers = (achievement) => {
    return achievement.TeamMembersName || achievement.teamMembers || [];
  };

  const getDescription = (achievement) => {
    return achievement.Description || achievement.description || 'No description available.';
  };

  const getPosition = (achievement) => {
    return achievement.Position || achievement.position || 'Participant';
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden bg-[#03071e]"
    >
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

      <div 
        ref={containerRef}
        className={`relative w-full h-screen cursor-grab ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} z-10`}
        style={{ touchAction: 'none' }}
      >
        <div 
          ref={wrapperRef}
          className="absolute inset-0 flex"
        >
          {/* Single pass achievements for one horizontal cycle */}
          {achievements.map((achievement, index) => (
            <div
              key={`achievement-${achievement._id || achievement.id || index}-${index}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-4 md:px-8"
            >
              {/* SMALLER ACHIEVEMENT CARD */}
              <div className="relative w-full max-w-4xl h-[70vh] rounded-3xl overflow-hidden group border-2 border-white/10 backdrop-blur-xl">
                <div
  className="absolute inset-0 bg-center bg-cover"
  style={{
    backgroundImage: achievement.image ? `url(${achievement.image})` : 'none',
    backgroundColor: 'rgba(0,0,0,0.4)', // fallback dark overlay
  }}
>
  {/* Subtle overlay for readability */}
<div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"></div>
</div>


                {/* Animated Border on Hover */}
                <div className={`absolute inset-0 border-2 ${getCategoryBorder(getCompetitionType(achievement))} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Content */}
               <div className="relative h-full flex flex-col p-6 md:p-8 text-white font-bold tracking-wide z-10 overflow-y-auto text-shadow-lg">
   {/* Category Badge and Year */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-wider border border-white/20">
                      {getCompetitionType(achievement)?.toUpperCase() || 'HACKATHON'}
                    </span>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xl font-black text-white">
                        {achievement.Year || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Competition Name */}
                  <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
                    {achievement.title || 'Competition'}
                  </h2>




               


                  {/* Team Members */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-white/90">Team Members:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getTeamMembers(achievement).map((member, memberIndex) => (
                        <span
                          key={memberIndex}
                          className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium border border-white/10"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1 overflow-y-auto">
  <p className="text-base md:text-lg text-white/90 leading-relaxed font-semibold text-shadow-lg">
    {getDescription(achievement)}
  </p>
</div>


                  {/* Additional Info (Awards/Prizes if mentioned) */}
                  {getDescription(achievement).toLowerCase().includes('prize') || 
                   getDescription(achievement).toLowerCase().includes('award') || 
                   getDescription(achievement).toLowerCase().includes('win') ? (
                    <div className="mt-4 p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-yellow-300">Achievement Highlighted</span>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-white/70 backdrop-blur-md bg-black/20 px-3 py-1 rounded-full">
              {isDragging ? 'Dragging...' : 'Scroll or Drag'}
            </span>
            <div className="flex gap-1">
              {achievements.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 backdrop-blur-md ${
                    index === currentCard 
                      ? 'w-8 bg-white shadow-lg shadow-white/50' 
                      : 'w-1 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group border border-white/10"
          onClick={() => {
            const newIndex = (currentCard - 1 + achievements.length) % achievements.length;
            setCurrentCard(newIndex);
          }}
        >
          <svg className="w-4 h-4 text-white transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center group border border-white/10"
          onClick={() => {
            const newIndex = (currentCard + 1) % achievements.length;
            setCurrentCard(newIndex);
          }}
        >
          <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* CSS for Float Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  );
};

export default InfiniteScrollCards;