"use client";

import { memo } from "react";
import LiquidEther from "./LiquidEther";
import NeuralNetwork from "./Neurons";
import { GradientText } from "./ui/gradient-text";
import { MorphingText } from "./ui/morphing-text";

const Hero = memo(() => {
    return (
        <section className="relative w-full h-screen bg-[#03071e] flex items-center justify-center overflow-hidden">
            {/* Background Ether effect */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.8}
                    autoIntensity={2.2}
                    takeoverDuration={0.15}
                    autoResumeDelay={1000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Neural Network - Half visible on right */}
            <div className="absolute scale-105 right-10 top-0 w-1/2 h-full z-0 overflow-hidden">
                <NeuralNetwork />
            </div>

            {/* Hero Text */}
           <div className="relative z-10 text-center text-white px-6">
  <style>
    {`@import url('https://fonts.googleapis.com/css2?family=Grenze:wght@100&display=swap');`}
  </style>

  {/* Title */}
  <GradientText
    className="text-[8rem] sm:text-[10rem] font-bold tracking-tight"
    style={{ fontFamily: 'Orbitron, sans-serif' }}
  >
    DJ InIT.AI 
  </GradientText>

  {/* Morphing Text */}
  <div className="mt-4 text-3xl sm:text-4xl font-light">
    <MorphingText texts={["Innovate", "Educate", "Evolve"]} />
  </div>

  {/* Subheading */}
  <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-[#C8A2FF]">
    Unleashing the Power of AI Together
  </h2>

  {/* Description */}
  <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-gugi">
    We are DJ inIT.ai — the official AI club of DJ Sanghvi College of Engineering.  
    We innovate, educate, and evolve to shape the future of intelligence.
  </p>
</div>


        </section>
    );
});

export default Hero;