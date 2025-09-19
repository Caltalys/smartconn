import { ReactNode } from "react";

export type ContactItem = {
    icon: ReactNode;
    text: string;
    href: string;
};

type ContactInfoListProps = {
    title: string | null;
    items: ContactItem[];
};

const ContactInfoList = ({ title, items }: ContactInfoListProps) => {
    return (
        <div className="flex flex-col gap-6 items-center md:items-start">
            {title && <h4 className="font-semibold text-lg">{title}</h4>}
            <ul className="flex flex-col gap-4 items-center md:items-start">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="text-accent text-xl mt-1">{item.icon}</div>
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactInfoList;