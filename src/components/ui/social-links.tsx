"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface Social {
  name: string
  image: string
  url: string
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[]
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
  const [rotation, setRotation] = React.useState<number>(0)
  const [clicked, setClicked] = React.useState<boolean>(false)

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  }

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 200)
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [clicked])

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-0 w-full", 
        className
      )}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-2 sm:px-3 md:px-5 py-1 sm:py-2 transition-opacity duration-200",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-50"
              : "opacity-100"
          )}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name)
            setRotation(Math.random() * 20 - 10)
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setClicked(true)
          }}
        >
          <span className="block text-sm sm:text-base md:text-lg font-medium">{social.name}</span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="size-8 sm:size-12 md:size-16"
                  initial={{
                    y: -20,
                    rotate: rotation,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{ 
                    y: { 
                      xs: -30, 
                      sm: -40, 
                      md: -50 
                    }[window.innerWidth < 640 ? 'xs' : window.innerWidth < 768 ? 'sm' : 'md'], 
                    opacity: 1, 
                    filter: "blur(0px)" 
                  }}
                  exit={{ y: -20, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  )
}