import { RiMailFill, RiPhoneFill } from "react-icons/ri";

const Contact = () => {
    return (
        <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+84 905555569" className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiPhoneFill size={16} />
                <span>+84 905555569</span>
            </a>
            <a href="mailto:info@smartcomsolutions.vn" className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiMailFill size={16} />
                <span>info@smartcomsolutions.vn</span>
            </a>
        </div>
    )
}

export default Contact