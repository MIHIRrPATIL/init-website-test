import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from '@/components/progressiveBlur';
import { Button } from '@/components/ui/button';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FaGithub } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';

const ProjectsGrid = () => {
  const projects = [
    {
      title: "Violent Action Recognition",
      description: "Detecting violent behavior in videos using 3DCNN, ConvLSTM, and LRCN models. Compares ML approaches for public safety scenarios.",
      imageUrl: "https://picsum.photos/600/400?random=1",
      tags: ["Video Analytics", "Violence Detection", "Deep Learning"],
      size: "large",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black",
      link: "https://github.com/your-repo/violent-action-recognition",
      paperLink: "https://arxiv.org/abs/2301.00001"
    },
    {
      title: "Fleet Analysis Using FedML",
      description: "Federated ML risk-scoring for drivers, vehicles, routes & companies. Ensures privacy in transportation data analysis.",
      imageUrl: "https://picsum.photos/600/400?random=2",
      tags: ["Federated Learning", "Fleet Analytics", "Risk Prediction"],
      size: "medium",
      bgColor: "bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-300",
      textColor: "text-gray-800",
      link: "https://github.com/your-repo/fleet-analysis-fedml",
      paperLink: "https://arxiv.org/abs/2302.00002"
    },
    {
      title: "Contextual Advertising in Live Streaming Videos",
      description: "AI to place non-intrusive, content-relevant ads in live streams using neural networks and NLP techniques.",
      imageUrl: "https://picsum.photos/600/400?random=3",
      tags: ["Advertising", "NLP", "Live Streaming", "Deep Learning"],
      size: "small",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black",
      link: "https://github.com/your-repo/contextual-advertising",
      paperLink: "https://arxiv.org/abs/2303.00003"
    },
    {
      title: "Content Based Research Paper Recommendation",
      description: "Method to recommend research papers using content features, titles, and abstracts. Enhances lit review searches.",
      imageUrl: "https://picsum.photos/600/400?random=4",
      tags: ["NLP", "Recommendation", "Academic Search"],
      size: "large",
      bgColor: "bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-300",
      textColor: "text-gray-800",
      link: "https://github.com/your-repo/research-paper-recommendation",
      paperLink: "https://arxiv.org/abs/2304.00004"
    },
    {
      title: "Quality Inspection in Pharma and Metal Industries Using Computer Vision",
      description: "YOLOv8 & CV for defect detection in pills/metal. Improves efficiency and reliability for quality inspection.",
      imageUrl: "https://picsum.photos/600/400?random=5",
      tags: ["Computer Vision", "YOLOv8", "Quality Inspection"],
      size: "small",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black",
      link: "https://github.com/your-repo/quality-inspection",
      paperLink: "https://arxiv.org/abs/2305.00005"
    }
  ];

  const getSizeClass = (size) => {
    switch(size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'medium': return 'md:col-span-1 md:row-span-2';
      default: return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="container py-12 bg-[#03071e] dark:bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[250px] lg:auto-rows-[300px]">
        {projects.map((project, index) => {
          const [isHover, setIsHover] = useState(false);
          return (
          <motion.div 
            key={index}
            className={`group relative rounded-xl overflow-hidden ${getSizeClass(project.size)} ${project.bgColor}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <ProgressiveBlur
              className="pointer-events-none absolute bottom-0 left-0 h-full w-full"
              blurIntensity={0.6}
              animate={isHover ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end transition-all duration-500">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className={`text-lg md:text-xl group-hover:text-xl md:group-hover:text-2xl font-bold ${project.textColor} group-hover:text-white transition-all duration-300`}>
                  {project.title}
                </h3>
                <p className={`text-transparent group-hover:text-gray-300 text-sm group-hover:text-base mt-1 transition-all duration-300 delay-100 ${project.textColor}`}>
                  {project.description}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-black/50 text-white rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Muted action buttons */}
                <div className="flex gap-2 my-2">
                  {project.link && project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="secondary" className="rounded-full px-3 flex items-center gap-1 bg-white/50 backdrop-blur-md border border-white/20 text-neutral-800 shadow-sm hover:bg-white/50 active:scale-95 transition-all">
                        <FaGithub className="text-lg" /> <span>GitHub</span>
                      </Button>
                    </a>
                  )}
                  {project.paperLink && (
                    <a href={project.paperLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="rounded-full px-3 flex items-center gap-1 bg-white/50 backdrop-blur-md border border-white/20 text-neutral-800 shadow-sm hover:bg-white/50 active:scale-95 transition-all">
                        <FaFileAlt className="text-md" /> <span>Paper</span>
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <a href="/projects" className="inline-block">
          <GetStartedButton label="View All Projects"/>
        </a>
      </div>
    </div>
  );
};

export default ProjectsGrid;
