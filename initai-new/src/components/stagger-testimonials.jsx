import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  // 🌐 ANTENNAE
  {
    tempId: 0,
    testimonial: "Partnering with the hackathon team was a delight. The creativity and organization at DJ Sanghvi were truly inspiring.",
    by: "Antennae",
    imgSrc: "/Antennae.png"
  },
  {
    tempId: 1,
    testimonial: "Seamless coordination and great energy throughout the event. Antennae was proud to be a sponsor.",
    by: "Antennae",
    imgSrc: "/Antennae.png"
  },

  // 💻 CDAC
  {
    tempId: 2,
    testimonial: "CDAC was glad to support such bright minds solving real-world AI problems with passion and teamwork.",
    by: "CDAC",
    imgSrc: "/C.png"
  },
  {
    tempId: 3,
    testimonial: "Impressive professionalism and curiosity from every participant — a testament to DJ Sanghvi’s culture.",
    by: "CDAC",
    imgSrc: "/C.png"
  },

  // ⚙️ DEXTRA
  {
    tempId: 4,
    testimonial: "Exciting to see projects built with Dextra’s tools. The enthusiasm was unmatched.",
    by: "Dextra",
    imgSrc: "/dextra.png"
  },
  {
    tempId: 5,
    testimonial: "Well-organized and engaging — one of the smoothest sponsorship experiences we’ve had.",
    by: "Dextra",
    imgSrc: "/dextra.png"
  },

  // 🧠 SOLUNATION
  {
    tempId: 6,
    testimonial: "A fantastic initiative blending creativity and tech. Solunation was proud to be part of it.",
    by: "Solunation",
    imgSrc: "/S.png"
  },
  {
    tempId: 7,
    testimonial: "Brilliant energy and innovation at every stage. Truly a rewarding partnership for Solunation.",
    by: "Solunation",
    imgSrc: "/S.png"
  },

  // 🗣️ TEXTIFY
  {
    tempId: 8,
    testimonial: "Textify’s collaboration felt seamless — professional, energetic, and full of learning moments.",
    by: "Textify",
    imgSrc: "/Textify.png"
  },
  {
    tempId: 9,
    testimonial: "Loved the clarity in coordination and enthusiasm from the team. A great experience overall.",
    by: "Textify",
    imgSrc: "/Textify.png"
  },

  // 🎯 INTERVIEWBUDDY
  {
    tempId: 10,
    testimonial: "InterviewBuddy enjoyed every moment of this collaboration. A well-managed, impactful event.",
    by: "InterviewBuddy",
    imgSrc: "/interviewbuddy.png"
  },
  {
    tempId: 11,
    testimonial: "Outstanding execution and communication. The team made the entire process effortless.",
    by: "InterviewBuddy",
    imgSrc: "/interviewbuddy.png"
  },

  // 💡 HEXMADDIGITAL
  {
    tempId: 12,
    testimonial: "A pleasure collaborating with such passionate organizers. Great exposure and engagement throughout.",
    by: "HexMadDigital",
    imgSrc: "/HexaMadDigital.png"
  },
  {
    tempId: 13,
    testimonial: "Professional, creative, and energetic — everything a successful partnership should be.",
    by: "HexMadDigital",
    imgSrc: "/HexaMadDigital.png"
  }
];




const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-white text-black border-white" 
          : "z-0 bg-[#03071e] text-white border-white/20 hover:border-white/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}>
      <span
        className="absolute block origin-top-right rotate-45 bg-white/20"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }} />
    <img
  src={testimonial.imgSrc}
  alt={`${testimonial.by.split(',')[0]}`}
  className="mb-4 h-14 w-12 bg-gray-800 object-contain object-center p-1 rounded"
  style={{
    boxShadow: "3px 3px 0px hsl(var(--background))"
  }}
/>

      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-black" : "text-white"
        )}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-black/80" : "text-white/70"
        )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#03071e]"
      style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize} />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-white/30 hover:bg-white/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial">
          <ChevronLeft color='black'/>
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-white/30 hover:bg-white/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial">
          <ChevronRight color='black' />
        </button>
      </div>
    </div>
  );
};