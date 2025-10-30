// pages/projects.jsx
'use client';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { getProjectsFromMarkdown } from '@/utils/projects';
import projectsMarkdown from '@/data/projects_22_to_24.md?raw';
import FinalNavbar from '@/components/FinalNavbar';
import FinalFooter from '@/components/FinalFooter';
import { useEffect } from 'react';
import LiquidEther from '@/components/LiquidEther';

export default function ProjectsPage() {
  // Convert markdown to products array
  const products = getProjectsFromMarkdown(projectsMarkdown);
  
  // Debug: Log what we got
  useEffect(() => {
    console.log('=== DEBUG INFO ===');
    console.log('Raw markdown length:', projectsMarkdown?.length || 0);
    console.log('Number of projects parsed:', products.length);
    console.log('Projects:', products.map((p, i) => `${i + 1}. ${p.title}`));
    
    // Check for ### headers in raw markdown
    const headerCount = (projectsMarkdown.match(/###/g) || []).length;
    console.log('### headers found in markdown:', headerCount);
    
    // Show first 500 chars of markdown
    console.log('First 500 chars:', projectsMarkdown?.substring(0, 500));
  }, []);
  
  // Add rowType to each product
  const enhancedProducts = products.map((product, index) => ({
    ...product,
    rowType: index < 5 ? 'first' : index < 10 ? 'second' : 'third'
  }));
  
  // Safety check
  if (products.length === 0) {
    return (
      <div className="relative bg-[#03071e] text-white min-h-screen flex items-center justify-center">
        <FinalNavbar/>
        <FinalFooter/>
      </div>
    );
  }
  
  return (
    <div className="relative bg-[#03071e] text-white">
      {/* Liquid Ether Background - Full Page */}
      <div className="fixed inset-0 z-0">
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
      <FinalNavbar/>
      <HeroParallax className="z-50" products={enhancedProducts} />
      <FinalFooter/>
    </div>
  );
}