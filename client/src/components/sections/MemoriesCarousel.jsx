import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import FestiveButton from '../common/FestiveButton';
import { memoriesData } from '../../data/defaultData';
import { Sparkles, ChevronLeft, ChevronRight, Heart, PlusCircle, MessageSquare } from 'lucide-react';

export const MemoriesCarousel = ({ showToast }) => {
  const [memories, setMemories] = useState(memoriesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedMemories, setLikedMemories] = useState({});

  // New memory form state
  const [newTitle, setNewTitle] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newTag, setNewTag] = useState('Childhood Secret');

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const toggleLike = (id) => {
    setLikedMemories((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSnippet.trim()) return;

    const newMemory = {
      id: Date.now(),
      tag: newTag,
      title: newTitle.trim(),
      snippet: newSnippet.trim(),
      quote: newQuote.trim() || `"${newSnippet.trim()}"`,
      emoji: '💖',
      image: 'https://images.unsplash.com/photo-1609252925148-b0f1b515e111?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-amber-50'
    };

    setMemories([newMemory, ...memories]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewSnippet('');
    setNewQuote('');
    if (showToast) showToast('💖 Your sibling memory note has been added!');
  };

  return (
    <section id="memories" className="py-20 md:py-28 relative bg-[#FAF5EE] overflow-hidden">
      {/* Decorative flourishes */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <SectionHeader
              hindiBadge="खट्टी-मीठी यादों का पिटारा"
              badge="Brother & Sister Nostalgia"
              title="Cherished Sibling Memories"
              subtitle="From hilarious childhood remote fights to the unspoken bond of strength, explore the candid moments that make siblinghood eternal."
              center={false}
              className="mb-0 md:mb-0"
            />
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <FestiveButton
              variant="outline"
              size="sm"
              icon={PlusCircle}
              onClick={() => setIsModalOpen(true)}
            >
              Add Your Memory
            </FestiveButton>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/90 border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 transition-colors shadow-sm"
                aria-label="Previous memory"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/90 border border-amber-300 flex items-center justify-center text-stone-700 hover:bg-amber-100 transition-colors shadow-sm"
                aria-label="Next memory"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Cards Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.slice(currentIndex, currentIndex + 3).concat(
            currentIndex + 3 > memories.length
              ? memories.slice(0, (currentIndex + 3) % memories.length)
              : []
          ).map((item, idx) => {
            const isLiked = likedMemories[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <GlassCard className="h-full flex flex-col justify-between border border-amber-300/80 shadow-md hover:shadow-xl bg-white/90 overflow-hidden p-0">
                  {/* Photo Header */}
                  {item.image && (
                    <div className="h-36 w-full overflow-hidden relative bg-amber-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/25" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-festive-kumkum shadow-sm border border-amber-200">
                          {item.tag}
                        </span>
                      </div>
                      <span className="absolute top-3 right-3 text-2xl drop-shadow-md">
                        {item.emoji}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-festive-dark mb-1.5">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                        {item.snippet}
                      </p>

                      <blockquote className="p-3 rounded-2xl bg-amber-50/80 border-l-3 border-festive-gold text-xs italic font-serif text-stone-700">
                        "{item.quote}"
                      </blockquote>
                    </div>

                    <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-festive-gold" /> Timeless Bond
                      </span>
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
                          isLiked ? 'text-festive-crimson bg-red-50 font-bold' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-festive-crimson' : ''}`} />
                        <span>{isLiked ? 'Loved' : 'Relatable'}</span>
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {memories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === i ? 'w-8 bg-festive-crimson' : 'w-2 bg-amber-200'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white rounded-3xl p-6 md:p-8 border border-amber-300 shadow-2xl relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-sm p-2 rounded-full bg-amber-50"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📝</span>
              <h3 className="text-xl font-heading font-bold text-festive-crimson">
                Add Sibling Memory Note
              </h3>
            </div>

            <form onSubmit={handleAddMemory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Memory Category / Tag
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white"
                >
                  <option value="Childhood Mischief">Childhood Mischief</option>
                  <option value="Sweet Memory">Sweet Memory</option>
                  <option value="Rakhi Celebrations">Rakhi Celebrations</option>
                  <option value="Unspoken Support">Unspoken Support</option>
                  <option value="Long Distance Bond">Long Distance Bond</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Great Ice Cream Heist"
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Short Memory Story
                </label>
                <textarea
                  required
                  rows={3}
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  placeholder="Tell us what happened..."
                  maxLength={250}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <FestiveButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Post Memory Card
                </FestiveButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default MemoriesCarousel;
