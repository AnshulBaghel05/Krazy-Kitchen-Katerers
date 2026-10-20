import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  asLink = false,
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  // Pill buttons non-negotiable, min touch target 44px
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full min-h-[44px] transition-all duration-200 cursor-pointer text-center select-none whitespace-nowrap active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'px-5 py-2 text-sm',
    default: 'px-7 py-2.5 text-base',
    lg: 'px-9 py-3.5 text-lg font-bold',
  }[size];

  // Colors:
  // Primary: --cta #EE9B3B, text #111111 (ensures 4.5:1+ contrast against orange), hover: darken 8% (#D98826)
  // Dark: --black #0A0A0A, text #FFFFFF, hover: #222222
  // Outline: border 1px solid #0A0A0A, text #0A0A0A, hover: bg-[#0A0A0A] text-white
  const variantStyles = {
    primary: 'bg-[#EE9B3B] text-[#111111] hover:bg-[#D98826]',
    dark: 'bg-[#0A0A0A] text-white hover:bg-[#222222]',
    outline: 'border border-[#0A0A0A] text-[#0A0A0A] bg-transparent hover:bg-[#0A0A0A] hover:text-white',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (asLink && href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
