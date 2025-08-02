'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import Social from "./Social";
import { buttonVariants } from "./ui/button";

const navLinks = [
    { href: '#services', id: "services" },
    { href: '#about', id: "about" },
    { href: '#works', id: "works" },
    { href: '#faq', id: "faq" },
];

const NavMobileMenu = () => {
    const t = useTranslations('navigation');
    const tContact = useTranslations('contact');
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="text-foreground flex items-center" onClick={() => setIsOpen(true)} aria-label="menu">
                <RiMenu3Fill size={24} />
            </SheetTrigger>
            <SheetContent className="bg-primary-foreground border-none text-primary">
                <div className="justify-between">
                    <SheetHeader>
                        <SheetTitle><Logo /></SheetTitle>
                    </SheetHeader>
                    <ul className="h-full flex flex-col items-center justify-center gap-10 ">
                        {navLinks.map((link) => (
                            <li key={link.id}
                                className="text-sm uppercase font-semibold tracking-[1.2px]">
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
                        ))}
                    </ul>
                </div>
                <SheetFooter>
                    <Social containerStyle="flex items-center gap-4 mx-auto" />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default NavMobileMenu