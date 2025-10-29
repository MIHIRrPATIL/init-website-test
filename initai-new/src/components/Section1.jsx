import React from 'react';
import { motion } from 'framer-motion';

export default function PortfolioSection() {
  return (
    <motion.section 
      className="py-20 px-4 sm:px-8 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-gray-500 text-xs tracking-[0.2em] uppercase font-medium">Our Portfolio</span>
            <div className="w-10 h-[1px] bg-gray-600"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-white">Our Past </span>
            <span className="text-red-400">Work</span>
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Card 1 - Resolution */}
          <motion.div 
            className="bg-red-500 rounded-[120px] aspect-[0.75] p-12 flex flex-col justify-between items-center text-center relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              {/* Triangle Icon */}
              <motion.div 
                className="mb-12 mt-8"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  <defs>
                    <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#1f2937', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#374151', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <path d="M50 25 L75 70 L25 70 Z" fill="url(#triangleGrad)" />
                  <path d="M50 25 L75 70 L50 52 Z" fill="#111827" opacity="0.4" />
                </svg>
              </motion.div>
              
              <h3 className="text-[10px] font-bold tracking-[0.25em] mb-6 text-white uppercase">
                RESOLUTION
              </h3>
              <p className="text-xl font-bold leading-tight text-white px-2">
                Our Experts Deliver All<br />Solutions
              </p>
            </div>
            
            <motion.div 
              className="mt-auto pb-4"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Card 2 - Reputable */}
          <motion.div 
            className="bg-white rounded-[120px] aspect-[0.75] p-12 flex flex-col justify-between items-center text-center relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              {/* Cube Icon */}
              <motion.div 
                className="mb-12 mt-8"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  <defs>
                    <linearGradient id="cubeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#4b5563', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#6b7280', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  {/* Back face */}
                  <path d="M50 30 L70 42 L70 65 L50 77 L30 65 L30 42 Z" fill="#374151" />
                  {/* Top face */}
                  <path d="M50 30 L70 42 L50 54 L30 42 Z" fill="#4b5563" />
                  {/* Right face */}
                  <path d="M50 54 L70 42 L70 65 L50 77 Z" fill="#1f2937" />
                </svg>
              </motion.div>
              
              <h3 className="text-[10px] font-bold tracking-[0.25em] mb-6 text-gray-800 uppercase">
                REPUTABLE
              </h3>
              <p className="text-xl font-bold leading-tight text-black px-2">
                Ideate, Innovate &<br />Publish Research Papers
              </p>
            </div>
            
            <motion.div 
              className="mt-auto pb-4"
              whileHover={{ x: 5, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Card 3 - Assistance */}
          <motion.div 
            className="bg-white rounded-[120px] aspect-[0.75] p-12 flex flex-col justify-between items-center text-center relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              {/* Phone/Curve Icon */}
              <motion.div 
                className="mb-12 mt-8"
                whileHover={{ scale: 1.1, rotate: 15 }}
                transition={{ duration: 0.4 }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  <path 
                    d="M45 30 Q48 27 52 28 Q56 29 58 33 Q60 37 60 42 Q60 47 58 52 Q56 57 52 60 Q48 63 43 62 Q38 61 35 57 Q32 53 31 48 Q30 43 31 38 Q32 33 35 30 Q38 27 42 28" 
                    fill="none" 
                    stroke="#374151" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M42 32 Q45 30 48 31 Q51 32 53 35 Q55 38 55 42 Q55 46 53 50 Q51 54 48 56 Q45 58 41 57 Q37 56 35 52 Q33 48 33 44 Q33 40 35 36 Q37 32 40 31" 
                    fill="#1f2937" 
                    opacity="0.3"
                  />
                </svg>
              </motion.div>
              
              <h3 className="text-[10px] font-bold tracking-[0.25em] mb-6 text-gray-800 uppercase">
                ASSISTANCE
              </h3>
              <p className="text-xl font-bold leading-tight text-black px-2">
                Hands-on seminars<br />on AI - ML
              </p>
            </div>
            
            <motion.div 
              className="mt-auto pb-4"
              whileHover={{ x: 5, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Card 4 - Reach */}
          <motion.div 
            className="bg-white rounded-[120px] aspect-[0.75] p-12 flex flex-col justify-between items-center text-center relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              {/* Wave Icon */}
              <motion.div 
                className="mb-12 mt-8"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                  <path 
                    d="M25 45 Q32 32 40 40 Q48 48 55 40 Q62 32 70 40" 
                    fill="none" 
                    stroke="#374151" 
                    strokeWidth="7" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M25 55 Q32 42 40 50 Q48 58 55 50 Q62 42 70 50" 
                    fill="none" 
                    stroke="#374151" 
                    strokeWidth="7" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              
              <h3 className="text-[10px] font-bold tracking-[0.25em] mb-6 text-gray-800 uppercase">
                REACH - Datathon    
              </h3>
              <p className="text-xl font-bold leading-tight text-black px-2">
                Data to Knowledge<br />300+ students
              </p>
            </div>
            
            <motion.div 
              className="mt-auto pb-4"
              whileHover={{ x: 5, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}