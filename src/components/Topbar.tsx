
import { section } from "framer-motion/client";
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

const Topbar = () => {
  return (
    <section id="home" className="py-1 bg-gradient-to-t from-secondary to-secondary/60 backdrop-blur-sm text-primary text-sm">
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          {/* phone, email */}
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

          {/* social media links */}
          <div className='flex items-center gap-4 mx-auto lg:mx-0'>
            <a href="#" aria-label="Facebook" className='text-primary hover:text-secondary-foreground transition-colors border-1'>
              <RiFacebookFill size={16} />
            </a>
            <a href="#" aria-label="Twitter" className='text-primary hover:text-secondary-foreground transition-colors border-1'>
              <RiTwitterFill size={16} />
            </a>
            <a href="#" aria-label="Instagram" className='text-primary hover:text-secondary-foreground transition-colors border-1'>
              <RiInstagramFill size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className='text-primary hover:text-secondary-foreground transition-colors border-1'>
              <RiLinkedinFill size={16} />
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Topbar;