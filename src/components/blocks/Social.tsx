import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import type { IconType } from "react-icons";
import { SocialLinksData } from "@/types/strapi/social";

// Define the shape of a social link for better type safety and maintainability
type SocialLink = {
    name: string;
    href: string;
    Icon: IconType;
};

// Define the component's props for clarity and type-checking
type SocialProps = {
    data?: SocialLinksData | null;
    containerStyle?: string;
    iconStyle?: string;
};

/**
 * A reusable component to display social media links.
 * This refactored version is data-driven, fixes prop handling, and has improved styling with sensible defaults.
 */
const Social = ({ containerStyle, iconStyle, data }: SocialProps) => {
    // Centralize social link data in an array. This makes it easy to add, remove, or modify links.
const socialLinks: SocialLink[] = [
    { name: 'Facebook', href: data?.facebookUrl || '#', Icon: RiFacebookFill },
    { name: 'Twitter', href: data?.twitterUrl || '#', Icon: RiTwitterFill },
    { name: 'Instagram', href: data?.instagramUrl || '#', Icon: RiInstagramFill },
    { name: 'LinkedIn', href: data?.linkedinUrl || '#', Icon: RiLinkedinFill },
];
    return (
        <div className={containerStyle || 'flex items-center gap-4'}>
            {socialLinks.map(({ name, href, Icon }) => (
                <a
                    key={name}
                    href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={`Follow us on ${name}`}
                    className={iconStyle || 'text-primary hover:text-accent transition-colors border border-primary/20 p-2 rounded-full flex items-center justify-center'}
                >
                    <Icon size={16} />
                </a>
            ))}
        </div>
    )
}

export default Social