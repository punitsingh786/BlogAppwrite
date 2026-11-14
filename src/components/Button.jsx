export default function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600 hover:bg-indigo-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium duration-200 cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
