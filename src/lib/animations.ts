import { Variants } from "framer-motion";

/**
 * Variant cho các container chứa các item cần animation theo kiểu "stagger" (xuất hiện lần lượt).
 * Sử dụng `staggerChildren` để tạo độ trễ giữa các animation của phần tử con.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Variant cho các item xuất hiện từ dưới lên (fade in up).
 * Thường được sử dụng làm con của `staggerContainer`.
 */
export const fadeInUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

/**
 * Variant cho các item xuất hiện từ trái sang (fade in left).
 */
export const fadeInLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Variant cho các item xuất hiện từ phải sang (fade in right).
 */
export const fadeInRight: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
