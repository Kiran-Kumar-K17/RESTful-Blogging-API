export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  const baseStyles =
    "px-6 py-2.5 rounded-full font-bold transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    outline:
      "border-2 border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};
