"use client";

import { Footer } from "./ui/Footer";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function FinalFooter() {
    return (
        <div className="w-full dark">
            <Footer
                logo={
                    <img
                        src="init_logo.jpg"
                        alt="logo"
                        width={30}
                        height={30}
                        style={{ borderRadius: 10 }}
                    />
                }
                brandName="DJ InIT.AI"
                socialLinks={[
                    {
                        icon: <Twitter className="h-5 w-5" />,
                        href: "https://twitter.com",
                        label: "Twitter",
                    },
                    {
                        icon: <Github className="h-5 w-5" />,
                        href: "https://github.com",
                        label: "GitHub",
                    },
                    {
                        icon: <Linkedin className="h-5 w-5" />,
                        href: "https://linkedin.com",
                        label: "LinkedIn",
                    },
                    {
                        icon: <Mail className="h-5 w-5" />,
                        href: "mailto:your.email@example.com",
                        label: "Email",
                    },
                ]}
                mainLinks={[
                    { href: "/blogs", label: "Blogs" },
                    { href: "/events", label: "Events" },
                    { href: "/team", label: "Team" },
                    { href: "/about", label: "About us" },
                ]}
                legalLinks={[
                    { href: "/privacy", label: "Privacy" },
                    { href: "/terms", label: "Terms" },
                ]}
                copyright={{
                    text: "© 2025 DJ InIT.AI",
                    license: "All rights reserved",
                }}
            />
        </div>
    );
}