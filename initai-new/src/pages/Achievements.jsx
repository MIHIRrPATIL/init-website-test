import React, { useState, useEffect } from "react";
import FinalNavbar from "../components/FinalNavbar";
import FinalFooter from "../components/FinalFooter";
import ThreeJSHeader from "../components/ThreeJSHeader_Achievements";
import InfiniteScrollCards from "../components/InfiniteScrollCards";
import { achievementData } from "../data/achievementsData";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we're on the client-side before rendering the carousel
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle scroll for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations for hero section
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanup = () => {
      gsap.killTweensOf('.hero-title, .hero-subtitle');
    };

    const timer = setTimeout(() => {
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }

      if (heroSubtitle) {
        gsap.fromTo(
          heroSubtitle,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: 0.6, 
            ease: 'power3.out' 
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  // Process achievement data to ensure proper image paths
  const processedAchievements = achievementData.map(item => ({
    ...item,
    image: item.image.startsWith('/') ? item.image : `/${item.image}`
  }));

  return (
    <div className="min-h-screen bg-[#03071e] text-white relative">
      <FinalNavbar />
      <ThreeJSHeader />
      
      <main className="relative z-10">
        {/* Hero Section - This stays in normal flow */}
        <div className="container mx-auto px-4 py-16">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4 text-center">
            Our Achievements
          </h1>
          <p className="hero-subtitle text-xl text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Celebrating our milestones and successes in research and innovation
          </p>
        </div>

        <InfiniteScrollCards achievements={achievementData} />

    
      </main>
      
      <FinalFooter />

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
          style={{
            width: '48px',
            height: '48px',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999
          }}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Achievements;
