import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  // eslint-disable-next-line no-unused-vars
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericPart = parseInt(value.replace(/[^\d]/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView || isNaN(numericPart)) return;

    animate(count, numericPart, {
      duration: 3.8,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

