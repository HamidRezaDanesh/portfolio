// ⚡ این فایل Framer Motion رو از 381KB به ~30KB میرسونه
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ReactNode } from 'react';

// ⚡ Wrapper برای LazyMotion
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// ⚡ Export کردن m (نه motion!)
export { m };

// ⚡ Export همه چیزی که نیاز داری
export {
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';

// ⚡ Export types
export type { Variants } from 'framer-motion';