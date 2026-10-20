import React from 'react';

interface ScriptHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  showUnderline?: boolean;
}

export const ScriptHeading: React.FC<ScriptHeadingProps> = ({
  as: Component = 'h2',
  children,
  className = '',
  showUnderline = true,
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Component
        className="font-display font-bold text-fluid-h2 text-[#111111] leading-tight pb-2"
        style={{ fontFamily: "'Dancing Script', cursive, sans-serif" }}
      >
        {children}
      </Component>
      {showUnderline && (
        <span
          className="absolute left-0 bottom-0 w-full h-[4px] bg-[#9CBF77] rounded-[2px]"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
