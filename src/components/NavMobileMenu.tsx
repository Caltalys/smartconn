'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RiMenu3Fill, RiArrowDownSLine } from "react-icons/ri";
import Social from "./Social";

const servicesSubMenu = [
    { id: "it_solutions", href: "#service" },
    { id: "training", href: "#service" },
    { id: "digital_marketing", href: "#service" },
];

const navLinks = [
    { href: '#home', id: "home" },
    { href: '/about', id: "about" },
    { href: '#services', id: "services", submenu: servicesSubMenu },
    // { href: '#works', id: "works" },
    // { href: '#testimonials', id: "testimonials" },
    // { href: '#faq', id: "faq" },
    // { href: '#blog', id: "blog" },
];

const NavMobileMenu = () => {
    const t = useTranslations('navigation');
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="text-foreground flex items-center" onClick={() => setIsOpen(true)} aria-label="menu">
                <RiMenu3Fill size={24} />
            </SheetTrigger>
            {/* I've added flex flex-col here to better structure the header, nav, and footer. */}
            <SheetContent className="bg-primary-foreground border-none text-primary flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center justify-between pr-8">
                        <Logo />
                        {/* <LanguageSwitcher /> */}
                    </SheetTitle>
                </SheetHeader>
                {/* This nav section now correctly fills the available space and centers the links. */}
                <nav className="flex-1 flex flex-col items-center justify-center">
                    <ul className="flex flex-col items-center gap-10">
                        {navLinks.map((link) => (
                            link.submenu ? (
                                <li key={link.id} className="flex flex-col items-center gap-4">
                                    <div
                                        className="text-sm uppercase font-semibold tracking-[1.2px] flex items-center gap-2 cursor-pointer"
                                        onClick={() => setServicesOpen(!isServicesOpen)}
                                    >
                                        <span>{t(link.id)}</span>
                                        <RiArrowDownSLine className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden flex flex-col items-center gap-4"
                                            >
                                                {link.submenu.map(subLink => (
                                                    <li key={subLink.id} className="text-xs normal-case font-medium">
                                                        <ScrollLink
                                                            spy={true}
                                                            smooth={true}
                                                            to={subLink.href.substring(1)} offset={-64}
                                                            duration={500}
                                                            className="cursor-pointer"
                                                            activeClass="text-accent"
                                                            onClick={() => setIsOpen(false)}>
                                                            {t(`services_submenu.${subLink.id}`)}
                                                        </ScrollLink>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li key={link.id} className="text-sm uppercase font-semibold tracking-[1.2px]">
                                    <ScrollLink
                                        spy={true}
                                        smooth={true}
                                        to={link.id} offset={-64}
                                        duration={500}
                                        className="cursor-pointer"
                                        activeClass="text-accent"
                                        onClick={() => setIsOpen(false)}>
                                        {t(link.id)}
                                    </ScrollLink>
                                </li>
                            )
                        ))}
                    </ul>
                </nav>
                <SheetFooter>
                    <Social containerStyle="flex items-center gap-4 mx-auto" />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default NavMobileMenu