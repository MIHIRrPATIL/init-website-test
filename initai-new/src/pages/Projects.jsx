import { lazy, Suspense } from 'react';
import FinalNavbar from '@/components/FinalNavbar';
import FinalFooter from '@/components/FinalFooter';

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#03071e] text-white">
      <FinalNavbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <div key={project} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all">
              <h2 className="text-xl font-semibold mb-3">Project {project}</h2>
              <p className="text-gray-300 mb-4">
                Cutting-edge AI/ML solution solving real-world problems with innovative technology approaches.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">AI</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">ML</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Python</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <FinalFooter />
    </div>
  );
}