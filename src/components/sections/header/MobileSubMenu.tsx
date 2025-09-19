'use client';

import { motion } from "framer-motion";
import { NavbarItem } from "@/types/strapi/sections/navbar";
import { useActiveServiceDispatch } from "@/context/ServiceContext";
import NavLink from "./NavLink";

type MobileSubMenuProps = {
    items: NavbarItem[];
    closeSheet: () => void;
};

const MobileSubMenu = ({ items, closeSheet }: MobileSubMenuProps) => {
    const setActiveService = useActiveServiceDispatch();

    return (
        <motion.ul
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden flex flex-col items-center gap-4"
        >
            {items.map(subLink => (
                <li key={subLink.id} className="text-xs normal-case font-medium">
                    <NavLink
                        href={subLink.url}
                        className="cursor-pointer"
                        activeClass="text-accent"
                        onClick={() => {
                            if (subLink.id && !subLink.url.startsWith('/')) {
                                setActiveService(subLink.id.toString());
                            }
                            closeSheet();
                        }}
                    >
                        {subLink.title}
                    </NavLink>
                </li>
            ))}
        </motion.ul>
    );
};

export default MobileSubMenu;