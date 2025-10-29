import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import FinalNavbar from "../components/FinalNavbar";
import LiquidEther from "@/components/LiquidEther";
import FinalFooter from "@/components/FinalFooter";
import React from "react";

export default function BlogDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    // 👉 Hard‑coded relative URL – works locally and on GitHub Pages
    useEffect(() => {
        fetch(`/${id}.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`JSON not found: ${res.status}`);
                return res.json();
            })
            .then(setPost)
            .catch((err) => setError(err.message));
    }, []);

    /** -----------------  Styling helpers  ----------------- **/
    // Wrapper to keep the markdown confined to your design system
    const markdownClass = `
    prose prose-sm sm:prose lg:prose-lg
    prose-purple prose-a:text-indigo-600 prose-a:hover:text-indigo-800
    text-white
    `;

    return (
        <div className="min-h-screen bg-[#03071e] text-black overflow-y-clip overflow-x-clip relative">
            {/* -------- LiquidEther behind everything -------- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
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
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Navbar stays on top */}
            <FinalNavbar />

            {/* -------- Markdown on top of the background -------- */}
            <article className="relative max-w-5xl mx-auto py-6 pt-14 z-20">
                {/* show the same layout; only the *inside* changes */}
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : !post ? (
                    <p className="italic text-gray-600">Loading…</p>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-white">{post.title}</h1>
                        <div className={markdownClass}>
                            <ReactMarkdown>{post.mdcontent}</ReactMarkdown>
                        </div>
                    </>
                )}
            </article>
            <FinalFooter></FinalFooter>
        </div>
    );
}
