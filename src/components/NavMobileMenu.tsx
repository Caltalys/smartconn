'use client';

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { RiMenu3Fill, RiArrowDownSLine } from "react-icons/ri";
import Social from "./Social";
import { useServiceContext } from "@/context/ServiceContext";
import { NavigationLink } from "./Header";

const NavMobileMenu = ({ navigationLinks }: { navigationLinks: NavigationLink[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);
    const { setActiveService } = useServiceContext();

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
                        {navigationLinks.map((navItem) => (
                            navItem.submenu && navItem.submenu.length > 0 ? (
                                <li key={navItem.id} className="flex flex-col items-center gap-4">
                                    <div
                                        className="text-sm uppercase font-semibold tracking-[1.2px] flex items-center gap-2 cursor-pointer"
                                        onClick={() => setServicesOpen(!isServicesOpen)}
                                    >
                                        <span>{navItem.label}</span>
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
                                                {navItem.submenu.map(subLink => (
                                                    <li key={subLink.id} className="text-xs normal-case font-medium">
                                                        <ScrollLink
                                                            spy={true}
                                                            smooth={true}
                                                            to={subLink.url.startsWith('#') ? subLink.url.substring(1) : subLink.url} offset={-64}
                                                            duration={500}
                                                            className="cursor-pointer"
                                                            activeClass="text-accent"
                                                            onClick={() => {
                                                                setActiveService(subLink.identifier);
                                                                setIsOpen(false);
                                                            }}>
                                                            {subLink.label}
                                                        </ScrollLink>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li key={navItem.id} className="text-sm uppercase font-semibold tracking-[1.2px]">
                                    {navItem.url.startsWith('/') ? (
                                        <Link
                                            href={navItem.url}
                                            className="cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {navItem.label}
                                        </Link>
                                    ) : (
                                        <ScrollLink
                                            spy={true}
                                            smooth={true}
                                            to={navItem.url.startsWith('#') ? navItem.url.substring(1) : navItem.url} offset={-64}
                                            duration={500}
                                            className="cursor-pointer"
                                            activeClass="text-accent"
                                            onClick={() => setIsOpen(false)}>
                                            {navItem.label}
                                        </ScrollLink>
                                    )}
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