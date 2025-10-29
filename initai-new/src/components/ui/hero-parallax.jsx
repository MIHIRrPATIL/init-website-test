"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ProgressiveBlur } from "../progressiveBlur";
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from "./animated-modal";
import { LinkPreview } from "./link-preview";

export const HeroParallax = ({ products }) => {
  const rows = [
    products.slice(0, 5),
    products.slice(5, 10),
    products.slice(10, 15),
    products.slice(15, 20)
  ];
  
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  
  const baseX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 500]), springConfig);
  const reverseX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 300]), springConfig);
  
  return (
    <div
      ref={ref}
      className="h-[320vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto"
    >
      <Header />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        {rows.map((row, i) => (
          <div key={i} className="mb-16 w-full">
            <div className="overflow-x-auto scrollbar-hide w-full px-4">
              <motion.div 
                className="flex gap-8 w-max" 
                style={{ x: i % 2 === 0 ? baseX : reverseX }}
              >
                {row.map((product, j) => (
                  <ProductCard 
                    key={product.title}
                    product={product}
                    style={{ translateZ: j % 2 === 0 ? -50 : -25 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product, style }) => {
  const [isHover, setIsHover] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('aspect-[4/3]');
  
  useEffect(() => {
    // Dynamically set aspect ratio based on image dimensions
    const img = new Image();
    img.src = product.thumbnail;
    img.onload = () => {
      setAspectRatio(img.width > img.height ? 'aspect-[4/3]' : 'aspect-[3/4]');
    };
  }, [product.thumbnail]);
  
  return (
    <Modal>
      <ModalTrigger asChild>
        <motion.div
          style={style}
          className={`group/product ${aspectRatio} w-[300px] md:w-[400px] relative shrink-0 cursor-pointer`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <img
              src={product.thumbnail}
              className="object-cover w-full h-full"
              alt={product.title}
              loading="lazy"
            />
          </div>
          
          <ProgressiveBlur
            className="absolute inset-0 h-full w-full"
            blurIntensity={0.8}
            animate={isHover ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.div
            className="absolute inset-0 flex flex-col p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            animate={isHover ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
            <p className="text-sm text-neutral-200 mb-4 line-clamp-3">{product.problemStatement}</p>
            <div className="mt-auto">
              <h3 className="text-sm font-medium text-white mb-1">Team Members:</h3>
              <ul className="text-xs text-neutral-300">
                {product.teamMembers.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </ModalTrigger>
      
      <ModalBody className="fixed inset-0 z-50">
        <ModalContent className="w-full h-full max-w-none bg-white dark:bg-neutral-900 p-4 md:p-8">
          <div className="container mx-auto h-full flex flex-col">
            <div className="grid lg:grid-cols-2 gap-8 flex-grow overflow-y-auto">
              <div className="h-full max-h-[50vh] lg:max-h-none flex items-center justify-center">
                <img
                  src={product.thumbnail}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  alt={product.title}
                />
              </div>
              <div className="overflow-y-auto py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-wrap">{product.problemStatement}</p>
                <div className="mb-8 bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Team Members</h3>
                  <ul className="space-y-2">
                    {product.teamMembers.map((member, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="text-base text-gray-700 dark:text-gray-300">{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <ModalFooter className="py-4 flex justify-center gap-4 md:gap-6 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800">
              <LinkPreview 
                url={product.link} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-lg md:text-xl font-semibold transition-all"
              >
                Live Link
              </LinkPreview>
              {product.paperLink && (
                <LinkPreview 
                  url={product.paperLink} 
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-lg md:text-xl font-semibold transition-all"
                >
                  Paper Link
                </LinkPreview>
              )}
            </ModalFooter>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Our Projects <br />
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Explore our innovative projects developed by talented teams.
      </p>
    </div>
  );
};