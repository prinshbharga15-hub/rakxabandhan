import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-md bg-white/95 backdrop-blur-md border border-amber-300 shadow-2xl rounded-2xl p-4 flex items-start gap-3"
      >
        <div className="flex-shrink-0 mt-0.5">
          {type === 'success' ? (
            <Sparkles className="w-5 h-5 text-festive-gold" />
          ) : (
            <AlertCircle className="w-5 h-5 text-festive-crimson" />
          )}
        </div>
        <div className="flex-1 text-xs md:text-sm font-medium text-stone-800">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
