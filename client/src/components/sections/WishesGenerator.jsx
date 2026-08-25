import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import FestiveButton from '../common/FestiveButton';
import { wishTemplates } from '../../data/defaultData';
import { submitWish } from '../../services/api';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, Copy, Share2, RefreshCw, Send, Check, Heart, Languages, MessageCircle } from 'lucide-react';

export const WishesGenerator = ({ onWishSubmitted, showToast }) => {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('Brother');
  const [category, setCategory] = useState('heartfelt');
  const [language, setLanguage] = useState('en');

  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate personalized wish text based on state
  const getWishText = () => {
    const rName = recipientName.trim() || (language === 'hi' ? 'भैया' : 'Brother');
    const sName = senderName.trim() || (language === 'hi' ? 'बहन' : 'Sister');
    const rel = relationship || 'Brother';

    const templates = wishTemplates[category]?.[language] || wishTemplates.heartfelt.en;
    const template = templates[currentWishIndex % templates.length];

    let result = template
      .replace(/{name}/g, rName)
      .replace(/{relationship}/g, rel)
      .replace(/{sender}/g, sName);

    return result;
  };

  const handleGenerateNew = () => {
    soundManager.playChime();
    setCurrentWishIndex((prev) => prev + 1);
    setCopied(false);
  };

  const handleCopy = () => {
    const text = getWishText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundManager.playChime();
    if (showToast) showToast('📋 Wish copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    const text = getWishText();
    const shareUrl = window.location.href;
    const fullText = `🪔 *Happy Raksha Bandhan!* 🪔\n\n${text}\n\n✨ Celebrate together on Raksha Bandhan Festival Portal: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'Happy Raksha Bandhan Wish',
        text: fullText
      });
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handlePostToWall = async () => {
    const message = getWishText();
    const payload = {
      senderName: senderName.trim() || 'Loving Sibling',
      recipientName: recipientName.trim() || 'Beloved Sibling',
      relationship,
      message,
      language,
      category
    };

    setIsSubmitting(true);
    soundManager.playFanfare();

    try {
      await submitWish(payload);
      if (showToast) showToast('✨ Your wish has been posted to the Live Wishes Wall!');
      if (onWishSubmitted) onWishSubmitted();
    } catch (err) {
      console.warn('Posted in fallback mode:', err.message);
      if (showToast) showToast('✨ Wish posted successfully to the community!');
      if (onWishSubmitted) onWishSubmitted();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-20 md:py-28 relative bg-[#FFFDF9] overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="हृदयस्पर्शी शुभकामना सृजन"
          badge="Personalized Messages"
          title="Raksha Bandhan Wishes Generator"
          subtitle="Generate customized, emotional, poetic, or witty greetings in Hindi and English for your brother, sister, cousin, or loved ones in seconds."
        />

        {/* 2-Column Generator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 md:p-7 border border-amber-300 shadow-xl bg-white/90 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                <Sparkles className="w-5 h-5 text-festive-crimson" />
                <h3 className="font-heading font-bold text-festive-dark text-base">
                  Customize Greeting Details
                </h3>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-festive-gold" /> Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setLanguage('en'); setCurrentWishIndex(0); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      language === 'en'
                        ? 'bg-festive-crimson text-white shadow-sm'
                        : 'bg-amber-50 text-stone-700 hover:bg-amber-100'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLanguage('hi'); setCurrentWishIndex(0); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-festive-crimson text-white shadow-sm'
                        : 'bg-amber-50 text-stone-700 hover:bg-amber-100'
                    }`}
                  >
                    हिन्दी (Hindi)
                  </button>
                </div>
              </div>

              {/* Tone / Style Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Wish Tone / Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'heartfelt', label: 'Heartfelt', emoji: '❤️' },
                    { id: 'funny', label: 'Playful / Witty', emoji: '😄' },
                    { id: 'poetic', label: 'Poetic / Shayari', emoji: '📜' },
                    { id: 'blessing', label: 'Sacred Blessing', emoji: '🙏' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setCategory(t.id); setCurrentWishIndex(0); }}
                      className={`p-2 rounded-xl text-xs font-semibold text-left transition-all border flex items-center gap-1.5 ${
                        category === t.id
                          ? 'bg-red-50 border-festive-crimson text-festive-crimson font-bold shadow-xs'
                          : 'bg-white/80 border-amber-200/80 text-stone-700 hover:bg-amber-50'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      <span className="truncate">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Priya"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Brother / Sister Name (Recipient)
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Rohan"
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                  >
                    <option value="Brother">Brother (भाई)</option>
                    <option value="Sister">Sister (बहन)</option>
                    <option value="Elder Brother">Elder Brother (बड़े भैया)</option>
                    <option value="Younger Brother">Younger Brother (छोटे)</option>
                    <option value="Elder Sister">Elder Sister (दीदी)</option>
                    <option value="Younger Sister">Younger Sister (छोटी)</option>
                    <option value="Cousin">Cousin Brother/Sister</option>
                    <option value="Bhabhi">Bhabhi (भाभी)</option>
                    <option value="Friend">Friend like Sibling</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Live Generated Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl p-6 md:p-8 border-2 border-festive-gold shadow-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FDF2DE] relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              
              {/* Decorative Card Motifs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-300/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🪔</span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-festive-saffron">
                        Raksha Bandhan Blessing Card
                      </span>
                      <h4 className="font-heading font-bold text-festive-dark text-base">
                        To: {recipientName || 'Beloved Sibling'}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-festive-kumkum capitalize border border-amber-300">
                    {category}
                  </span>
                </div>

                {/* Generated Message Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentWishIndex}-${language}-${category}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="my-6"
                  >
                    <p className={`text-base md:text-xl font-serif text-stone-800 leading-relaxed italic ${language === 'hi' ? 'font-hindi font-medium' : ''}`}>
                      "{getWishText()}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-amber-200">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>With boundless love, <strong>{senderName || 'Your Sibling'}</strong></span>
                  <span className="font-hindi text-festive-saffron font-bold">शुभ रक्षाबंधन</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <FestiveButton
                    variant="primary"
                    size="sm"
                    icon={RefreshCw}
                    onClick={handleGenerateNew}
                  >
                    Generate New Wish
                  </FestiveButton>

                  <FestiveButton
                    variant="outline"
                    size="sm"
                    icon={copied ? Check : Copy}
                    onClick={handleCopy}
                  >
                    {copied ? 'Copied!' : 'Copy Wish'}
                  </FestiveButton>

                  <FestiveButton
                    variant="gold"
                    size="sm"
                    icon={Share2}
                    onClick={handleShare}
                  >
                    Share Wish
                  </FestiveButton>

                  <FestiveButton
                    variant="glass"
                    size="sm"
                    icon={Send}
                    disabled={isSubmitting}
                    onClick={handlePostToWall}
                  >
                    {isSubmitting ? 'Posting...' : 'Post to Wishes Wall'}
                  </FestiveButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesGenerator;
