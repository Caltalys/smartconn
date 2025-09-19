import { Topbar as TopbarData } from "@/types/strapi/sections/topbar";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";
import Link from "next/link";
import Social from "@/components/blocks/Social";

type TopbarProps = {
    data: TopbarData | null;
};

const Topbar = ({ data }: TopbarProps) => {
    if (!data) {
        return null;
    }

    // Xác định xem có bất kỳ nội dung nào để hiển thị không.
    const hasAnyContent =
        data.message ||
        data.phoneNumber ||
        data.email ||
        (data.ctaButtonText && data.ctaButtonUrl) ||
        data.facebookUrl ||
        data.twitterUrl ||
        data.instagramUrl ||
        data.linkedinUrl;

    // Nếu không có nội dung, không render component.
    if (!hasAnyContent) {
        return null;
    }

    return (
        <div className="bg-secondary text-secondary-foreground py-2 px-6 text-sm border-b border-border">
            <div className="container mx-auto flex justify-between items-center">
                {/* Bên trái: Thông điệp và thông tin liên hệ */}
                <div className="flex-1 flex items-center gap-6">
                    {data.message && <p className="hidden md:block">{data.message}</p>}
                    {data.phoneNumber && (
                        <a href={`tel:${data.phoneNumber.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                            <RiPhoneLine />
                            <span className="hidden lg:inline">{data.phoneNumber}</span>
                        </a>
                    )}
                    {data.email && (
                        <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                            <RiMailLine />
                            <span className="hidden lg:inline">{data.email}</span>
                        </a>
                    )}
                </div>

                {/* Bên phải: Mạng xã hội và nút CTA */}
                <div className="flex items-center gap-4">
                    <Social data={data} containerStyle="flex items-center gap-2" iconStyle="text-secondary-foreground hover:text-primary transition-colors p-1" />
                    {data.ctaButtonText && data.ctaButtonUrl && <Link href={data.ctaButtonUrl} className="bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90 transition-colors text-xs font-semibold hidden sm:block">{data.ctaButtonText}</Link>}
                </div>
            </div>
        </div>
    );
};

export default Topbar;