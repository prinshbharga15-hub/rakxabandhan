import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import { BookOpen, Sparkles, Heart, Shield, SunMedium } from 'lucide-react';

export const AboutSection = () => {
  const [activeStoryTab, setActiveStoryTab] = useState('krishna');

  const stories = {
    krishna: {
      title: 'Lord Krishna & Draupadi',
      hindi: 'भगवान श्रीकृष्ण एवं द्रौपदी की अमर कथा',
      subtitle: 'The divine origin of the protective thread in the Mahabharata',
      image: '/assets/images (5).jpg',
      content:
        'When Lord Krishna injured his finger while casting the Sudarshana Chakra, Queen Draupadi unhesitatingly tore a strip of silk from her royal saree and bandaged his bleeding finger. Moved by her pure devotion, Krishna promised to protect her in her moment of greatest vulnerability, fulfilling his vow during the Cheer Haran.',
      moral: 'True protection is born of mutual reverence, devotion, and unconditional care.'
    },
    karnavati: {
      title: 'Queen Karnavati & Emperor Humayun',
      hindi: 'महारानी कर्णावती और हुमायूं का ऐतिहासिक बंधन',
      subtitle: 'A historical testament to the universal sanctity of the Rakhi thread',
      image: '/assets/rani_karnavati.webp',
      content:
        'When the kingdom of Chittor was besieged by Bahadur Shah of Gujarat, widowed Queen Karnavati sent a sanctified Rakhi to Mughal Emperor Humayun seeking military brotherhood. Recognizing the sacred obligation of the Rakhi, Humayun marched his vast army to defend Chittor, transcending all political and religious boundaries.',
      moral: 'The Rakhi thread transcends creed, geography, and politics to unite hearts in honor.'
    },
    spiritual: {
      title: 'The Vedic Essence of Raksha',
      hindi: 'रक्षा सूत्र का वैदिक एवं आध्यात्मिक मर्म',
      subtitle: 'A sacred invocation of cosmic defense and righteousness',
      image: '/assets/vedas.webp',
      content:
        'Derived from the Sanskrit words "Raksha" (Protection) and "Bandhan" (Sacred Tie), the festival celebrated on the full moon day (Purnima) of the holy month of Shravan honors the sacred cosmic balance. Tying the thread is a spiritual pledge to uphold moral values, shield loved ones from distress, and cherish family bonds.',
      moral: 'A reminder that love and duty are inseparable spiritual virtues.'
    }
  };

  const current = stories[activeStoryTab];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-[#FAF6EE] overflow-hidden">
      {/* Decorative background flourishes */}
      <div className="absolute -top-10 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="पवित्र स्नेह का पावन पर्व"
          badge="Sacred Heritage & Significance"
          title="The Beautiful Bond of Raksha Bandhan"
          subtitle="An eternal Indian tradition celebrating the timeless affection, playful banter, and solemn vow of protection between brothers and sisters."
        />

        {/* 2-Column Story & Significance Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Story & Mythos Explorer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-amber-100/70 border border-amber-300/80">
              <button
                onClick={() => setActiveStoryTab('krishna')}
                className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeStoryTab === 'krishna'
                    ? 'bg-festive-crimson text-white shadow-md'
                    : 'text-stone-700 hover:bg-amber-200/60'
                }`}
              >
                🪷 Krishna & Draupadi
              </button>
              <button
                onClick={() => setActiveStoryTab('karnavati')}
                className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeStoryTab === 'karnavati'
                    ? 'bg-festive-crimson text-white shadow-md'
                    : 'text-stone-700 hover:bg-amber-200/60'
                }`}
              >
                👑 Rani Karnavati
              </button>
              <button
                onClick={() => setActiveStoryTab('spiritual')}
                className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeStoryTab === 'spiritual'
                    ? 'bg-festive-crimson text-white shadow-md'
                    : 'text-stone-700 hover:bg-amber-200/60'
                }`}
              >
                🕉️ Vedic Essence
              </button>
            </div>

            {/* Story Content Card with Image Header */}
            <GlassCard className="border border-amber-300 shadow-xl bg-white/90 overflow-hidden p-0">
              <div className="h-56 w-full overflow-hidden relative bg-stone-900">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end p-6 text-white">
                  <div>
                    <span className="font-hindi text-xs text-festive-saffron font-bold">
                      {current.hindi}
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white drop-shadow">
                      {current.title}
                    </h3>
                  </div>
                </div>
              </div>

              <motion.div
                key={activeStoryTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-7 space-y-4"
              >
                <p className="text-xs text-festive-gold font-bold uppercase tracking-wider">
                  {current.subtitle}
                </p>

                <p className="text-sm md:text-base text-stone-700 leading-relaxed">
                  {current.content}
                </p>

                <div className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-festive-crimson">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-festive-crimson">
                    <Sparkles className="w-4 h-4 text-festive-gold" />
                    <span>Sacred Lesson</span>
                  </div>
                  <p className="text-xs md:text-sm text-stone-800 font-serif italic mt-1">
                    "{current.moral}"
                  </p>
                </div>
              </motion.div>
            </GlassCard>
          </div>

          {/* Right Column: Key Pillars of Siblinghood */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Pillar 1: Unconditional Love */}
            <GlassCard className="p-5 flex items-start gap-4 hover:border-festive-crimson transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-festive-dark">Unconditional Affection</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Beyond gifts and ceremonies, Raksha Bandhan is a celebration of lifelong friendship, unshakeable support, and the deepest emotional anchor.
                </p>
              </div>
            </GlassCard>

            {/* Pillar 2: The Sacred Vow */}
            <GlassCard className="p-5 flex items-start gap-4 hover:border-festive-gold transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-festive-dark">The Shield of Protection</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  The brother vows to protect his sister through every hardship, while the sister’s prayers serve as a spiritual armor shielding his destiny.
                </p>
              </div>
            </GlassCard>

            {/* Pillar 3: Auspicious Blessings */}
            <GlassCard className="p-5 flex items-start gap-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-900 flex items-center justify-center flex-shrink-0 shadow-md">
                <SunMedium className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-festive-dark">Shravana Purnima Grace</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Falling on the auspicious full moon day of Shravan, the atmosphere resonates with Vedic chants, sweet aromas, and family harmony.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
