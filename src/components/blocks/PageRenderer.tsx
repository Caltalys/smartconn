import Hero from '@/components/sections/Hero';
// Import các section component khác sẽ được thêm vào đây
import About from '@/components/sections/About';
import { AnySection } from '@/types/strapi/page';
import Advantages from '../sections/Advantages';
import Blog from '../sections/Blog';
import Partners from '../sections/Partners';
import Services from '../sections/Services';

interface PageRendererProps {
    sections: AnySection[];
}

/**
 * Component này chịu trách nhiệm render một danh sách các section
 * từ Dynamic Zone của Strapi. Nó hoạt động như một "bộ định tuyến"
 * ở tầng giao diện, chọn component React phù hợp để render
 * dựa trên thuộc tính `__component` của mỗi section.
 */
const PageRenderer = ({ sections }: PageRendererProps) => {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <main>
            {sections.map((section) => {
                const key = `${section.__component}-${section.id}`;

                switch (section.__component) {
                    case 'sections.hero':
                        // Dữ liệu section đã được map ở tầng API,
                        // nên ta có thể truyền thẳng vào component.
                        return <Hero key={key} data={section} />;

                    case 'sections.about':
                        return <About key={key} data={section} />;

                    case 'sections.advantages':
                        return <Advantages key={key} data={section} />;

                    case 'sections.services':
                        return <Services key={key} data={section} />;

                    case 'sections.partners':
                        return <Partners key={key} data={section} />;

                    case 'sections.blog':
                        return <Blog key={key} data={section} />;

                    default:
                        // Log một cảnh báo ở môi trường development nếu gặp section không xác định
                        if (process.env.NODE_ENV === 'development') {
                            // TypeScript đã thu hẹp kiểu của `section` thành `never` vì tất cả các
                            // trường hợp đã biết trong `AnySection` đã được xử lý.
                            // Để log ra `__component` của một section không xác định (có thể tồn tại lúc runtime),
                            // chúng ta cần ép kiểu nó về một kiểu rộng hơn để truy cập thuộc tính.
                            console.warn(`PageRenderer: Không tìm thấy component cho section loại "${(section as { __component: string }).__component}".`);
                        }
                        return null;
                }
            })}
        </main>
    );
};

export default PageRenderer;