'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';
import Social from './Social';
import { Link as ScrollLink } from 'react-scroll';
import { RiMapPin2Fill, RiMailFill, RiPhoneFill } from 'react-icons/ri';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const Footer = () => {
    const t = useTranslations('footer');
    const tNav = useTranslations('navigation');
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { href: 'home', id: "home" },
        { href: 'about', id: "about" },
        { href: 'services', id: "services" }
    ];

    const contactItems = [
        { icon: <RiMapPin2Fill />, text: t('address') },
        { icon: <RiPhoneFill />, text: t('phone'), href: `tel:${t('phone').replace(/\s/g, '')}` },
        { icon: <RiMailFill />, text: t('email'), href: `mailto:${t('email')}` },
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
                    {/* Mobile: Column 2: Quick Links */}
                    <div className="md:hidden flex flex-col gap-2 items-center">
                        <h4 className="font-semibold text-lg">{t('quick_links')}</h4>
                        <ul className="flex items-center">
                            {navLinks.map(link => (
                                <li key={link.id} className="after:content-['/'] after:mx-2 last:after:content-none">
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

                {/* Mobile Accordion */}
                {/* <div className="md:hidden">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="quick-links" className='border-t border-primary/10'>
                            <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline">{t('quick_links')}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col gap-3 items-start pt-2 pl-2">
                                    {navLinks.map(link => (
                                        <li key={link.id}>
                                            <ScrollLink to={link.href} spy={true} smooth={true} offset={-64} duration={500} className="text-sm text-primary hover:text-accent cursor-pointer transition-colors">
                                                {tNav(link.id)}
                                            </ScrollLink>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="contact-info" className='border-y border-primary/10'>
                            <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline">{t('contact_info')}</AccordionTrigger>
                            <AccordionContent>
                                <ul className="flex flex-col gap-4 items-start pt-2 pl-2">
                                    {contactItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="text-accent text-xl mt-1">{item.icon}</div>
                                            {item.href ? (
                                                <a href={item.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">{item.text}</a>
                                            ) : (
                                                <p className="text-sm text-muted-foreground">{item.text}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div> */}
            </div>
            {/* Copyright */}
            <div className="bg-primary/70 text-white text-center text-sm py-3 z-10">
                <p>{t('copyright', { year: currentYear })}</p>
            </div>
        </footer>
    );
}

export default Footer