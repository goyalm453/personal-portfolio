import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "../../lib/utils";

export const FollowerPointerCard = ({
    children,
    className,
    title,
  }: {
    children: React.ReactNode;
    className?: string;
    title?: string | React.ReactNode;
  }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [isInside, setIsInside] = useState<boolean>(false);
    const [hasHover, setHasHover] = useState<boolean>(false);
  
    useEffect(() => {
      // Check if the device supports hover
      const mediaQuery = window.matchMedia('(hover: hover)');
      setHasHover(mediaQuery.matches);
  
      const updateHoverCapability = (e: MediaQueryListEvent) => {
        setHasHover(e.matches);
      };
  
      mediaQuery.addEventListener('change', updateHoverCapability);
      return () => mediaQuery.removeEventListener('change', updateHoverCapability);
    }, []);
  
    useEffect(() => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    }, []);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (rect && hasHover) {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        x.set(e.clientX - rect.left + scrollX);
        y.set(e.clientY - rect.top + scrollY);
      }
    };
  
    const handleMouseLeave = () => {
      if (hasHover) {
        setIsInside(false);
      }
    };
  
    const handleMouseEnter = () => {
      if (hasHover) {
        setIsInside(true);
      }
    };
  
    return (
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        style={{
          cursor: hasHover ? "none" : "auto",
        }}
        ref={ref}
        className={cn("relative", className)}
      >
        <AnimatePresence>
          {isInside && hasHover && <FollowPointer x={x} y={y} title={title} />}
        </AnimatePresence>
        {children}
      </div>
    );
  };
  
  export const FollowPointer = ({
    x,
    y,
    title,
  }: {
    x: any;
    y: any;
    title?: string | React.ReactNode;
  }) => {
    const colors = [
      "rgb(14 165 233)", // sky-500
      "rgb(115 115 115)", // neutral-500
      "rgb(20 184 166)", // teal-500
      "rgb(34 197 94)", // green-500
      "rgb(59 130 246)", // blue-500
      "rgb(239 68 68)", // red-500
      "rgb(234 179 8)", // yellow-500
    ];
  
    return (
      <motion.div
        className="h-4 w-4 rounded-full absolute z-50"
        style={{
          top: y,
          left: x,
          pointerEvents: "none",
        }}
        initial={{
          scale: 1,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0,
          opacity: 0,
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          viewBox="0 0 16 16"
          className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
        </svg>
        <motion.div
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          className="px-2 py-2 text-white whitespace-nowrap min-w-max text-xs rounded-full"
        >
          {title || `William Shakespeare`}
        </motion.div>
      </motion.div>
    );
  };