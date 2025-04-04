import Link from "next/link";
import clsx from "clsx";

const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles = "gap-1 font-medium transition cursor-pointer";
  const variants = {
    primary:
      "flex items-center  justify-center bg-amber-500 text-white hover:bg-amber-400 rounded-lg ",
    secondary:
      "flex items-center  justify-center bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500",
    outline:
      "inline-flex items-center justify-center border border-gray-100 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-amber-500",
    danger:
      "flex items-center  justify-center bg-red-500 text-white hover:bg-red-400",
    transparently:
      "flex items-center justify-center flex-nowrap bg-transpanent text-lg",
    icon: "w-9 h-9 rounded-full flex items-center justify-center  bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-pointer",
    dashboardNav:
      "flex items-center justify-start text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded ",
  };

  // size
  const sizes = {
    sm: "px-2 text-sm",
    md: "px-3 py-1 text-base",
    lg: "px-4 py-2 text-lg",
    icon: "px-2",
    none: "",
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className, {
    "opacity-50 cursor-not-allowed": disabled,
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
