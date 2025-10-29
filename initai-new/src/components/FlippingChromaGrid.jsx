import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import './FlippingChromaGrid.css';

export const FlippingChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState({});

  const demo = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg, #10B981, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg, #8B5CF6, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #03071e)',
      socials: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
        { icon: 'twitter', label: 'Twitter', url: 'https://twitter.com/' },
        { icon: 'globe', label: 'Website', url: 'https://example.com/' }
      ]
    }
  ];

  const data = items?.length ? items : demo;

  const handleAnimationStart = () => setIsAnimating(true);
  const handleAnimationComplete = () => setIsAnimating(false);

  const handleCardHover = (index, isHovering) => {
    if (isAnimating) return;
    setHoveredCard(isHovering ? index : null);
    console.log(`Card ${index} ${isHovering ? 'hovered' : 'hover ended'} - ${isHovering ? 'showing back side' : ''}`);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    
    const hoverColor = hoveredCard !== null 
      ? data[hoveredCard]?.borderColor || '#ffffff' 
      : '#ffffff';
    
    rootRef.current.style.setProperty('--cursor-color', hoverColor);
    
    const cards = rootRef.current.querySelectorAll('.chroma-card');
    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (cardRect.left + cardRect.width/2), 2) + 
        Math.pow(e.clientY - (cardRect.top + cardRect.height/2), 2)
      );
      
      const isHovering = distance < 150;
      card.classList.toggle('hover-effect', isHovering);
      
      if(isHovering) {
        const intensity = 1 - (distance / 150);
        card.style.setProperty('--card-color', data[i]?.borderColor || '#ffffff');
        card.style.boxShadow = `0 0 ${15 + intensity * 15}px var(--card-color), 
                               0 0 ${30 + intensity * 30}px var(--card-color)`;
      }
    });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleSocialClick = (url, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Social link clicked:', url);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getSocialIcon = (iconName) => {
    const iconMap = {
      github: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      linkedin: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
      twitter: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.856 1.1 5 5 0 00-8.66 4.56 14.046 14.046 0 01-10.18-5.14 5 5 0 001.548 6.676 5 5 0 01-2.26-.616v.06a5 5 0 004.006 4.9 5 5 0 01-2.251.086 5 5 0 004.666 3.472 10.003 10.003 0 01-6.177 2.13c-.398 0-.79-.023-1.175-.067a14.047 14.047 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      globe: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-10c0 1.933-1.567 3.5-3.5 3.5S8.5 13.933 8.5 12 10.067 8.5 12 8.5s3.5 1.567 3.5 3.5z" />
        </svg>
      )
    };
    return iconMap[iconName] || iconMap.globe;
  };

  return (
    <div
      ref={rootRef}
      className={`flipping-chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows,
        position: 'relative'
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((card, i) => (
        <motion.div
          key={i}
          className="flipping-card-wrapper"
          onMouseEnter={() => handleCardHover(i, true)}
          onMouseLeave={() => handleCardHover(i, false)}
          animate={{
            rotateY: hoveredCard === i ? 180 : 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          style={{
            transformStyle: 'preserve-3d',
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: hoveredCard === i ? 100 : 1
          }}
        >
          {/* Front Side */}
          <div
            className="flipping-card-front"
            onMouseMove={handleCardMove}
            style={{
              '--card-border': card.borderColor || 'transparent',
              '--card-gradient': card.gradient,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="chroma-img-wrapper">
              <img src={card.image} alt={card.title} loading="lazy" />
            </div>
            <footer className="chroma-info">
              <h3 className="name">{card.title}</h3>
              {card.handle && <span className="handle">{card.handle}</span>}
              <p className="role">{card.subtitle}</p>
              {card.location && <span className="location">{card.location}</span>}
            </footer>
            <div className="chroma-card-overlay" />
          </div>

          {/* Back Side */}
          <motion.div
            className="flipping-card-back"
            style={{
              '--card-border': card.borderColor || 'transparent',
              '--card-gradient': card.gradient,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="social-grid">
              <div className="social-row">
                {card.socials && card.socials.slice(0, 2).map((social, idx) => (
                  <motion.div
                    key={idx}
                    className="social-section"
                    onClick={(e) => handleSocialClick(social.url, e)}
                    style={{
                      zIndex: 2000,
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      className="social-icon"
                      whileHover={{ scale: 1.15 }}
                    >
                      {getSocialIcon(social.icon)}
                    </motion.div>
                    <motion.span
                      className="social-label"
                      whileHover={{ opacity: 1 }}
                    >
                      {social.label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <div className="social-row">
                {card.socials && card.socials.slice(2, 4).map((social, idx) => (
                  <motion.div
                    key={idx + 2}
                    className="social-section"
                    onClick={(e) => handleSocialClick(social.url, e)}
                    onMouseEnter={() => {
                      if (!isAnimating) {
                        console.log(`Row 2 Social ${idx} hovered:`, social.label);
                      }
                    }}
                    title={social.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (idx + 2) * 0.1, scale: { duration: 0.2 } }}
                    style={{ zIndex: 1000 }}
                  >
                    <motion.div
                      className="social-icon"
                      whileHover={{ scale: 1.15 }}
                    >
                      {getSocialIcon(social.icon)}
                    </motion.div>
                    <motion.span
                      className="social-label"
                      whileHover={{ opacity: 1 }}
                    >
                      {social.label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Spotlight Effect */}
          <div className="chroma-card-spotlight" />
        </motion.div>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default FlippingChromaGrid;
