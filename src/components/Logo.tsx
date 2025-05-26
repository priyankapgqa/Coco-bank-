
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-baroda-gold flex items-center justify-center">
        <span className="font-bold text-baroda-maroon text-lg">C</span>
      </div>
      <span className="font-bold text-lg text-baroda-maroon whitespace-nowrap">COCO BANK IN FEDERAL</span>
    </div>
  );
};

export default Logo;
