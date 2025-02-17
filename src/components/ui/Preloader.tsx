import React from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

const DiceFace: React.FC<{
  dots: number;
  color: string;
  delay: number;
}> = ({ dots, color, delay }) => {
  const renderDots = () => {
    switch (dots) {
      case 1:
        return (
          <div className="flex justify-center items-center w-full h-full">
            <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between w-full h-full">
            <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            <div className={`dot w-2 h-2 rounded-full self-end`} style={{ background: color }} />
          </div>
        );
      case 3:
        return (
          <div className="flex justify-between w-full h-full">
            <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            <div className={`dot w-2 h-2 rounded-full self-center`} style={{ background: color }} />
            <div className={`dot w-2 h-2 rounded-full self-end`} style={{ background: color }} />
          </div>
        );
      case 4:
        return (
          <div className="flex justify-between w-full h-full">
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex justify-between w-full h-full">
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
            <div className="flex flex-col justify-center">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex justify-between w-full h-full">
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
            <div className="flex flex-col justify-between">
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
              <div className={`dot w-2 h-2 rounded-full`} style={{ background: color }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-12 h-12 p-2 rounded opacity-0"
      style={{
        border: `2px solid ${color}`,
        animation: `waves 5s ${delay}s linear infinite`
      }}
    >
      {renderDots()}
    </div>
  );
};

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  const diceColors = [
    '#F44336', // Red
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-['Crafty_Girls']">
      <div className="flex gap-3 mb-12">
        {[1, 2, 3, 4, 5, 6].map((dots, index) => (
          <DiceFace
            key={dots}
            dots={dots}
            color={diceColors[index]}
            delay={index * 0.2}
          />
        ))}
      </div>
      <p className="text-white tracking-[4px] text-lg">Wait, please...</p>
    </div>
  );
};

export default Preloader;