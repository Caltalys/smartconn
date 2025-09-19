'use client';

import Image from 'next/image';
import * as RiIcons from 'react-icons/ri';
import { Icon } from '@/types/strapi/elements/icon';

// Cần thiết cho việc tải icon động
type IconMap = {
    [key: string]: React.ComponentType<any>;
};

interface DynamicIconProps {
    icon: Icon | null;
    /** Văn bản thay thế cho alt của ảnh. */
    altText: string;
    /** Các lớp CSS cho thẻ icon/svg. Mặc định là 'w-8 h-8'. */
    className?: string;
    /** Component thay thế để render nếu không có icon. */
    fallback?: React.ReactNode;
}

/**
 * Render một icon một cách linh động dựa trên dữ liệu được cung cấp.
 * Hỗ trợ render từ URL ảnh, nội dung SVG, hoặc tên từ thư viện 'react-icons/ri'.
 */
const DynamicIcon = ({ icon, altText, className = 'w-8 h-8', fallback = null }: DynamicIconProps) => {
    if (!icon) {
        return fallback;
    }

    // 1. Render từ URL ảnh
    if (icon.imageUrl) {
        return (
            <Image
                src={icon.imageUrl}
                alt={icon.name || altText}
                width={32}
                height={32}
                className="object-contain"
            />
        );
    }

    // 2. Render từ nội dung SVG
    if (icon.svgContent) {
        return <div className={`${className} text-primary [&>svg]:w-full [&>svg]:h-full`} dangerouslySetInnerHTML={{ __html: icon.svgContent }} />;
    }

    // 3. Render từ thư viện react-icons
    if (icon.iconName) {
        const IconComponent = (RiIcons as IconMap)[icon.iconName];
        if (IconComponent) {
            return <IconComponent className={className} />;
        }
    }

    // 4. Fallback nếu không có nguồn icon hợp lệ
    return fallback;
};

export default DynamicIcon;