import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glowOnHover = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -4,
              boxShadow: glowOnHover
                ? '0 20px 35px -10px rgba(245, 158, 11, 0.25), 0 0 20px rgba(245, 158, 11, 0.15)'
                : '0 20px 35px -10px rgba(217, 119, 6, 0.15)'
            }
          : {}
      }
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`glass-card rounded-3xl p-6 md:p-8 transition-all duration-300 relative ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {/* Decorative corner mandala florets */}
      <div className="absolute top-2 left-2 text-[10px] text-amber-400/40 select-none pointer-events-none">
        ✦
      </div>
      <div className="absolute top-2 right-2 text-[10px] text-amber-400/40 select-none pointer-events-none">
        ✦
      </div>
      <div className="absolute bottom-2 left-2 text-[10px] text-amber-400/40 select-none pointer-events-none">
        ✦
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] text-amber-400/40 select-none pointer-events-none">
        ✦
      </div>

      {children}
    </motion.div>
  );
};

export default GlassCard;
