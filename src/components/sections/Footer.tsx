'use client';

import { Footer as FooterData } from "@/types/strapi/single/footer";
import { RiMailFill, RiMapPin2Fill, RiPhoneFill } from "react-icons/ri";
import ContactInfoList, { ContactItem } from "./footer/ContactInfoList";
import Copyright from "./footer/Copyright";
import FooterInfo from "./footer/FooterInfo";
import QuickLinksList from "./footer/QuickLinksList";


type FooterProps = {
    data: FooterData | null;
};

const Footer = ({ data }: FooterProps) => {
    if (!data) {
        return null;
    }

    // --- Data Preparation ---
    const contactItems: ContactItem[] = [];
    if (data.address) {
        contactItems.push({
            icon: <RiMapPin2Fill />,
            text: data.address,
            href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`,
        });
    }
    if (data.phoneNumber) {
        contactItems.push({
            icon: <RiPhoneFill />,
            text: data.phoneNumber,
            href: `tel:${data.phoneNumber.replace(/\s/g, '')}`,
        });
    }
    if (data.email) {
        contactItems.push({
            icon: <RiMailFill />,
            text: data.email,
            href: `mailto:${data.email}`,
        });
    }

    const hasQuickLinks = data.quickLinks && data.quickLinks.length > 0;
    const hasContactInfo = contactItems.length > 0;

    // --- Rendering ---
    return (
        <footer id="footer" className="text-primary bg-primary/10">
            <div className="container mx-auto py-6 z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FooterInfo description={data.description} socialData={data} />

                    {hasQuickLinks && (
                        <>
                            {/* Desktop Quick Links */}
                            <div className="hidden md:block">
                                <QuickLinksList title={data.quickLinksTitle} links={data.quickLinks} />
                            </div>
                            {/* Mobile Quick Links */}
                            <div className="md:hidden">
                                <QuickLinksList title={data.quickLinksTitle} links={data.quickLinks} listClassName="flex flex-row flex-wrap justify-center" listItemClassName="after:content-['/'] after:mx-2 last:after:content-none" />
                            </div>
                        </>
                    )}

                    {hasContactInfo && (
                        <ContactInfoList title={data.contactInfoTitle} items={contactItems} />
                    )}
                </div>
            </div>
            {data.copyright && <Copyright text={data.copyright} />}
        </footer>
    );
};

export default Footer;