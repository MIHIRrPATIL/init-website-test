// pages/projects.jsx
'use client';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { getProjectsFromMarkdown } from '@/utils/projects';
import projectsMarkdown from '@/data/projects_22_to_24.md?raw';
import FinalNavbar from '@/components/FinalNavbar';
import FinalFooter from '@/components/FinalFooter';

export default function ProjectsPage() {
  // Convert markdown to products array
  const products = getProjectsFromMarkdown(projectsMarkdown);
  
  // Add rowType to each product
  const enhancedProducts = products.map((product, index) => ({
    ...product,
    rowType: index < 5 ? 'first' : index < 10 ? 'second' : 'third'
  }));
  
  return (
    <div className="relative bg-[#03071e] text-white">
      <FinalNavbar/>
      <HeroParallax products={enhancedProducts} />
      <FinalFooter/>
    </div>
  );
}