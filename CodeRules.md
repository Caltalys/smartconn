### **Bộ quy tắc dành cho AI Code Generation - Frontend (Next.js & TypeScript)**

#### **Phần 1: Tổng quan & Nguyên tắc cốt lõi**

1. **Kiến trúc Phân lớp (Layered-like Architecture)**: Dự án tuân thủ một kiến trúc phân lớp rõ ràng để tách biệt các mối quan tâm:
   - **Presentation Layer (`/components`)**: Chứa các React component, chỉ chịu trách nhiệm hiển thị giao diện người dùng (UI).
   - **Data Layer (`/lib/api`)**: Chứa các hàm chịu trách nhiệm giao tiếp với API bên ngoài (Strapi), bao gồm việc gọi API, xử lý lỗi và ánh xạ dữ liệu.
   - **Type Layer (`/types`)**: Định nghĩa tất cả các kiểu dữ liệu (data structures) của ứng dụng, tạo ra một "hợp đồng" vững chắc giữa các lớp.
2. **Tách biệt mối quan tâm (Separation of Concerns)**:
   - **Component "Ngu" (Dumb Components)**: Các component không được phép chứa logic gọi API. Chúng chỉ nhận dữ liệu qua `props` và hiển thị.
   - **Logic dữ liệu tập trung**: Toàn bộ logic gọi và biến đổi dữ liệu từ API phải được đóng gói trong thư mục `/lib/api`.
3. **Thành phần hoá (Composition)**: Luôn ưu tiên việc chia nhỏ các component lớn thành các component con, chuyên biệt và có thể tái sử dụng. Điều này giúp code dễ đọc, dễ quản lý và tối ưu hóa hiệu suất render.
4. **An toàn kiểu (Type Safety)**: Tận dụng tối đa sức mạnh của TypeScript. Mọi hàm, component, và biến phải được định kiểu rõ ràng để phát hiện lỗi sớm và giúp code tự mô tả.

#### **Phần 2: Ngôn ngữ & Quy ước chung**

2.1. **Ngôn ngữ**: * **Comments**: Sử dụng **Tiếng Việt có dấu** để giải thích các đoạn code phức tạp. * **Code**: Tên file, biến, hàm, interface, type phải là **tiếng Anh**, tuân thủ quy ước camelCase cho biến/hàm và PascalCase cho component/type/interface.

2.2. **Bất biến (Immutability)**: Dữ liệu từ API sau khi được ánh xạ và truyền vào component được coi là bất biến. Ưu tiên sử dụng `type` và `interface` thay vì `class`.

#### **Phần 3: Cấu trúc thư mục & Đặt tên**

Tuân thủ nghiêm ngặt cấu trúc và quy ước đặt tên sau:

3.1. **Cấu trúc thư mục**: 

- **API Calls**: `/lib/api/api-[entity].ts` (e.g., `api-footer.ts`) 
- **API Call Tổng hợp**: `/lib/api/global.ts` (cho các hàm gọi nhiều API cùng lúc) 
- **Types**: `/types/strapi/[entity].ts` (e.g., `footer.ts`) 
- **Components**: 
  - `/components/sections/`: Các khối giao diện lớn của một trang (e.g., `Footer.tsx`). 
  - `/components/blocks/`: Các component phức tạp, có thể có state riêng (e.g., `Header.tsx`, `NavMobileMenu.tsx`). 
  - `/components/elements/`: Các component nhỏ, tái sử dụng cao (e.g., `Logo.tsx`, `Button.tsx`). 
  - `/components/ui/`: Các component UI cơ bản từ thư viện (e.g., shadcn/ui). 
- **Component con**: Các component con của một component lớn nên được đặt trong thư mục con cùng tên (e.g., `/components/blocks/header/` chứa `DesktopNav.tsx`, `NavItem.tsx`).

3.2. **Quy ước đặt tên kiểu dữ liệu**: 

- **`Strapi[EntityName]`**: Kiểu dữ liệu **thô** từ API (đã qua transformer). Ví dụ: `StrapiFooter`. 
- **`[EntityName]`**: Kiểu dữ liệu **sạch**, đã được ánh xạ, sẵn sàng cho component. Ví dụ: `Footer`. 
- **`[EntityName]Response`**: Kiểu dữ liệu bao bọc của Strapi (`{ data: ..., meta: ... }`). Ví dụ: `FooterResponse`.

