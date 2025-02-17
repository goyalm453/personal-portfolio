import React from 'react';

interface TapeScrollProps {
  items: string[];
  backgroundColor?: string;
  textColor?: string;
}

export const TapeScroll: React.FC<TapeScrollProps> = ({
  items,
  backgroundColor = 'bg-cyan-400',
  textColor = 'text-black'
}) => {
  const duplicatedItems = [...items, ...items]; // Duplicate items for seamless scrolling

  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-[120%] -ml-[10%] transform -rotate-3 my-12">
        {/* Main tape container */}
        <div className={`${backgroundColor} py-3 relative w-full`}>
          {/* Left inner shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          
          {/* Right inner shadow */}
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
          
          {/* Content */}
          <div className="tape-scroll-container whitespace-nowrap relative">
            {duplicatedItems.map((item, index) => (
              <span
                key={index}
                className={`inline-block mx-4 text-lg font-medium ${textColor}`}
              >
                {item} <span className="mx-2">★</span>
              </span>
            ))}
          </div>
          
          {/* Subtle edge highlights */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20"></div>
        </div>
      </div>
    </div>
  );
};