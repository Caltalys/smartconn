import { useActiveServiceDispatch } from "@/context/ServiceContext";
import { MenuItem } from "@/types/strapi/collections/menu-item";
import { ChevronDown } from "lucide-react";
import DropdownMenu from "./DropdownMenu";
import NavLink from "./NavLink";

type NavItemProps = {
    item: MenuItem;
};

const NavItem = ({ item }: NavItemProps) => {
    const setActiveService = useActiveServiceDispatch();
    const hasChildren = item.children && item.children.length > 0;

    const linkClassName = "relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left";
    const activeClassName = "text-accent after:scale-x-100 is-active";

    if (hasChildren) {
        return (
            <li className="relative group flex items-center gap-1 cursor-pointer text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                <NavLink href={item.url} className={linkClassName} activeClass={activeClassName}>
                    {item.title}
                </NavLink>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                <DropdownMenu items={item.children} />
            </li>
        );
    }

    return (
        <li className="text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
            <NavLink href={item.url} className={linkClassName} activeClass={activeClassName} onClick={() => item.id ? setActiveService(item.id.toString()) : setActiveService("")}>
                {item.title}
            </NavLink>
        </li>
    );
};

export default NavItem;