import React from 'react';
import { FlippingCard } from './flipping-card';
import SocialButton from './kokonutui/social-button';
import { ChromaGrid } from './ChromaGrid';
import './ChromaGrid.css';
import { cn } from "@/lib/utils";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaInstagram } from 'react-icons/fa';

export const FlippingChromaGridV2 = ({ items, className = '', columns = 3 }) => {
  // map common string keys to icon components
  const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    globe: FaGlobe,
    website: FaGlobe,
    instagram: FaInstagram,
    insta: FaInstagram,
  };

  return (
    <div className={`${className} w-full`}>
      <ChromaGrid
        items={items.map(item => ({
          ...item,
          footer: (
            <div className="relative overflow-hidden">
              {/* Acrylic frosted glass background layer */}
              <div className="absolute inset-0 backdrop-blur-xl bg-black/40 border-t border-white/10"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                }}
              />

              {/* Content layer */}
              <div className="relative z-10">
                <FlippingCard
                  frontContent={
                    <div className="flex items-center justify-center h-full px-6 py-4">
                      <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold tracking-wide text-white/95 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-300/90 font-light tracking-tight max-w-xs mx-auto">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  }

                  backContent={
                    <div className="flex items-center justify-center h-full p-4">
                      <div className="socials flex gap-3 mt-3">
                        {item.socials?.map((s, idx) => {
                          if (!s || !s.url) return null;

                          // Resolve icon: either a component, a known string -> component, or an image URL
                          let IconComp = null;
                          if (typeof s.icon === 'function' || typeof s.icon === 'object') {
                            IconComp = s.icon;
                          } else if (typeof s.icon === 'string') {
                            const key = s.icon.toLowerCase().trim();
                            IconComp = iconMap[key] || null;
                          }

                          return (
                            <a
                              key={idx}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/90 hover:text-white transition-colors p-2 rounded-full bg-black/20 flex items-center justify-center"
                              aria-label={s.label || `social-link-${idx}`}
                              title={s.label}
                            >
                              {IconComp ? (
                                <IconComp className="w-5 h-5" />
                              ) : (
                                // fallback: if s.icon is an image URL, render it; otherwise use label for screen readers
                                (typeof s.icon === 'string' && /^https?:\/\//.test(s.icon)) ? (
                                  <img src={s.icon} alt={s.label || ''} className="w-5 h-5 object-contain" />
                                ) : (
                                  <span className="sr-only">{s.label}</span>
                                )
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  }
                  height={100}
                  width={300}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>

              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                }}
              />
            </div>
          )
        }))}
        columns={columns}
      />
    </div>
  );
};

export default FlippingChromaGridV2;