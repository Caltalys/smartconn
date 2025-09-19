'use client';

import { NavbarItem as NavbarItemType } from "@/types/strapi/sections/navbar";
import { RiArrowDownSLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import MobileSubMenu from "./MobileSubMenu";
import NavLink from "./NavLink";
import { useActiveServiceDispatch } from "@/context/ServiceContext";

type MobileNavItemProps = {
    item: NavbarItemType;
    isSubMenuOpen: boolean;
    onToggleSubMenu: () => void;
    closeSheet: () => void;
};

const MobileNavItem = ({ item, isSubMenuOpen, onToggleSubMenu, closeSheet }: MobileNavItemProps) => {
    const setActiveService = useActiveServiceDispatch();
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
        return (
            <li className="flex flex-col items-center gap-4">
                <div
                    className="text-sm uppercase font-semibold tracking-[1.2px] flex items-center gap-2 cursor-pointer"
                    onClick={onToggleSubMenu}
                >
                    <span>{item.title}</span>
                    <RiArrowDownSLine className={`transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                    {isSubMenuOpen && <MobileSubMenu items={item.children} closeSheet={closeSheet} />}
                </AnimatePresence>
            </li>
        );
    }

    return (
        <li className="text-sm uppercase font-semibold tracking-[1.2px]">
            <NavLink href={item.url} className="cursor-pointer" activeClass="text-accent" onClick={closeSheet}>
                {item.title}
            </NavLink>
        </li>
    );
};

export default MobileNavItem;