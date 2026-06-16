'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 }
      case 'down': return { opacity: 0, y: -40 }
      case 'left': return { opacity: 0, x: 60 }
      case 'right': return { opacity: 0, x: -60 }
      case 'none': return { opacity: 0 }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case 'left':
      case 'right': return { opacity: 1, x: 0 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
