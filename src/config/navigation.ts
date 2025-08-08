export const servicesSubMenu = [
    { id: "it_solutions", href: "services" }, // href là ID của section để cuộn tới
    { id: "training", href: "services" },
    { id: "digital_marketing", href: "services" },
];

export const navLinks = [
    { href: 'home', id: "home" },
    { href: '/about', id: "about" },
    { href: 'services', id: "services", submenu: servicesSubMenu },
    { href: 'footer', id: "contact" }
    // { href: 'works', id: "works" },
    // { href: 'testimonials', id: "testimonials" },
    // { href: 'faq', id: "faq" },
    // { href: 'blog', id: "blog" },
     { href: '/categories', id: "categories" },
];