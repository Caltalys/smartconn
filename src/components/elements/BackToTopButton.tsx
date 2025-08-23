'use client';

import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { RiArrowUpSLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: 'easeInOutQuad',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors"
                    aria-label="Scroll to top"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <RiArrowUpSLine size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTopButton;