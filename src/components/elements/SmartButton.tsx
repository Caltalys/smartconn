import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';

interface SmartButtonProps {
  text: string;
  href: string;
  className?: string;
}

const SmartButton = ({ text, href, className = '' }: SmartButtonProps) => {
  return (
    <Link href={href} className={`relative flex items-center justify-center group bg-secondary cursor-pointer w-[180px] h-12 min-w-[180px] lg:w-[210px] lg:h-14 lg:min-w-[200px] shadow-[3px_3px_0px_0px_#148ACA] ${className}`}>
      <span className="font-primary font-bold text-primary uppercase text-sm lg:text-md tracking-[1.2px] text-center pl-2 pr-12 lg:pl-4 lg:pr-14">
        {text}
      </span>
      <div className="absolute top-1/2 -translate-y-1/2 right-1 lg:right-1.5 flex items-center justify-center bg-secondary-foreground w-10 h-10 lg:w-11 lg:h-11">
        <RiArrowRightUpLine className="text-white text-lg group-hover:rotate-45 transition-all duration-300 lg:text-xl" />
      </div>
    </Link>
  );
};

export default SmartButton;