import Link from "next/link";
import clsx from "clsx"; // 用來動態組合 className

const Button = ({
  href,
  onClick,
  children,
  variant = "primary", // 預設是 primary 樣式
  size = "md", // 預設是 md 尺寸
  icon: Icon, // 圖標
  iconPosition = "left", // 圖標位置（left/right）
  className = "", // 允許自訂 class
  disabled = false, // 是否禁用
  ...props
}) => {
  // 不同的 variant 樣式
  const baseStyles = "gap-1 font-medium transition cursor-pointer";
  const variants = {
    primary:
      "flex items-center  justify-center bg-amber-500 text-white hover:bg-amber-400 rounded-lg ",
    secondary:
      "flex items-center  justify-center bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500",
    outline:
      "flex items-center  justify-center border border-gray-300 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
    danger:
      "flex items-center  justify-center bg-red-500 text-white hover:bg-red-400",
    transparently:
      "flex items-center justify-center flex-nowrap bg-transpanent text-lg",
    icon: "rounded-full flex items-center justify-center  bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-pointer",
    dashboardNav:
      "flex items-center justify-start text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded ",
  };

  // size
  const sizes = {
    sm: "px-2 text-sm",
    md: "px-3 py-1 text-base",
    lg: "px-5 py-2 text-lg",
    icon: "px-2",
    none: "",
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className, {
    "opacity-50 cursor-not-allowed": disabled, // 禁用時變灰
  });

  const content = (
    <>
      {iconPosition === "left" && Icon && <Icon />}
      {children}
      {iconPosition === "right" && Icon && <Icon />}
    </>
  );

  return href ? (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
