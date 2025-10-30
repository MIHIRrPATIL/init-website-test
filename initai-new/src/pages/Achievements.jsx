import React, { useState, useEffect } from 'react';
import FinalNavbar from '../components/FinalNavbar';
import FinalFooter from '../components/FinalFooter';
import ThreeJSHeader from '../components/ThreeJSHeader_Achievements';
import AchievementCarousel from '../components/AchievementCarousel';
import { achievementData } from '../data/achievementsData';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidEther from '../components/LiquidEther';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Animate hero section elements
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7 }
    );
  }, []);
  
  // Filter featured achievements for the carousel
  const featuredAchievements = achievementData.filter(achievement => achievement.featured);
  
  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background LiquidEther - same as in ThreeJSHeader_Achievements */}
      <div className="absolute inset-0 z-0">
        <LiquidEther 
          colors={['#5227FF', '#FF9FFC', '#B19EEF']} 
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>
      
      <div className="relative z-10">
        <FinalNavbar />
        
        {/* Hero Section with 3D Header */}
        <ThreeJSHeader />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="hero-title mb-4 text-center text-5xl font-bold">Our Achievements</h1>
          <p className="hero-subtitle mb-12 text-center text-xl text-gray-300">
            Celebrating our milestones and recognitions in the field of AI and technology
          </p>
          
          {/* Achievement Carousel */}
          <AchievementCarousel achievements={featuredAchievements} />
        </div>
        
        {/* Back to Top Button */}
        {showScrollButton && (
          <button
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-all hover:bg-purple-700"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
        
        <FinalFooter />
      </div>
    </div>
  );
};

export default Achievements;