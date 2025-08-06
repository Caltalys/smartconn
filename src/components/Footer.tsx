'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';
import Social from './Social';
import { Link as ScrollLink } from 'react-scroll';
import { RiMapPin2Fill, RiMailFill, RiPhoneFill } from 'react-icons/ri';

const Footer = () => {
    const t = useTranslations('footer');
    const tNav = useTranslations('navigation');
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { href: 'home', id: "home" },
        { href: 'about', id: "about" },
        { href: 'services', id: "services" },
        { href: 'works', id: "works" },
        // { href: 'faq', id: "faq" },
        // { href: 'blog', id: "blog" },
    ];

    const contactItems = [
        { icon: <RiMapPin2Fill />, text: t('address') },
        { icon: <RiPhoneFill />, text: t('phone'), href: `tel:${t('phone').replace(/\s/g, '')}` },
        { icon: <RiMailFill />, text: t('email'), href: `mailto:${t('email')}` },
    ];

    return (
        <footer id="footer" className="bg-primary/5 text-primary pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Logo and Socials */}
                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <Logo />
                        <p className="text-sm text-center md:text-left text-muted-foreground">
                            {t('description')}
                        </p>
                        <Social
                            containerStyle="flex items-center gap-4"
                            iconStyle="text-primary hover:text-accent transition-colors border border-primary/20 p-2 rounded-full flex items-center justify-center"
                        />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <h4 className="font-semibold text-lg">{t('quick_links')}</h4>
                        <ul className="flex flex-col gap-3 items-center md:items-start">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <ScrollLink
                                        to={link.href}
                                        spy={true}
                                        smooth={true}
                                        offset={-64}
                                        duration={500}
                                        className="text-sm text-primary hover:text-accent cursor-pointer transition-colors"
                                    >
                                        {tNav(link.id)}
                                    </ScrollLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col gap-6 items-center md:items-start">
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

                    {/* Column 4: Placeholder for future content like a newsletter */}
                    <div className="flex flex-col gap-6 items-center md:items-start">
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
                    <p>{t('copyright', { year: currentYear })}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer