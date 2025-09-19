import { NavbarItem } from "@/types/strapi/sections/navbar";
import NavLink from "./NavLink";

type DropdownMenuProps = {
    items: NavbarItem[];
};

const DropdownMenu = ({ items }: DropdownMenuProps) => {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
            <ul className="space-y-1">
                {items.map(subLink => (
                    <li key={subLink.id}>
                        <NavLink href={subLink.url} className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-lg cursor-pointer normal-case font-medium" activeClass="text-accent">
                            {subLink.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenu;