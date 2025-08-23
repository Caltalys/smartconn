import { FooterSection } from "@/lib/types";
import { RiMailFill, RiPhoneFill } from "react-icons/ri";

const Contact = ({ data }: { data?: FooterSection }) => {
    return (
        <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+84 905555569" className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiPhoneFill size={16} />
                <span>{data?.phone}</span>
            </a>
            <a href={`mailto:${data?.email}`} className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiMailFill size={16} />
                <span>{data?.email}</span>
            </a>
        </div>
    )
}

export default Contact