import LanguageSwitcher from "@/components/elements/LanguageSwitcher";
import { Navbar } from "@/types/strapi/collections/navbar";
import NavItem from "./NavItem";

type DesktopNavProps = {
    data?: Navbar | null;
};

const DesktopNav = ({ data }: DesktopNavProps) => {
    return (
        <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center">
                {data?.items?.map((navItem) => (
                    <NavItem key={navItem.id} item={navItem} />
                ))}
            </ul>
            <div className="flex items-center gap-4">
                <LanguageSwitcher />
            </div>
        </nav>
    );
};

export default DesktopNav;