"use client";

import { useTranslations } from "next-intl";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import NavMobileMenu from "./NavMobileMenu";

const Header = () => {
  const t = useTranslations('navigation');
  const tContact = useTranslations('contact');

  const navLinks = [
    { href: '#home', id: "home" },
    { href: '#services', id: "services" },
    { href: '#about', id: "about" },
    { href: '#works', id: "works" },
    { href: '#faq', id: "faq" },
  ];

  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex">
            {navLinks.map((link) => (
              <li key={link.id}
                className="text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                <ScrollLink
                  spy={true}
                  smooth={true}
                  to={link.id} offset={-64}
                  duration={500}
                  className="cursor-pointer"
                  activeClass="text-accent">
                  {t(link.id)}
                </ScrollLink>
              </li>
            ))}
          </ul>
          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* <Button asChild className="px-5 py-2 text-sm bg-primary text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
              <ScrollLink
                to="footer"
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="font-semibold cursor-pointer"
              >
                {tContact('contact_us')}
              </ScrollLink>
            </Button> */}
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <NavMobileMenu />
          {/* <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button> */}
        </div>
      </div>

      {/* Mobile Menu */}
      
    </header>
  );
};

export default Header;