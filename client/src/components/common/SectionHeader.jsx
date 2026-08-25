import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({
  badge,
  hindiBadge,
  title,
  subtitle,
  center = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {/* Auspicious Badge */}
      {(badge || hindiBadge) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100/90 via-red-50 to-amber-100/90 border border-amber-300 shadow-sm text-xs font-semibold uppercase tracking-wider text-festive-kumkum mb-3.5`}
        >
          <span className="text-festive-saffron">🪔</span>
          {hindiBadge && <span className="font-hindi text-[13px]">{hindiBadge}</span>}
          {hindiBadge && badge && <span className="text-amber-400">•</span>}
          {badge && <span>{badge}</span>}
          <span className="text-festive-saffron">✨</span>
        </motion.div>
      )}

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-festive-dark tracking-tight leading-tight"
      >
        {title}
      </motion.h2>

      {/* Rangoli flourish underline divider */}
      <div className={`flex items-center gap-3 my-4 ${center ? 'justify-center' : 'justify-start'}`}>
        <span className="h-[1.5px] w-12 md:w-20 bg-gradient-to-r from-transparent via-festive-gold to-festive-crimson rounded-full" />
        <span className="text-festive-crimson text-sm animate-pulse">✦ ॐ ✦</span>
        <span className="h-[1.5px] w-12 md:w-20 bg-gradient-to-l from-transparent via-festive-gold to-festive-crimson rounded-full" />
      </div>

      {/* Subtitle / Description */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
