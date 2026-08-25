import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../../utils/soundEffects';

export const FestiveButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'gold' | 'outline' | 'glass'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  disabled = false,
  className = '',
  playSound = true,
  type = 'button'
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (playSound) {
      soundManager.playChime();
    }
    if (onClick) onClick(e);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm md:text-base gap-2",
    lg: "px-8 py-4 text-base md:text-lg gap-2.5 font-bold shadow-xl"
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-festive-crimson via-festive-saffron to-festive-gold text-white shadow-festive-lg hover:shadow-gold-glow hover:brightness-110 border border-amber-300/40",
    gold:
      "bg-gradient-to-r from-festive-gold via-amber-400 to-festive-goldLight text-stone-900 shadow-festive hover:shadow-gold-glow hover:brightness-105 border border-amber-400",
    outline:
      "bg-white/80 hover:bg-amber-50/80 text-festive-kumkum border-2 border-festive-gold/70 shadow-sm hover:border-festive-crimson",
    glass:
      "glass-card text-festive-dark hover:bg-white/90 border border-amber-300/60 shadow-md hover:border-festive-gold"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {/* Subtle diagonal light shimmer sweep on hover */}
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default FestiveButton;
