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
            className="flex items-center group bg-secondary cursor-pointer w-[180px] h-[48px] min-w-[180px] pr-1 lg:w-[210px] lg:h-[54px] lg:min-w-[200px] lg:pr-1.5"
        >
            <span className="flex-1 text-center tracking-[1.2px] font-primary font-bold text-primary uppercase text-sm lg:text-md">
                {text}
            </span>
            <div className="flex items-center justify-center bg-secondary-foreground w-10 h-10 lg:w-11 lg:h-11">
                <RiArrowRightUpLine className="text-white text-lg group-hover:rotate-45 transition-all duration-300 lg:text-xl" />
            </div>
        </ScrollLink>
    )
}

export default SmartButton