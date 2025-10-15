import { motion } from "framer-motion";
import classNames from "classnames";

interface IClickAnimation {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  stopPropagation?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
}

const ClickAnimation = ({
  children,
  onClick,
  className,
  stopPropagation,
  disabled,
  loading,
  type = "button",
  title,
}: IClickAnimation) => {
  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.();
  };
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={classNames(`${className}`, {
        "pointer-events-none opacity-30": disabled,
        "animate-pulse": loading,
      })}
      disabled={disabled || loading}
      type={type}
      title={title}
    >
      {children}
    </motion.button>
  );
};

export default ClickAnimation;
