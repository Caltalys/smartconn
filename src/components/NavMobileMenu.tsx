'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { RiMenu3Fill, RiArrowDownSLine } from "react-icons/ri";
import Social from "./Social";
import { useServiceContext } from "@/context/ServiceContext";
import { HeaderSection } from "@/lib/types";
import { Link, usePathname } from "@/i18n/navigation";

const NavMobileMenu = ({ navigationLinks }: { navigationLinks?: HeaderSection }) => {
    console.log(navigationLinks);
    const [isOpen, setIsOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const { setActiveService } = useServiceContext();
    const pathname = usePathname();

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
                        {navigationLinks?.navbar?.menus.map((navItem) => (
                            navItem.submenus && navItem.submenus.length > 0 ? (
                                <li key={navItem.id} className="flex flex-col items-center gap-4">
                                    <div
                                        className="text-sm uppercase font-semibold tracking-[1.2px] flex items-center gap-2 cursor-pointer"
                                        onClick={() => setOpenMenuId(openMenuId === navItem.id ? null : navItem.id)}
                                    >
                                        <span>{navItem.label}</span>
                                        <RiArrowDownSLine className={`transition-transform duration-300 ${openMenuId === navItem.id ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {openMenuId === navItem.id && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden flex flex-col items-center gap-4"
                                            >
                                                {navItem.submenus.map(subLink => (
                                                    <li key={subLink.id} className="text-xs normal-case font-medium">
                                                        {subLink.href.startsWith('/') ? (
                                                            <Link
                                                                href={subLink.href}
                                                                className={`cursor-pointer ${pathname === subLink.href ? 'text-accent' : ''}`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subLink.label}
                                                            </Link>
                                                        ) : (
                                                            <ScrollLink
                                                                spy={true}
                                                                smooth={true}
                                                                to={subLink.href.startsWith('#') ? subLink.href.substring(1) : subLink.href} offset={-64}
                                                                duration={500}
                                                                className="cursor-pointer"
                                                                activeClass="text-accent"
                                                                onClick={() => {
                                                                    if (subLink.id) {
                                                                        setActiveService(subLink.id.toString());
                                                                    }
                                                                    setIsOpen(false);
                                                                }}>
                                                                {subLink.label}
                                                            </ScrollLink>
                                                        )}
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li key={navItem.id} className="text-sm uppercase font-semibold tracking-[1.2px]">
                                    {navItem.href.startsWith('/') ? (
                                        <Link
                                            href={navItem.href}
                                            className={`cursor-pointer ${pathname === navItem.href ? 'text-accent' : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {navItem.label}
                                        </Link>
                                    ) : (
                                        <ScrollLink
                                            spy={true}
                                            smooth={true}
                                            to={navItem.href.startsWith('#') ? navItem.href.substring(1) : navItem.href} offset={-64}
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