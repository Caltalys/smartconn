"use client";

import React from "react";
import NavMobileMenu from "../blocks/NavMobileMenu";
import { Navbar } from "@/types/strapi/sections/navbar";
import Logo from "../elements/Logo";
import DesktopNav from "./header/DesktopNav";

type HeaderProps = {
  data?: Navbar | null;
};

const Header = ({ data }: HeaderProps) => {
  return (
    <header className="bg-white backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav data={data} />

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <MemoizedNavMobileMenu data={data} />
        </div>
      </div>

    </header>
  );
};

const MemoizedNavMobileMenu = React.memo(NavMobileMenu);

export default Header;