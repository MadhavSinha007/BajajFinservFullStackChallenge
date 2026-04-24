// components/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  variant = "primary",
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-500",
    secondary:
      "bg-amber-400 hover:bg-amber-500 text-neutral-900 shadow-sm focus:ring-amber-400",
    outline:
      "bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 focus:ring-neutral-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 
            0 0 5.373 0 12h4zm2 5.291A7.962 
            7.962 0 014 12H0c0 3.042 1.135 
            5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;