3.3. **Quy ước đặt tên hàm API**: 

- **`fetch[EntityName]`**: Hàm bất đồng bộ, gọi API và trả về dữ liệu đã được ánh xạ (`Promise<[EntityName] | null>`). Ví dụ: `fetchFooter`. 
- **`map[EntityName]`**: Hàm đồng bộ, nhận response thô và trả về dữ liệu sạch. Ví dụ: `mapFooter`.

#### **Phần 4: Lớp Dữ liệu (API Layer - `/lib/api`)**

4.1. **Hàm `fetch`**: 

- Luôn sử dụng `strapiClient` để tạo instance. 
- Luôn truyền `locale` vào cả `strapiClient(locale)` và tham số `find({ ...locale && { locale } })` để đảm bảo tính nhất quán. 
- ,Sử dụng `Promise.all` để thực thi các lệnh gọi song song khi cần lấy nhiều loại dữ liệu cho một trang (như trong `global.ts`). * Luôn bao bọc lệnh gọi API trong `try...catch`. Trong `catch`, log lỗi ra `console.error` và trả về `null` để không làm sập toàn bộ trang. 
- **Tối ưu hóa Query**: Chỉ `populate` những trường quan hệ (relation) hoặc component cần thiết. **Cấm tuyệt đối** sử dụng `populate: '*'`.

4.2. **Hàm `map`**: 

- Chịu trách nhiệm duy nhất là chuyển đổi `Strapi[EntityName]` thành `[EntityName]`. 
- Phải xử lý các trường hợp dữ liệu có thể là `null` hoặc `undefined` một cách an toàn. 
- Thực hiện các chuyển đổi cấu trúc cần thiết (e.g., `StrapiRawLink[]` thành `Link[]` với tên trường được đổi từ `text` sang `label`).

#### **Phần 5: Lớp Trình bày (Presentation Layer - `/components`)**

5.1. **Props & Data Flow**: 

- Component chỉ nhận dữ liệu đã được "làm sạch" (kiểu `[EntityName]`) qua props. 
- Luôn kiểm tra sự tồn tại của dữ liệu (`if (!data) return null;`) ở đầu component để tránh lỗi runtime.

5.2. **Tái cấu trúc (Refactoring)**: 

- Nếu một component JSX vượt quá 100-150 dòng, hãy xem xét ngay việc chia nó thành các component con. 
- Nếu một logic được lặp lại (ví dụ: render link cho desktop và mobile), hãy tạo một component con và tái sử dụng nó với các `className` khác nhau.

5.3. **Styling**: 

- Sử dụng hàm `cn` (từ `/lib/utils.ts`) để kết hợp các class name của Tailwind CSS một cách an toàn và linh hoạt, đặc biệt khi có các class điều kiện.

#### **Phần 6: Quản lý State**

6.1. **Server State**: Dữ liệu từ API được coi là Server State. Việc fetch dữ liệu này được thực hiện trong các Server Component (ví dụ: `layout.tsx`, `page.tsx`).

6.2. **Client State (UI State)**: 

- Sử dụng `useState`, `useReducer` cho các state tương tác giao diện cục bộ (e.g., trạng thái đóng/mở của menu). 
- Đối với state cần chia sẻ toàn cục, sử dụng React Context. Luôn tách biệt **Context cho State** và **Context cho Dispatch** (như `ActiveServiceContext`) để tối ưu hóa việc re-render. Các component chỉ cần cập nhật state sẽ dùng `useDispatchContext` và không bị render lại khi state thay đổi.

#### **Phần 7: Quy tắc sử dụng Git**

Sử dụng **Conventional Commits** để viết commit message.

- **Định dạng**: `<type>(<scope>): <subject>`
- Ví dụ:
  - `feat(header): Tách DesktopNav thành component riêng`
  - `fix(api): Thêm lại tham số locale vào hàm fetchFooter`
  - `refactor(footer): Chia nhỏ component Footer thành các phần con`
  - `docs(readme): Cập nhật hướng dẫn cài đặt dự án`