import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <div className="flex items-center">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 20C4 20 7 16 10 16C13 16 15 20 18 20C21 20 24 16 28 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12C4 12 7 8 10 8C13 8 15 12 18 12C21 12 24 8 28 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-2xl font-bold ml-2">Wave</span>
    </div>
  );
};