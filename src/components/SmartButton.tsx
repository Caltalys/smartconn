'use client';
import { RiArrowRightUpLine } from "react-icons/ri"
import { Link as ScrollLink } from "react-scroll"

const SmartButton = ({ text, href }: { text: string; href: string }) => {
    // The `to` prop for ScrollLink should be the ID of the target, not a CSS selector like '#contact'.
    // We'll remove the '#' if it exists.
    const targetId = href.startsWith("#") ? href.substring(1) : href;

    return (
        <ScrollLink
            to={targetId}
            spy={true}
            smooth={true}
            offset={-64}
            duration={500}
            // Bằng cách sử dụng container relative và icon absolute,
            // chúng ta có thể căn giữa văn bản trong toàn bộ button, giúp layout cân đối hơn.
            className="relative flex items-center justify-center group bg-secondary cursor-pointer w-[180px] h-14 min-w-[180px] lg:w-[210px] lg:h-14 lg:min-w-[200px]"
        >
            <span className="font-primary font-bold text-primary uppercase text-sm lg:text-md tracking-[1.2px] text-center pl-2 pr-12 lg:pl-4 lg:pr-14">
                {text}
            </span>
            <div className="absolute top-1/2 -translate-y-1/2 right-1 lg:right-1.5 flex items-center justify-center bg-secondary-foreground w-10 h-10 lg:w-11 lg:h-11">
                <RiArrowRightUpLine className="text-white text-lg group-hover:rotate-45 transition-all duration-300 lg:text-xl" />
            </div>
        </ScrollLink>
    )
}

export default SmartButton