"use client";

/**
 * @author: @dorian_baffier
 * @description: Social Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Twitter, Github, Linkedin, Link } from "lucide-react";
import { motion } from "motion/react";

export default function SocialButton({
    className,
    socials,
    ...props
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const iconMap = {
        twitter: Twitter,
        github: Github,
        linkedin: Linkedin,
        globe: Link
    };

    const shareButtons = socials || [
        { icon: Twitter, label: "Share on Twitter" },
        { icon: Github, label: "Share on Github" },
        { icon: Linkedin, label: "Share on LinkedIn" },
        { icon: Link, label: "Copy link" },
    ];

    const handleShare = (index, url) => {
        setActiveIndex(index);
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        setTimeout(() => setActiveIndex(null), 300);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}>
            <motion.div
                animate={{
                    opacity: isVisible ? 0 : 1,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                }}>
                <Button
                    className={cn(
                        "min-w-40 relative",
                        "bg-white dark:bg-black",
                        "hover:bg-gray-50 dark:hover:bg-gray-950",
                        "text-black dark:text-white",
                        "border border-black/10 dark:border-white/10",
                        "transition-colors duration-200",
                        className
                    )}
                    {...props}>
                    <span className="flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        Social handles
                    </span>
                </Button>
            </motion.div>
            <motion.div
                className="absolute top-0 left-0 flex h-10 overflow-hidden"
                animate={{
                    width: isVisible ? "auto" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                }}>
                {shareButtons.map((button, i) => {
                    const IconComponent = typeof button.icon === 'string' ? iconMap[button.icon] : button.icon;
                    return (
                    <motion.button
                        type="button"
                        key={`share-${button.label}`}
                        aria-label={button.label}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleShare(i, button.url);
                        }}
                        className={cn(
                            "h-10",
                            "w-10",
                            "flex items-center justify-center",
                            "bg-black dark:bg-white",
                            "text-white dark:text-black",
                            i === 0 && "rounded-l-md",
                            i === 3 && "rounded-r-md",
                            "border-r border-white/10 dark:border-black/10 last:border-r-0",
                            "hover:bg-gray-900 dark:hover:bg-gray-100",
                            "outline-none",
                            "relative overflow-hidden",
                            "transition-colors duration-200",
                            "pointer-events-auto cursor-pointer"
                        )}
                        animate={{
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : -20,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                            delay: isVisible ? i * 0.05 : 0,
                        }}>
                        <motion.div
                            className="relative z-10"
                            animate={{
                                scale: activeIndex === i ? 0.85 : 1,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}>
                            <IconComponent className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-white dark:bg-black"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeIndex === i ? 0.15 : 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }} />
                    </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
