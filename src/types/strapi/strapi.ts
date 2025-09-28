/**
 * Đại diện cho một phiên bản file cụ thể (ví dụ: thumbnail, small, medium) trong Strapi.
 * Strapi có thể tạo ra nhiều kích thước cho một ảnh được tải lên.
 */
export interface File {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

/**
 * Chứa tất cả các định dạng/kích thước khác nhau của một file media.
 */
export interface Formats {
  thumbnail: File;
  medium: File;
  small: File;
  large?: File;
}

/**
 * Cấu trúc dữ liệu cho thông tin phân trang từ API Strapi.
 */
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Đối tượng "meta" chứa siêu dữ liệu cho một response từ API, thường là thông tin phân trang.
 */
export interface Meta {
  pagination?: Pagination;
}

/**
 * Interface cơ sở cho tất cả các "Component" trong Strapi.
 * Một component là một khối nội dung có thể tái sử dụng.
 */
export interface StrapiComponent {
  __component: string;
  id: number;
}

/**
 * Mở rộng từ `StrapiComponent`, đại diện cho một khối nội dung linh hoạt trong Dynamic Zone.
 * Cho phép chứa bất kỳ thuộc tính nào, hữu ích cho các component không cần định nghĩa tường minh.
 */
export interface StrapiBlock extends StrapiComponent {
  [key: string]: unknown;
}

/**
 * Interface cơ sở chứa các trường metadata chung nhất cho hầu hết các loại nội dung Strapi.
 * Phù hợp cho cả Single Types và Collection Types.
 */
export interface StrapiMetadata {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

/**
 * Interface cơ sở cho các thực thể nội dung chính trong Strapi (ví dụ: Article, Page, Media).
 * Chứa các trường siêu dữ liệu chung mà Strapi tự động thêm vào.
 * Thường dùng cho Collection Types.
 */
export interface StrapiEntity extends StrapiMetadata {
  documentId: string;
}

/**
 * Đại diện cho một đối tượng media hoàn chỉnh trong Media Library của Strapi.
 * Kế thừa từ `StrapiEntity` và thêm các thuộc tính đặc thù của file media.
 */
export interface BaseMedia extends StrapiComponent {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
}

/**
 * Cấu trúc dữ liệu cho các liên kết mạng xã hội.
 */
export interface SocialLinksData {
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
}

/** Cấu trúc dữ liệu cho thông tin liên hệ cơ bản. */
export interface ContactInfoData {
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
}

/**
 * Cấu trúc response chung cho các API trả về một đối tượng đơn lẻ (Single Type).
 * @template T Kiểu dữ liệu của đối tượng `data`.
 */
export interface StrapiResponse<T> {
  // For single types, the transformer flattens the data.
  data: T | null;
  meta?: Meta | null;
}

/**
 * Cấu trúc response chung cho các API trả về một danh sách (Collection Type).
 * @template T Kiểu dữ liệu của mỗi phần tử trong mảng `data`.
 */
export interface StrapiResponseCollection<T> {
  // The transformer flattens the 'attributes' so the data is an array of the entity itself.
  data: T[];
  meta: Meta;
}
