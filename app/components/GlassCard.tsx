'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'cyan';
  hoverScale?: number;
}

export function GlassCard({
  children,
  className = '',
  glowColor = 'purple',
  hoverScale = 1.02,
}: GlassCardProps) {
  const glowMap = {
    purple: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]',
    blue: 'hover:shadow-[0_0_40px_rgba(37,99,235,0.25)]',
    cyan: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]',
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/10
        transition-shadow duration-500
        ${glowMap[glowColor]}
        ${className}
      `}
      whileHover={{ scale: hoverScale }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
