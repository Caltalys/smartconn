import NavLink from "@/components/sections/header/NavLink";
import { Link as LinkType } from "@/types/strapi/elements/link";

type QuickLinksListProps = {
    title: string | null;
    links: LinkType[];
    listClassName?: string;
    listItemClassName?: string;
    linkClassName?: string;
};

const QuickLinksList = ({ title, links, listClassName, listItemClassName, linkClassName }: QuickLinksListProps) => {
    return (
        <div className="flex flex-col gap-6 items-center md:items-start">
            {title && <h4 className="font-semibold text-lg">{title}</h4>}
            <ul className={listClassName || "flex flex-col gap-3 items-center md:items-start"}>
                {links.map((link) => (
                    <li key={link.id} className={listItemClassName}>
                        <NavLink
                            href={link.href}
                            className={linkClassName || "text-sm text-primary hover:text-accent cursor-pointer transition-colors"}
                            activeClass="text-accent"
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickLinksList;