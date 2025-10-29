import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "@/components/BlogCard";
import ThreeJSHeader from "@/components/ThreeJSHeader_About";
import FinalNavbar from "@/components/FinalNavbar";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { blogPosts } from "@/data/blogData";
import SocialButton from "@/components/kokonutui/social-button";
import FinalFooter from "@/components/FinalFooter";
import LiquidEther from "@/components/LiquidEther";
import PortfolioSection from "@/components/Section1";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const milestones = [
    { year: "2017", label: "Foundation and", sublabel: "Establishment" },
    { year: "2019", label: "Research Papers", sublabel: "Publication" },
    { year: "2023", label: "D2K 1.0" },
    { year: "2024", label: "D2K 2.0" },
    { year: "2025", label: "D2K 3.0" },
  ];

  // Placeholder images
  const teamMeetingMain = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop";
  const officeWorkspace1 = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop";
  const officeWorkspace2 = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop";
  const teamCollaborationBw = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop";

  return (
    <div className="min-h-screen bg-[#03071e] text-black overflow-y-clip overflow-x-clip relative">
      {/* Liquid Ether Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <FinalNavbar />
      <section className="relative z-10">
        <ThreeJSHeader />
      </section>

       {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-24 bg-accent rounded-full"></div>
                <div>
                  <p className="text-white text-xs uppercase tracking-wider mb-4">
                    OUR STORY
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-extrabold leading-tight text-white">
                    DJ INIT.AI - {" "}
                    <span className="text-red-400">Educate</span>. <span className="text-red-400">Innovate</span>. <span className="text-red-400">Evolve</span> <span className="text-accent">with AI</span>
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={teamMeetingMain}
                  alt="Team meeting"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-15"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={officeWorkspace1}
                    alt="Office workspace"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={officeWorkspace2}
                    alt="Team collaboration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <motion.p
                className="text-white leading-relaxed text-xl font-medium max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                DJ InIT.AI is the Artificial Intelligence club of the IT Department at Dwarkadas J Sanghvi College of Engineering. Founded in 2017, we educate and inspire students to explore AI through hands-on learning and awareness of current and emerging research directions.
              </motion.p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-3xl font-bold text-white">10k+</p>
                  <p className="text-xs text-white mt-1">Completed Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">15k+</p>
                  <p className="text-xs text-white mt-1">Satisfied Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">10k+</p>
                  <p className="text-xs text-white mt-1">Winning Awards</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">45+</p>
                  <p className="text-xs text-white mt-1">Worldwide Partners</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-destructive border-2 border-[#03071e]"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-[#03071e]"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-[#03071e]"></div>
                </div>
                <Button
                  variant="ghost"
                  className="text-white hover:text-accent transition-all duration-300 gap-2"
                >
                  <Play className="w-4 h-4" />
                  WATCH INTRO
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Our Journey Section */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-8 relative z-10 overflow-hidden"
        initial={{ borderColor: '#03071e' }}
        animate={{ borderColor: ['#03071e', '#1a1a2e', '#03071e'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          border: '2px solid',
          borderRadius: '12px',
          boxShadow: 'inset 0 0 20px rgba(26, 26, 46, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: '0.15em' }}>
                  OUR STORY
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white" style={{ fontWeight: 900 }}>
                OUR GOALS{" "}
                  </h2>
              </div>

              <motion.p
                className="text-white leading-relaxed text-xl font-medium max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We educate students on AI, Machine Learning, and Data Science through hands-on projects and workshops. Our members participate in competitions and hackathons to showcase their skills, while we promote research by initiating projects in AI and machine learning.</motion.p>

             
              
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src={teamCollaborationBw}
                  alt="Team collaboration"
                  className="w-full h-auto object-cover grayscale"
                />
                <div className="absolute bottom-12 right-12">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 sm:mt-20"
          >
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-2 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-red-400 hidden sm:block"></div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 relative">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center relative"
                  >
                    {/* Dot */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-white/20 shadow-lg ${
                          index === 0 
                            ? "bg-red-500 ring-2 ring-red-300" 
                            : "bg-red-400 hover:bg-red-300"
                        } relative z-10 transition-all duration-300`}
                      ></div>
                    </div>

                    {/* Year */}
                    <p
                      className="text-3xl sm:text-4xl font-bold mb-2 text-white"
                      style={{ fontWeight: 700 }}
                    >
                      {milestone.year}
                    </p>

                    {/* Label */}
                    <p className="text-xs text-gray-400 leading-tight">
                      {milestone.label}
                      {milestone.sublabel && (
                        <>
                          <br />
                          {milestone.sublabel}
                        </>
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <PortfolioSection />
      <FinalFooter></FinalFooter>
    </div>
  );
};

export default Index;