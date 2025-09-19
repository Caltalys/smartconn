import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClass?: string;
    onClick?: () => void;
};

const NavLink = ({ href, children, className, activeClass, onClick }: NavLinkProps) => {
    const pathname = usePathname();
    const isInternalPage = href.startsWith('/');

    if (isInternalPage) {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`${className} ${isActive ? activeClass : ''}`}
                onClick={onClick}
            >
                {children}
            </Link>
        );
    }

    return (
        <ScrollLink
            spy={true}
            smooth={true}
            to={href.startsWith('#') ? href.substring(1) : href}
            offset={-64}
            duration={500}
            className={className}
            activeClass={activeClass}
            onClick={onClick}
        >
            {children}
        </ScrollLink>
    );
};

export default NavLink;