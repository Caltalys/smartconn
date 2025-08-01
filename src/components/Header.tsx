"use client";

import { useTranslations } from "next-intl";
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const t = useTranslations('navigation');
  const tContact = useTranslations('contact');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: '#services', id: "services" },
    { href: '#about', id: "about" },
    { href: '#works', id: "works" },
    { href: '#faq', id: "faq" },
  ];

  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="SmartConn Logo"
            width={120}
            height={30}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.id} >
              <ScrollLink smooth spy to={link.href} className="cursor-pointer" activeClass="text-accent">
                {t(link.id)}
              </ScrollLink>
            </li>
            // <a
            //   key={link.id}
            //   href={link.href}
            //   className="opacity-80 hover:opacity-100 hover:text-purple-400 transition-all duration-300 text-sm"
            // >
            //   {t(link.id)}
            // </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <div className="w-px h-5 bg-white/20" />
          <Button asChild className="px-5 py-2 font-semibold text-sm rounded-full bg-primary text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
            <a href="#contact">{tContact('contact_us')}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      {/* <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl z-30 pt-28"
            >
              <nav className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={toggleMobileMenu} className="text-2xl opacity-80 hover:opacity-100 hover:text-purple-400 transition-all duration-300">
                    {t(link.id)}
                  </a>
                ))}
                <Button asChild onClick={toggleMobileMenu} className="mt-8 px-8 py-4 font-semibold text-base rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
                  <a href="#contact">{tContact('contact_us')}</a>
                </Button>
                <div className="mt-8">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence> */}
    </header>
  );
};

export default Header;