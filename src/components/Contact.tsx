import { RiMailFill, RiPhoneFill } from "react-icons/ri";

const Contact = () => {
    return (
        <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+15551234567" className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiPhoneFill size={16} />
                <span>+1 (555) 123-4567</span>
            </a>
            <a href="mailto:contact@digilink.com" className='flex items-center gap-2 hover:text-secondary-foreground transition-colors'>
                <RiMailFill size={16} />
                <span>contact@digilink.com</span>
            </a>
        </div>
    )
}

export default Contact