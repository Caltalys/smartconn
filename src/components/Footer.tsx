'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';
import Social from './Social';
import { Link as ScrollLink } from 'react-scroll';
import { RiMapPin2Fill, RiMailFill, RiPhoneFill } from 'react-icons/ri';
import Link from 'next/link';
import { FooterSection } from '@/lib/types';

const Footer = ({ data }: { data?: FooterSection }) => {
    const t = useTranslations('footer');
    const tNav = useTranslations('navigation');
    const currentYear = new Date().getFullYear();

    const contactItems = [
        { icon: <RiMapPin2Fill />, text: data?.addredd || t('address'), href: '#' },
        { icon: <RiPhoneFill />, text: data?.phone || t('phone'), href: `tel:${data?.phone || t('phone').replace(/\s/g, '')}` },
        { icon: <RiMailFill />, text: data?.email || t('email'), href: `mailto:${data?.email || t('email')}` },
    ];

    return (
        <footer id="footer" className="text-primary bg-primary/10">
            <div className="container mx-auto py-6 z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Logo and Socials */}
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <Logo />
                        <p className="text-sm text-center md:text-left text-muted-foreground">
                            {t('description')}
                        </p>
                        <Social
                            containerStyle="flex items-center gap-4"
                            iconStyle="text-primary hover:text-accent transition-colors border border-primary/20 p-2 rounded-full flex items-center justify-center"
                        />
                    </div>

                    {/* Desktop: Column 2: Quick Links */}
                    <div className="hidden md:flex flex-col gap-6 items-start">
                        <h4 className="font-semibold text-lg">{t('quick_links')}</h4>
                        <ul className="flex flex-col gap-3 items-center md:items-start">
                            {data?.quickLinks.map(link => (
                                <li key={link.id}>
                                    <Link href={link.href}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Mobile: Column 2: Quick Links */}
                    <div className="md:hidden flex flex-col gap-2 items-center">
                        <h4 className="font-semibold text-lg">{t('quick_links')}</h4>
                        <ul className="flex items-center">
                            {data?.quickLinks.map(link => (
                                <li key={link.id} className="after:content-['/'] after:mx-2 last:after:content-none">
                                    <ScrollLink
                                        to={link.href}
                                        spy={true}
                                        smooth={true}
                                        offset={-64}
                                        duration={500}
                                        className="text-sm text-primary hover:text-accent cursor-pointer transition-colors"
                                    >
                                        {link.label}
                                    </ScrollLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop: Column 3: Contact Info */}
                    <div className="hidden md:flex flex-col gap-6 items-start">
                        <h4 className="font-semibold text-lg">{t('contact_info')}</h4>
                        <ul className="flex flex-col gap-4 items-center md:items-start">
                            {contactItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="text-accent text-xl mt-1">{item.icon}</div>
                                    {item.href ? (
                                        <a href={item.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">{item.text}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Mobile: Column 3: Contact Info */}
                    <div className="md:hidden flex flex-col gap-2 items-center">
                        <h4 className="font-semibold text-lg">{t('contact_info')}</h4>
                        <ul className="flex flex-col gap-2 items-center">
                            {contactItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="text-accent text-xl">{item.icon}</div>
                                    {item.href ? (
                                        <a href={item.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">{item.text}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <div className="bg-primary/70 text-white text-center text-sm py-3 z-10">
                <p>{data?.copyright}</p>
            </div>
        </footer>
    );
}

export default Footer