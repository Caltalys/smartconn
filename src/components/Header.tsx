"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import NavMobileMenu from "./NavMobileMenu";
import { navLinks } from "@/config/navigation";
import { useServiceContext } from "@/context/ServiceContext";

const Header = () => {
  const t = useTranslations('navigation');
  const { setActiveService } = useServiceContext();

  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 shadow-lg py-">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              link.submenu ? (
                <li key={link.id} className="relative group flex items-center gap-1 cursor-pointer text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                  <ScrollLink
                    spy={true}
                    smooth={true}
                    to={link.href} offset={-64}
                    duration={500}
                    className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left [&.is-active]:after:scale-x-100"
                    activeClass="text-accent is-active"
                  >
                    {t(link.id)}
                  </ScrollLink>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  {/* Dropdown menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-100 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                    <ul className="space-y-1">
                      {link.submenu.map(subLink => (
                        <li key={subLink.id}>
                          <ScrollLink
                            spy={true}
                            smooth={true}
                            to={subLink.href} offset={-64}
                            duration={500}
                            className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-md cursor-pointer normal-case font-medium"
                            onClick={() => setActiveService(subLink.id)}
                          >
                            {t(`services_submenu.${subLink.id}`)}
                          </ScrollLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                  <li key={link.id} className="text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                    {link.href.startsWith('/') ? (
                      <Link href={link.href} className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        {t(link.id)}
                      </Link>
                    ) : (
                      <ScrollLink
                        spy={true}
                        smooth={true}
                        to={link.href} offset={-64}
                        duration={500}
                        className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left [&.is-active]:after:scale-x-100"
                        activeClass="text-accent is-active">
                        {t(link.id)}
                      </ScrollLink>
                    )}
                  </li>
              )
            ))}
          </ul>
          {/* Right side actions */}
          {/* <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <NavMobileMenu />
        </div>
      </div>

    </header>
  );
};

export default Header;