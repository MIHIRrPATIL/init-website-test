import React, { useEffect, useRef, useState } from "react";
import BlogCard from "@/components/BlogCard";
import ThreeJSHeader from "@/components/ThreeJSHeader";
// Remove the import for resizable-navbar components
// import { Navbar, NavBody, NavItems } from "@/components/ui/resizable-navbar";
import FinalNavbar from "@/components/FinalNavbar"; // Add this import
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { blogPosts } from "@/data/blogData";
import SocialButton from "@/components/kokonutui/social-button";
import FinalFooter from "@/components/FinalFooter";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Blog = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const gridRef = useRef(null);
  const backToTopRef = useRef(null);

  // Use all blog posts without filtering
  const filteredPosts = blogPosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(badgeRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scale: 0.9,
        ease: "power3.out"
      }, "-=0.4")
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Parallax effect for hero section
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        opacity: 0.2,
        ease: "none",
      });

      // Removed filter section animation

      // Grid animation
      gsap.from(gridRef.current, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom-=50",
          end: "top center",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // Back to top button
      gsap.from(backToTopRef.current, {
        scrollTrigger: {
          trigger: "body",
          start: "top -100px",
          end: "top -50px",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      // Removed floating elements animation

    });

    return () => ctx.revert();
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "power3.inOut"
    });
  };

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#03071e] text-black overflow-y-clip overflow-x-clip">
      {/* Simplified background matching landing page */}
      <div className="fixed inset-0 z-0 bg-[#03071e]" />

      {/* Replace the current Navbar with FinalNavbar */}
      <FinalNavbar />
      
      {/* Three.js Header Section */}
      <section ref={heroRef} className="relative z-10">
        <ThreeJSHeader />
      </section>


      {/* Blog Grid */}
      <section ref={gridRef} className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post}
                index={index}
              />
            ))}
          </div>

        </div>
        </section>
        <section ref={gridRef} className="relative z-10 px-4 sm:px-6 lg:px-4">
        <FinalFooter/>
      </section>

      {/* Back to Top Button */}
      {/* {showBackToTop && (
        <button
          ref={backToTopRef}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )} */}

      {/* Progress Indicator */}
      {/* <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div> */}

    </div>
  );
};

export default Blog;