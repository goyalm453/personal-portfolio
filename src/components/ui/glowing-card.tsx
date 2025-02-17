"use client" 

import * as React from "react"
import { cn } from "../../lib/utils"

interface GridBackgroundProps {
  title: string
  description: string
  showAvailability?: boolean
  className?: string
  children?: React.ReactNode
}

export function GridBackground({
  title,
  description,
  showAvailability = true,
  className,
  children
}: GridBackgroundProps) {
  return (
    <div 
      className={cn(
        'px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 rounded-md relative mx-auto flex items-center justify-center w-full',
        className
      )}
      style={{
        backgroundColor: 'rgba(15, 15, 15, 1)',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <div 
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full absolute shadow-[0_0_15px] shadow-current z-10 bg-current"
        style={{
          animation: `
            border-follow 6s linear infinite,
            color-change 6s linear infinite
          `
        }}
      />
      <div 
        className="absolute inset-0 border-2 rounded-md"
        style={{
          animation: 'border-color-change 6s linear infinite'
        }}
      />

      <div className="relative z-20 text-center w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 sm:mt-4 md:mt-5 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children}
        {showAvailability && (
          <div className="available-now text-[#20bb5a] text-xs sm:text-sm flex items-center justify-center mt-4 sm:mt-5">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#20bb5a] rounded-full inline-block mr-2 animate-pulse shadow-[0_0_8px_#20bb5a]" />
            Call Now
          </div>
        )}
      </div>
    </div>
  )
}