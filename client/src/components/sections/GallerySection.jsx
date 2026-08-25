import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { fetchGallery, likeGalleryApi } from '../../services/api';
import { defaultGalleryImages } from '../../data/defaultData';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, Heart, Eye, X, Filter, Download, Share2 } from 'lucide-react';

export const GallerySection = ({ showToast }) => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [activeItem, setActiveItem] = useState(null); // Lightbox item
  const [loading, setLoading] = useState(true);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetchGallery(category);
      if (res && res.data && res.data.length > 0) {
        setItems(res.data);
      } else {
        let list = defaultGalleryImages;
        if (category !== 'all') {
          list = list.filter((i) => i.category === category);
        }
        setItems(list);
      }
    } catch (err) {
      console.warn('Using local gallery fallback:', err.message);
      let list = defaultGalleryImages;
      if (category !== 'all') {
        list = list.filter((i) => i.category === category);
      }
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, [category]);

  const handleLike = async (id, e) => {
    e.stopPropagation();
    soundManager.playChime();

    setItems((prev) =>
      prev.map((item) => (item.id === id || item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item))
    );

    try {
      await likeGalleryApi(id);
      if (showToast) showToast('💖 Loved photo!');
    } catch (err) {
      console.warn('Liked locally:', err.message);
    }
  };

  const categories = [
    { id: 'all', label: 'All Photos', emoji: '✨' },
    { id: 'siblings', label: 'Brothers & Sisters', emoji: '👫' },
    { id: 'sweets', label: 'Festive Sweets', emoji: '🍬' },
    { id: 'family', label: 'Family Reunions', emoji: '👨‍👩‍👧‍👦' },
    { id: 'rakhis', label: 'Designer Rakhis', emoji: '🧵' },
    { id: 'rituals', label: 'Pooja & Aarti', emoji: '🪔' },
    { id: 'decorations', label: 'Diyas & Decor', emoji: '🌸' }
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 relative bg-[#FAF5EE] overflow-hidden">
      {/* Decorative background flourishes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="उत्सव छवि वीथिका"
          badge="Festive Moments Gallery"
          title="Celebration Gallery"
          subtitle="Explore beautiful moments of brothers and sisters, delicious traditional Indian sweets, grand family gatherings, and designer artisan Rakhis."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                category === cat.id
                  ? 'bg-festive-crimson text-white border-festive-crimson shadow-md scale-105'
                  : 'bg-white/80 border-amber-200 text-stone-700 hover:bg-amber-100/70 hover:border-amber-300'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id || item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg border border-amber-200 bg-white cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              onClick={() => {
                soundManager.playChime();
                setActiveItem(item);
              }}
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-amber-50 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2 text-amber-100">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-4 bg-white/95 backdrop-blur-sm border-t border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-festive-saffron">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-festive-dark truncate max-w-[200px]">
                    {item.title}
                  </h4>
                </div>

                <button
                  onClick={(e) => handleLike(item.id || item._id, e)}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-festive-crimson p-1.5 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>{item.likes || 0}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-300 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[65vh] bg-stone-900 flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-festive-saffron">
                      {activeItem.category}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-festive-dark">
                      {activeItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => handleLike(activeItem.id || activeItem._id, e)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-festive-crimson border border-red-200 text-xs font-bold"
                  >
                    <Heart className="w-4 h-4 fill-festive-crimson" />
                    <span>{activeItem.likes || 0} Likes</span>
                  </button>
                </div>

                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
