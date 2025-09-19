import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  // Một danh sách tất cả các ngôn ngữ được hỗ trợ
  locales: routing.locales,

  // Được sử dụng khi không có ngôn ngữ nào khớp
  defaultLocale: routing.defaultLocale,

  // Không thêm tiền tố ngôn ngữ cho URL của ngôn ngữ mặc định
  localePrefix: "as-needed",
});

export const config = {
  // Bỏ qua tất cả các đường dẫn không cần quốc tế hóa. Ví dụ này bỏ qua các
  // thư mục "api", "_next" và tất cả các tệp có phần mở rộng (ví dụ: favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};