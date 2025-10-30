"use client";

import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";

const navItems = [
    { name: "Home", link: "/" },
    { name: "Research & Blogs", link: "/blogs" },
    { 
        name: "Events", 
        // link: "/events",
        dropdown: [
            { 
                name: "D2K 3.0", 
                link: "https://d2k.djinitai.com//" 
            }
        ]
    },
    { name: "Our Projects", link: "/projects" },
    { name: "Achievements", link: "/achievements" },
    { name: "The Team", link: "/team" },
    { name: "About us", link: "/about" },
];

export default function FinalNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Navbar className="dark">
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <div key={`mobile-link-${idx}`}>
                            <a
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                            {item.dropdown && (
                                <div className="mt-2">
                                    {item.dropdown.map((dropdownItem, dIdx) => (
                                        <a
                                            key={`mobile-dropdown-${idx}-${dIdx}`}
                                            href={dropdownItem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block pl-4 text-sm text-neutral-600 dark:text-neutral-300"
                                        >
                                            {dropdownItem.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}