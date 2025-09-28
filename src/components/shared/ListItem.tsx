import DynamicIcon from "@/components/elements/DynamicIcon";
import Pretitle from "@/components/elements/Pretitle";
import { ListItemBlock } from "@/types/strapi/shared/list-item";
import { motion } from "framer-motion";
import { JSX, memo } from "react";

const ListItemComponent = ({ data }: { data: ListItemBlock }): JSX.Element | null => {
    const { pretitle, title, items } = data;

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="my-8">
            {(pretitle || title) && (
                <div className="text-center mb-12">
                    {pretitle && <Pretitle text={pretitle} center={true} />}
                    {title && <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">{title}</h2>}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-card p-6 rounded-lg text-center flex flex-col items-center border border-border shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {item.icon && <DynamicIcon icon={item.icon} altText={item.title} />}
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default memo(ListItemComponent);

