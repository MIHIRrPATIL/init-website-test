import React, { useState, useEffect, useRef } from 'react';

// --- Data for the feature cards ---
const features = [
  {
    title: "Machine Learning Projects",
    description: "Our team develops cutting-edge ML models with real-world applications in healthcare, finance, and sustainability.",
    imageUrl: "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1000&auto=format&fit=crop",
    bgColor: "backdrop-blur-md bg-black/20 border border-white/10",
    textColor: "text-white"
  },
  {
    title: "AI Research Publications",
    description: "We publish our findings in top-tier conferences and journals, contributing to the academic AI community.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    bgColor: "backdrop-blur-md bg-black/20 border border-white/10",
    textColor: "text-white"
  },
  {
    title: "Hackathons & Competitions",
    description: "We participate in national and international AI competitions, consistently ranking in the top positions.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    bgColor: "backdrop-blur-md bg-black/20 border border-white/10",
    textColor: "text-white"
  },
  {
    title: "Industry Collaborations",
    description: "We partner with tech companies to solve real-world problems using AI and gain practical experience.",
    imageUrl: "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1000&auto=format&fit=crop",
    bgColor: "backdrop-blur-md bg-black/20 border border-white/10",
    textColor: "text-white",
    companies: ["Google", "Amazon", "OpenAI", "Meta"]
  }
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Update state when the element's intersection status changes.
      setInView(entry.isIntersecting);
    }, {
      root: null, // observing intersections relative to the viewport
      rootMargin: '0px',
      threshold: 0.1, // 10% of the item must be visible to trigger the callback
    });

    observer.observe(element);

    // Cleanup function to disconnect the observer when the component unmounts.
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};


// --- Header Component ---
const AnimatedHeader = () => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();

    return (
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2
          ref={headerRef}
          className={`text-4xl md:text-5xl font-bold transition-all duration-700 ease-out text-white dark:text-white ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transformStyle: 'preserve-3d' }}>
            Uncover Insights, Expose Nothing
        </h2>
        <p
          ref={pRef}
          className={`text-lg text-gray-600 dark:text-slate-300 mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transformStyle: 'preserve-3d' }}>
            We aim to make on-device AI friction-free and production-ready
        </p>
      </div>
    );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection() {
  return (
    <div className="bg-[#03071e] dark:bg-white font-sans relative z-0">
      {/* The padding-global and container-large classes from your CSS are replicated here */}
      <div className="px-[5%]">
        <div className="max-w-[90rem] mx-auto relative">
          {/* The main section for the features */}
          <section className="py-12 md:py-16 flex flex-col items-center">
            
            <AnimatedHeader />

            {/* The container for the sticky cards */}
            <div className="w-full relative">
              {features.map((feature, index) => (
                <div
                  key={index}
                  // The sticky class makes the card stick to the top of the container.
                  className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 p-10 md:p-16 rounded-3xl mb-12 sticky after:content-[''] after:absolute after:inset-0 after:bg-inherit after:rounded-3xl after:opacity-100 after:-z-10`}
                  // All cards will stick at the same position, creating the stacking effect.
                  style={{ top: '150px' }}>
                  {/* Card Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className={feature.textColor}>{feature.description}</p>
                    {feature.companies && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {feature.companies.map((company) => (
                          <span key={company} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
                            {company}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Image */}
                  <div className="image-wrapper mt-8 md:mt-0">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                      // Simple fallback in case an image fails to load
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StickyFeatureSection;