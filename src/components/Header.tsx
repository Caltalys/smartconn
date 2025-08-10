"use client";

import Link from "next/link";
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import NavMobileMenu from "./NavMobileMenu";
import { useServiceContext } from "@/context/ServiceContext";

export type NavigationLink = {
  id: number;
  label: string;
  url: string;
  identifier: string;
  submenu: NavigationLink[];
};

const Header = ({ navigationLinks }: { navigationLinks: NavigationLink[] }) => {
  const { setActiveService } = useServiceContext();

  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 shadow-lg py-">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center">
            {navigationLinks.map((navItem) => (
              navItem.submenu && navItem.submenu.length > 0 ? (
                <li key={navItem.id} className="relative group flex items-center gap-1 cursor-pointer text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                  <ScrollLink
                    spy={true}
                    smooth={true}
                    to={navItem.url.startsWith('#') ? navItem.url.substring(1) : navItem.url} offset={-64}
                    duration={500}
                    className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left [&.is-active]:after:scale-x-100"
                    activeClass="text-accent is-active"
                  >
                    {navItem.label}
                  </ScrollLink>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  {/* Dropdown menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-100 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                    <ul className="space-y-1">
                      {navItem.submenu.map(subLink => (
                        <li key={subLink.id}>
                          <ScrollLink
                            spy={true}
                            smooth={true}
                            to={subLink.url.startsWith('#') ? subLink.url.substring(1) : subLink.url} offset={-64}
                            duration={500}
                            className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-md cursor-pointer normal-case font-medium"
                            onClick={() => setActiveService(subLink.identifier)}
                          >
                            {subLink.label}
                          </ScrollLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                  <li key={navItem.id} className="text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                    {navItem.url.startsWith('/') ? (
                      <Link href={navItem.url} className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                        {navItem.label}
                      </Link>
                    ) : (
                      <ScrollLink
                        spy={true}
                        smooth={true}
                        to={navItem.url.startsWith('#') ? navItem.url.substring(1) : navItem.url} offset={-64}
                        duration={500}
                        className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left [&.is-active]:after:scale-x-100"
                        activeClass="text-accent is-active">
                        {navItem.label}
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
          <NavMobileMenu navigationLinks={navigationLinks} />
        </div>
      </div>

    </header>
  );
};

export default Header;