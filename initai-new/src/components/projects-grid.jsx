import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from '@/components/progressiveBlur';

const ProjectsGrid = () => {
  const projects = [
    {
      title: "AI Research Platform",
      description: "Developed a cutting-edge research platform for machine learning experiments",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
      tags: ["Python", "TensorFlow"],
      size: "large",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black"
    },
    {
      title: "Model Deployment",
      description: "Automated pipeline for deploying ML models to production",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      tags: ["Docker", "Kubernetes"],
      size: "medium",
      bgColor: "bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-300",
      textColor: "text-gray-800"
    },
    {
      title: "Data Visualization",
      description: "Interactive dashboards for exploring complex datasets",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
      tags: ["D3.js", "React"],
      size: "small",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black"
    },
    {
      title: "NN Optimization",
      description: "Optimized deep learning models for edge devices",
      imageUrl: "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1000&auto=format&fit=crop",
      tags: ["PyTorch", "ONNX"],
      size: "large",
      bgColor: "bg-gray-50 dark:bg-gray-50 border border-gray-200 dark:border-gray-300",
      textColor: "text-gray-800"
    },
    {
      title: "ML Pipeline",
      description: "End-to-end training system for machine learning",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
      tags: ["Airflow", "MLflow"],
      size: "small",
      bgColor: "bg-white dark:bg-white border border-gray-100 dark:border-gray-200",
      textColor: "text-black"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 auto-rows-[250px]">
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
              className="pointer-events-none absolute bottom-0 left-0 h-[100%] w-full"
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
                <h3 className={`text-lg group-hover:text-2xl font-bold ${project.textColor} group-hover:text-white transition-all duration-300`}>
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
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsGrid;
