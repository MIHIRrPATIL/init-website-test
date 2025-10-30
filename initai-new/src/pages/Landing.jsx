import { lazy, Suspense } from "react";
import FinalNavbar from "@/components/FinalNavbar";
import Hero from "@/components/Hero";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";

// Lazy load non-critical sections for better performance
const StickyFeatureSection = lazy(() => import("@/components/sticky-scroll-cards-section"));
const ProjectsGrid = lazy(() => import("@/components/projects-grid"));
const BlurTextAnimation = lazy(() => import("@/components/blur-text-animation"));
const StaggerTestimonials = lazy(() => import("@/components/stagger-testimonials").then(m => ({ default: m.StaggerTestimonials })));
const FinalFooter = lazy(() => import("@/components/FinalFooter"));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#03071e] text-black">
      {/* Navbar with Social Button on right */}
      <FinalNavbar/>
      
      {/* Hero Section - Loads first for smooth initial experience */}
      <Hero/>

      {/* Lazy loaded sections with Suspense boundary */}
      <Suspense fallback={<div className="h-screen bg-[#03071e]" />}>
        {/* Sticky Scroll Section */}
        <StickyFeatureSection />

      {/* Scroll Velocity - Company Logos with Individual Glass Backgrounds */}
      <div className="w-full bg-[#03071e] py-8">
        <h2 className="text-white text-center text-3xl md:text-4xl font-bold mb-6">Our Valued Partners & Collaborators</h2>
        <ScrollVelocity className="h-20" velocity={3} movable={true}>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Solunation.png" alt="Solunation" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Antennae.png" alt="Antennae" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/HexaMadDigital.png" alt="HexMadDigital" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/CDAC.png" alt="CDAC" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Textify.png" alt="Textify" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/dextra.png" alt="Dextra" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/dsw.png" alt="DSW" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/golden.png" alt="Golden" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/interviewbuddy.png" alt="InterviewBuddy" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/oggn-tech.png" alt="Oggn Tech" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
        </ScrollVelocity>
      </div>

      {/* Scroll Velocity - Reverse Sequence */}
      <div className="w-full bg-[#03071e] py-8">
        <ScrollVelocity className="h-20" velocity={-3} movable={true}>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/oggn-tech.png" alt="Oggn Tech" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/interviewbuddy.png" alt="InterviewBuddy" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/golden.png" alt="Golden" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/dsw.png" alt="DSW" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/dextra.png" alt="Dextra" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Textify.png" alt="Textify" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/CDAC.png" alt="CDAC" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/HexaMadDigital.png" alt="HexMadDigital" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Antennae.png" alt="Antennae" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-4 mx-3 flex items-center justify-center min-w-max h-full w-28 flex-shrink-0">
            <img src="/Solunation.png" alt="Solunation" className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity object-contain max-w-full max-h-full m-auto block" />
          </div>
        </ScrollVelocity>
      </div>

        {/* Bento Grid with Animated Title */}
        <div className="py-16 bg-[#03071e]">
          <div className="container mx-auto px-4">
            <BlurTextAnimation
              text="Exploring cutting-edge AI/ML projects developed by our talented committee members working at the forefront of technology"
              className="mb- text-center max-w-4xl mx-auto"
              fontSize="text-3xl md:text-4xl"
              textColor="text-white"
              animationDelay={800}
            />
            <ProjectsGrid />
          </div>
        </div>

        {/* Testimonials at bottom with white arrows */}
        <section className="py-16 bg-[#03071e]">
          <StaggerTestimonials
            testimonials={[
              {
                quote: "The AI models developed by this team revolutionized our healthcare analytics.",
                name: "Dr. Sarah Chen",
                title: "Chief Medical Officer"
              },
              {
                quote: "Their machine learning pipeline reduced our processing time by 80%.",
                name: "Mark Johnson",
                title: "Tech Director"
              },
              {
                quote: "The most innovative student AI team we've collaborated with.",
                name: "Lisa Wong",
                title: "Research Lead"
              }
            ]}
            className="max-w-6xl mx-auto"
            arrowColor="black"
            textColor="black"
          />
        </section>
        <FinalFooter/>
      </Suspense>
    </div>
  );
}