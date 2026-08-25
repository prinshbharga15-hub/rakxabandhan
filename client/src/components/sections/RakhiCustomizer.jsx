import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import Customizer3DCanvas from '../3d/Customizer3DCanvas';
import FestiveButton from '../common/FestiveButton';
import GlassCard from '../common/GlassCard';
import { customizerOptions } from '../../data/defaultData';
import { saveCustomRakhi } from '../../services/api';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Palette, Gem, CircleDot, Type, Check, Share2, Download, Heart } from 'lucide-react';

export const RakhiCustomizer = ({ onOpenCeremony, showToast }) => {
  const [activeTab, setActiveTab] = useState('threads'); // 'threads' | 'motifs' | 'gemstones' | 'beads' | 'engraving'

  const [creatorName, setCreatorName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [customText, setCustomText] = useState('BHAI');

  const [selectedThread, setSelectedThread] = useState(customizerOptions.threadStyles[0]);
  const [selectedMotif, setSelectedMotif] = useState(customizerOptions.motifs[0]);
  const [selectedGemstone, setSelectedGemstone] = useState(customizerOptions.gemstones[0]);
  const [selectedBeadType, setSelectedBeadType] = useState(customizerOptions.beadTypes[0]);

  const [isSaving, setIsSaving] = useState(false);
  const [createdCardData, setCreatedCardData] = useState(null);

  // 3D Canvas config derived from user selections
  const current3DConfig = {
    threadColor: selectedThread.primary,
    secondaryColor: selectedThread.secondary,
    centerMotif: selectedMotif.id,
    gemstoneColor: selectedGemstone.color,
    beadType: selectedBeadType.id,
    beadColor: selectedBeadType.color,
    customText: customText.trim()
  };

  const handleCreateRakhi = async () => {
    soundManager.playFanfare();

    // Trigger celebratory marigold/gold confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DC2626', '#F59E0B', '#FEF08A', '#EA580C', '#E11D48']
    });

    const payload = {
      creatorName: creatorName.trim() || 'Loving Sister',
      recipientName: recipientName.trim() || 'Beloved Brother',
      threadColor: selectedThread.primary,
      secondaryThreadColor: selectedThread.secondary,
      threadStyle: selectedThread.id,
      centerMotif: selectedMotif.id,
      gemstone: selectedGemstone.id,
      beadType: selectedBeadType.id,
      customText: customText.trim() || 'BHAI'
    };

    setIsSaving(true);
    try {
      await saveCustomRakhi(payload);
      if (showToast) showToast('✨ Your personalized 3D Rakhi has been crafted and saved!');
    } catch (err) {
      console.warn('Saved locally in-memory:', err.message);
      if (showToast) showToast('✨ Your personalized 3D Rakhi is ready to share!');
    } finally {
      setIsSaving(false);
      setCreatedCardData(payload);
    }
  };

  return (
    <section id="customizer" className="py-20 md:py-28 relative bg-[#FFFDF9] overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="स्वयं बनाएं अपनी अनूठी राखी"
          badge="Interactive 3D Studio"
          title="Design Your Rakhi"
          subtitle="Customize every single detail of your ceremonial Rakhi in real-time 3D—from sacred thread styles and motifs to royal gemstones and custom name engravings."
        />

        {/* 2-Column Customizer Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3D Real-time Viewer & Card Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="glass-card rounded-3xl p-4 md:p-6 border border-amber-300 shadow-2xl relative bg-gradient-to-b from-amber-50/40 via-white to-amber-100/30">
              
              {/* 3D Canvas */}
              <div className="h-[360px] md:h-[440px] w-full rounded-2xl overflow-hidden relative">
                <Customizer3DCanvas config={current3DConfig} />

                {/* Floating summary badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200 text-[11px] font-bold text-festive-kumkum shadow-sm">
                  {selectedMotif.name} • {selectedGemstone.name}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-200">
                <div className="text-xs text-stone-600">
                  <span className="font-semibold text-festive-dark">Recipient: </span>
                  <span className="text-festive-crimson font-bold">
                    {recipientName || 'Beloved Brother'}
                  </span>
                </div>

                <FestiveButton
                  variant="primary"
                  size="md"
                  icon={Sparkles}
                  disabled={isSaving}
                  onClick={handleCreateRakhi}
                >
                  {isSaving ? 'Crafting Rakhi...' : 'Create My Rakhi'}
                </FestiveButton>
              </div>
            </div>

            {/* If card is created, show celebration modal/card preview */}
            {createdCardData && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 border-2 border-festive-gold shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎉</span>
                    <h4 className="font-heading font-bold text-festive-crimson text-base">
                      Personalized Rakhi Card Ready!
                    </h4>
                  </div>
                  <button
                    onClick={() => setCreatedCardData(null)}
                    className="text-xs text-stone-400 hover:text-stone-700"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  Crafted by <strong className="text-festive-kumkum">{createdCardData.creatorName}</strong> for{' '}
                  <strong className="text-festive-crimson">{createdCardData.recipientName}</strong> with engraved title "{createdCardData.customText}".
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <FestiveButton
                    variant="gold"
                    size="sm"
                    icon={Share2}
                    onClick={() => {
                      const shareText = `🪔 Happy Raksha Bandhan! I crafted a special 3D Rakhi for ${createdCardData.recipientName}. Check it out on the Raksha Bandhan Portal!`;
                      if (navigator.share) {
                        navigator.share({ title: 'Happy Raksha Bandhan', text: shareText, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(shareText);
                        if (showToast) showToast('📋 Link & Greeting copied to clipboard!');
                      }
                    }}
                  >
                    Share with Brother/Sister
                  </FestiveButton>

                  <FestiveButton
                    variant="outline"
                    size="sm"
                    icon={Heart}
                    onClick={onOpenCeremony}
                  >
                    Tie Virtually Now
                  </FestiveButton>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Customization Controls Tabs */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Customizer Tabs */}
            <div className="grid grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-amber-100/70 border border-amber-300">
              {[
                { id: 'threads', label: 'Threads', icon: Palette },
                { id: 'motifs', label: 'Motif', icon: Sparkles },
                { id: 'gemstones', label: 'Gems', icon: Gem },
                { id: 'beads', label: 'Beads', icon: CircleDot },
                { id: 'engraving', label: 'Names', icon: Type }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-festive-crimson text-white shadow-md'
                        : 'text-stone-700 hover:bg-amber-200/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Thread Styles */}
            {activeTab === 'threads' && (
              <GlassCard className="space-y-3">
                <h4 className="font-heading font-bold text-festive-dark text-base flex items-center gap-2">
                  <Palette className="w-4 h-4 text-festive-crimson" /> Select Sacred Thread Style
                </h4>
                <div className="space-y-2.5">
                  {customizerOptions.threadStyles.map((style) => {
                    const isSelected = selectedThread.id === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setSelectedThread(style)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-50/80 border-festive-crimson shadow-md ring-1 ring-festive-crimson'
                            : 'bg-white/70 hover:bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center -space-x-1">
                            <span className="w-5 h-5 rounded-full border border-white shadow-xs" style={{ backgroundColor: style.primary }} />
                            <span className="w-5 h-5 rounded-full border border-white shadow-xs" style={{ backgroundColor: style.secondary }} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-festive-dark">{style.name}</div>
                            <div className="text-[11px] text-stone-500">{style.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-festive-crimson flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* Tab 2: Motifs & Symbols */}
            {activeTab === 'motifs' && (
              <GlassCard className="space-y-3">
                <h4 className="font-heading font-bold text-festive-dark text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-festive-gold" /> Select Center Motif
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {customizerOptions.motifs.map((motif) => {
                    const isSelected = selectedMotif.id === motif.id;
                    return (
                      <div
                        key={motif.id}
                        onClick={() => setSelectedMotif(motif)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/90 border-festive-gold shadow-md ring-1 ring-festive-gold'
                            : 'bg-white/70 hover:bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-2xl">{motif.symbol}</span>
                          {isSelected && <Check className="w-4 h-4 text-festive-gold" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-festive-dark">{motif.name}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5 leading-tight">{motif.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* Tab 3: Gemstones */}
            {activeTab === 'gemstones' && (
              <GlassCard className="space-y-3">
                <h4 className="font-heading font-bold text-festive-dark text-base flex items-center gap-2">
                  <Gem className="w-4 h-4 text-festive-pink" /> Center Faceted Gemstone
                </h4>
                <div className="space-y-2.5">
                  {customizerOptions.gemstones.map((gem) => {
                    const isSelected = selectedGemstone.id === gem.id;
                    return (
                      <div
                        key={gem.id}
                        onClick={() => setSelectedGemstone(gem)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-50/90 border-festive-pink shadow-md ring-1 ring-festive-pink'
                            : 'bg-white/70 hover:bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full shadow-md border border-white"
                            style={{ backgroundColor: gem.color }}
                          />
                          <div>
                            <div className="text-xs font-bold text-festive-dark">{gem.name}</div>
                            <div className="text-[11px] text-stone-500">{gem.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-festive-pink" />}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* Tab 4: Beads & Pearls */}
            {activeTab === 'beads' && (
              <GlassCard className="space-y-3">
                <h4 className="font-heading font-bold text-festive-dark text-base flex items-center gap-2">
                  <CircleDot className="w-4 h-4 text-festive-gold" /> Beads & Spiritual Accents
                </h4>
                <div className="space-y-2.5">
                  {customizerOptions.beadTypes.map((bead) => {
                    const isSelected = selectedBeadType.id === bead.id;
                    return (
                      <div
                        key={bead.id}
                        onClick={() => setSelectedBeadType(bead)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50/90 border-festive-gold shadow-md ring-1 ring-festive-gold'
                            : 'bg-white/70 hover:bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full shadow-sm border border-stone-200"
                            style={{ backgroundColor: bead.color }}
                          />
                          <div>
                            <div className="text-xs font-bold text-festive-dark">{bead.name}</div>
                            <div className="text-[11px] text-stone-500">{bead.desc}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-festive-gold" />}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* Tab 5: Names & Inscription */}
            {activeTab === 'engraving' && (
              <GlassCard className="space-y-4">
                <h4 className="font-heading font-bold text-festive-dark text-base flex items-center gap-2">
                  <Type className="w-4 h-4 text-festive-crimson" /> Engraving & Personalization
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Name (Sister / Sender)
                    </label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Ananya"
                      maxLength={40}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-festive-crimson bg-white text-xs text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Brother / Recipient Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Aarav"
                      maxLength={40}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-festive-crimson bg-white text-xs text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Dial Inscription (Up to 8 Letters)
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                      placeholder="e.g. BHAI, HERO, BRO"
                      maxLength={8}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-festive-crimson bg-white text-xs text-stone-800 font-bold uppercase tracking-wider"
                    />
                    <p className="text-[10px] text-stone-500 mt-1">
                      This text appears live on the 3D Rakhi medallion.
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RakhiCustomizer;
