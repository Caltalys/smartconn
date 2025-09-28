import DynamicIcon from "@/components/elements/DynamicIcon";
import Pretitle from "@/components/elements/Pretitle";
import { ListItemBlock } from "@/types/strapi/shared/list-item";
import clsx from "clsx";
import { motion } from "framer-motion";
import { JSX, memo } from "react";

const ListItemComponent = ({ data }: { data: ListItemBlock }): JSX.Element | null => {
    const { pretitle, title, items, itemJustify } = data;

    // Bản đồ ánh xạ giá trị `itemJustify` sang các lớp CSS của Tailwind
    const alignmentClasses = {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
    };

    // Lấy lớp CSS tương ứng, mặc định là 'center' nếu không có giá trị
    const alignment = alignmentClasses[itemJustify ?? "center"];

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

            <div className={clsx("flex flex-cols-1 md:flex-cols-2 lg:flex-cols-3 gap-8", alignment)}>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-card p-6 rounded-lg flex flex-col border border-border shadow-lg"
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
