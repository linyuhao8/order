export default function InputField({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  variant = "default",
}) {
  const variantStyles = {
    default:
      "py-1 px-3 text-gray-900 border border-gray-500 rounded-xl rounded-sm placeholder-gray-400 focus:ring-amber-500",
    primary:
      "border-blue-500 text-blue-900 placeholder-blue-400 focus:ring-blue-500",
    danger:
      "border-red-500 text-red-900 placeholder-red-400 focus:ring-red-500",
    login:
      "appearance-none block w-full px-4 py-4 border border-gray-500 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200",
  };

  const inputClassName = `appearance-none block w-full focus:outline-none transition duration-200 ${
    variantStyles[variant] || variantStyles.default
  } ${className}`;

  return (
    <div className={`mt-1 ${className}`}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  );
}
