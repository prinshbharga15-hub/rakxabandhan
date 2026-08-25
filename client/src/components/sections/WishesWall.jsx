import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import { fetchWishes, likeWishApi } from '../../services/api';
import { defaultWishes } from '../../data/defaultData';
import { soundManager } from '../../utils/soundEffects';
import { Heart, Sparkles, Filter, TrendingUp, Clock } from 'lucide-react';

export const WishesWall = ({ refreshTrigger, showToast }) => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular'

  const loadWishes = async () => {
    try {
      setLoading(true);
      const res = await fetchWishes({ category: filterCategory, sort: sortBy });
      if (res && res.data && res.data.length > 0) {
        setWishes(res.data);
      } else {
        // Fallback default wishes
        setWishes(defaultWishes);
      }
    } catch (err) {
      console.warn('Using local default wishes:', err.message);
      setWishes(defaultWishes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishes();
  }, [filterCategory, sortBy, refreshTrigger]);

  const handleLike = async (id) => {
    soundManager.playChime();

    // Optimistic UI update
    setWishes((prev) =>
      prev.map((w) => (w._id === id ? { ...w, likes: (w.likes || 0) + 1, userLiked: true } : w))
    );

    try {
      await likeWishApi(id);
      if (showToast) showToast('💖 Blessing sent to the wish!');
    } catch (err) {
      console.warn('Like recorded locally:', err.message);
    }
  };

  return (
    <section className="py-16 md:py-24 relative bg-[#FAF5EE] overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="वैश्विक रक्षाबंधन शुभकामना वीथिका"
          badge="Live Community Wall"
          title="Community Wishes Wall"
          subtitle="Explore heartfelt prayers and cheerful greetings shared by brothers and sisters around the globe. Send a sacred blessing to light up their celebration."
        />

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-amber-300 shadow-sm max-w-5xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1 pl-2 pr-1">
              <Filter className="w-3.5 h-3.5 text-festive-gold" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Wishes' },
              { id: 'heartfelt', label: 'Heartfelt' },
              { id: 'funny', label: 'Playful' },
              { id: 'poetic', label: 'Poetic' },
              { id: 'blessing', label: 'Blessings' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterCategory === cat.id
                    ? 'bg-festive-crimson text-white shadow-xs'
                    : 'text-stone-600 hover:bg-amber-100/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSortBy('latest')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                sortBy === 'latest'
                  ? 'bg-amber-200 text-stone-900 font-bold'
                  : 'text-stone-600 hover:bg-amber-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Latest
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                sortBy === 'popular'
                  ? 'bg-amber-200 text-stone-900 font-bold'
                  : 'text-stone-600 hover:bg-amber-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Most Loved
            </button>
          </div>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col justify-between border border-amber-200/80 shadow-md hover:shadow-xl bg-white/90">
                <div>
                  {/* Sender to Recipient header */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-100">
                    <div>
                      <h4 className="text-xs font-bold text-festive-dark flex items-center gap-1">
                        <span className="text-festive-crimson">{wish.senderName}</span>
                        <span className="text-stone-400 font-normal">to</span>
                        <span className="text-festive-gold">{wish.recipientName}</span>
                      </h4>
                      <span className="text-[10px] text-stone-500 font-medium">
                        {wish.relationship}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-festive-kumkum">
                      {wish.category}
                    </span>
                  </div>

                  {/* Message body */}
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-serif italic mb-4">
                    "{wish.message}"
                  </p>
                </div>

                {/* Footer with Like / Blessing Counter */}
                <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[10px] text-stone-400">
                    {new Date(wish.createdAt || Date.now()).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>

                  <button
                    onClick={() => handleLike(wish._id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                      wish.userLiked
                        ? 'bg-red-50 border-festive-crimson text-festive-crimson font-bold shadow-xs'
                        : 'bg-white/80 border-amber-200 text-stone-600 hover:border-festive-crimson hover:text-festive-crimson'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wish.userLiked ? 'fill-festive-crimson' : ''}`} />
                    <span>{wish.likes || 0}</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
