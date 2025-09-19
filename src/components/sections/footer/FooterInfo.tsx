import Logo from "@/components/elements/Logo";
import Social from "@/components/blocks/Social";
import { SocialLinksData } from "@/types/strapi/social";

type FooterInfoProps = {
    description: string | null;
    socialData: SocialLinksData;
};

const FooterInfo = ({ description, socialData }: FooterInfoProps) => {
    return (
        <div className="flex flex-col gap-4 items-center md:items-start">
            <Logo />
            {description && (
                <p className="text-sm text-center md:text-left text-muted-foreground max-w-xs">
                    {description}
                </p>
            )}
            <Social
                data={socialData}
                containerStyle="flex items-center gap-4"
                iconStyle="text-primary hover:text-accent transition-colors border border-primary/20 p-2 rounded-full flex items-center justify-center"
            />
        </div>
    );
};

export default FooterInfo;