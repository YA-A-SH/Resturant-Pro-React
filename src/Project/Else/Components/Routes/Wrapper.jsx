// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", scale: 1.02 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
