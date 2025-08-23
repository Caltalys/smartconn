"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { ChevronDown } from 'lucide-react';
import { Link as ScrollLink } from "react-scroll";
import Logo from "./elements/Logo";
import NavMobileMenu from "./NavMobileMenu";
import { useServiceContext } from "@/context/ServiceContext";
import { HeaderSection } from "@/lib/types";
import LanguageSwitcher from "./elements/LanguageSwitcher";

const Header = ({ data }: { data?: HeaderSection }) => {
  const { setActiveService } = useServiceContext();
  const pathname = usePathname();

  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center">
            {data?.navbar?.menus?.map((navItem) => (
              (navItem.submenus && navItem.submenus.length > 0) ? (
                <li key={navItem.id} className="relative group flex items-center gap-1 cursor-pointer text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                  {navItem.href.startsWith('/') ? (
                    <Link href={navItem.href} className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname.startsWith(navItem.href) ? 'text-accent after:scale-x-100' : ''}`}>
                      {navItem.label}
                    </Link>
                  ) : (
                    <ScrollLink
                      spy={true}
                      smooth={true}
                      to={navItem.href.startsWith('#') ? navItem.href.substring(1) : navItem.href} offset={-64}
                      duration={500}
                      className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left [&.is-active]:after:scale-x-100"
                      activeClass="text-accent is-active"
                    >
                      {navItem.label}
                    </ScrollLink>
                  )}
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  {/* Dropdown menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
                    <ul className="space-y-1">
                      {navItem.submenus.map(subLink => (
                        <li key={subLink.id}>
                          {subLink.href.startsWith('/') ? (
                            <Link href={subLink.href} className={`block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-lg cursor-pointer normal-case font-medium ${pathname === subLink.href ? 'text-accent' : ''}`}>
                              {subLink.label}
                            </Link>
                          ) : (
                            <ScrollLink
                              spy={true}
                              smooth={true}
                              to={subLink.href.startsWith('#') ? subLink.href.substring(1) : subLink.href} offset={-64}
                              duration={500}
                              className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-lg cursor-pointer normal-case font-medium"
                              onClick={() => subLink.id ? setActiveService(subLink.id.toString()) : setActiveService("")}
                            >
                              {subLink.label}
                            </ScrollLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={navItem.id} className="text-primary text-sm uppercase font-semibold tracking-[1.2px] after:content-['/'] after:mx-2 last:after:content-none">
                  {navItem.href.startsWith('/') ? (
                    <Link href={navItem.href} className={`cursor-pointer relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-accent after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === navItem.href ? 'text-accent after:scale-x-100' : ''}`}>
                      {navItem.label}
                    </Link>
                  ) : (
                    <ScrollLink
                      spy={true}
                      smooth={true}
                      to={navItem.href.startsWith('#') ? navItem.href.substring(1) : navItem.href}
                      offset={-64}
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
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <NavMobileMenu navigationLinks={data} />
        </div>
      </div>

    </header>
  );
};

export default Header;