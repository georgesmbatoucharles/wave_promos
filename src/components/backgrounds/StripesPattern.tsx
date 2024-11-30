import React from 'react';

export const StripesPattern: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 w-96 h-96 -z-10">
      <div className="w-full h-full flex flex-col gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="h-2 bg-yellow-300 opacity-20"
            style={{ width: `${100 - (i * 8)}%`, marginLeft: 'auto' }}
          />
        ))}
      </div>
    </div>
  );
};