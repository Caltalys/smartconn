'use client';

import { Navbar } from "@/types/strapi/collections/navbar";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import LanguageSwitcher from "../elements/LanguageSwitcher";
import Logo from "../elements/Logo";
import MobileNavItem from "../sections/header/MobileNavItem";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Social from "./Social";

const NavMobileMenu = ({ data }: { data?: Navbar | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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
                        <LanguageSwitcher />
                    </SheetTitle>
                </SheetHeader>
                {/* This nav section now correctly fills the available space and centers the links. */}
                <nav className="flex-1 flex flex-col items-center justify-center">
                    <ul className="flex flex-col items-center gap-10">
                        {data?.items.map((navItem) => (
                            <MobileNavItem
                                key={navItem.id}
                                item={navItem}
                                isSubMenuOpen={openMenuId === navItem.id}
                                onToggleSubMenu={() => setOpenMenuId(openMenuId === navItem.id ? null : navItem.id)}
                                closeSheet={() => setIsOpen(false)}
                            />
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