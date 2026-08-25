import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FestiveButton from '../common/FestiveButton';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { X, Flame, Sparkles, Heart, CheckCircle2, Award, RotateCcw, Share2, Camera, AlertCircle } from 'lucide-react';
import FestiveSelfieModal from './FestiveSelfieModal';

export const VirtualRakhiModal = ({ isOpen, onClose, showToast }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sisterName, setSisterName] = useState('');
  const [brotherName, setBrotherName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSelfieOpen, setIsSelfieOpen] = useState(false);

  if (!isOpen) return null;

  const triggerPetalsAndConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#DC2626', '#F59E0B', '#FEF08A', '#EA580C', '#E11D48']
    });
  };

  const nextStep = (step) => {
    soundManager.playChime();
    setCurrentStep(step);
    if (step === 5) {
      soundManager.playFanfare();
      triggerPetalsAndConfetti();
    }
  };

  const handleStartCeremony = () => {
    if (!sisterName.trim()) {
      setNameError("Please enter Sister's Name to begin the ceremony!");
      if (showToast) showToast("⚠️ Please enter Sister's Name!");
      return;
    }
    if (!brotherName.trim()) {
      setNameError("Please enter Brother's Name to begin the ceremony!");
      if (showToast) showToast("⚠️ Please enter Brother's Name!");
      return;
    }

    setNameError('');
    soundManager.playBell();
    nextStep(2);
  };

  const resetCeremony = () => {
    setCurrentStep(1);
    setNameError('');
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/75 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-xl w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FDF4E5] rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-2xl relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-amber-100/80 text-stone-600 hover:bg-amber-200"
            aria-label="Close ceremony"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center pb-4 border-b border-amber-200">
            <span className="font-hindi text-xs text-festive-saffron font-bold">
              पावन रक्षाबंधन संस्कार
            </span>
            <h3 className="text-2xl font-heading font-bold text-festive-crimson mt-0.5">
              Virtual Rakhi Ceremony
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Perform the sacred 5-step Rakhi ritual virtually with divine blessings & music.
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === step
                      ? 'w-8 bg-festive-crimson'
                      : currentStep > step
                      ? 'w-3 bg-festive-gold'
                      : 'w-2 bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="py-6">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Light the Diya */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center space-y-4"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner animate-pulse">
                    🪔
                  </div>

                  <div>
                    <span className="text-xs font-bold text-festive-saffron uppercase tracking-widest">
                      Step 1 of 5
                    </span>
                    <h4 className="text-xl font-heading font-bold text-festive-dark mt-1">
                      Kindle the Sacred Diya (दीप प्रज्वलन)
                    </h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto mt-2 leading-relaxed">
                      Enter both Sister's & Brother's names below, then light the sacred flame to invoke divine blessings.
                    </p>
                  </div>

                  {/* Sibling Names Input with Validation */}
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-left pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Sister's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={sisterName}
                        onChange={(e) => {
                          setSisterName(e.target.value);
                          if (nameError) setNameError('');
                        }}
                        placeholder="e.g. Ananya"
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:ring-2 focus:ring-festive-crimson outline-none ${
                          !sisterName.trim() && nameError
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-amber-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Brother's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={brotherName}
                        onChange={(e) => {
                          setBrotherName(e.target.value);
                          if (nameError) setNameError('');
                        }}
                        placeholder="e.g. Aarav"
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:ring-2 focus:ring-festive-crimson outline-none ${
                          !brotherName.trim() && nameError
                            ? 'border-red-500 bg-red-50/50'
                            : 'border-amber-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Name Error Alert */}
                  {nameError && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 font-bold bg-red-50 border border-red-200 py-1.5 px-3 rounded-xl max-w-sm mx-auto animate-shake">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{nameError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <FestiveButton
                      variant="primary"
                      size="md"
                      icon={Flame}
                      onClick={handleStartCeremony}
                    >
                      Kindle Sacred Flame 🪔
                    </FestiveButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Apply the Tilak */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center space-y-4"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center text-4xl shadow-inner">
                    🔴
                  </div>

                  <div>
                    <span className="text-xs font-bold text-festive-saffron uppercase tracking-widest">
                      Step 2 of 5
                    </span>
                    <h4 className="text-xl font-heading font-bold text-festive-dark mt-1">
                      Apply Kumkum & Akshat Tilak (शुभ तिलक)
                    </h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto mt-2 leading-relaxed">
                      Apply the holy crimson tilak and unbroken rice grains on <strong>{brotherName}</strong>'s forehead to awaken courage and invoke divine longevity.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-serif italic text-stone-700 max-w-sm mx-auto">
                    "Om Chandanam Shubhdam Divyam Satatam Paapanashanam..."
                  </div>

                  <div className="pt-2">
                    <FestiveButton
                      variant="primary"
                      size="md"
                      icon={Sparkles}
                      onClick={() => nextStep(3)}
                    >
                      Apply Holy Tilak 🔴
                    </FestiveButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Tie the 3D Rakhi */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center space-y-4"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
                    🧵
                  </div>

                  <div>
                    <span className="text-xs font-bold text-festive-saffron uppercase tracking-widest">
                      Step 3 of 5
                    </span>
                    <h4 className="text-xl font-heading font-bold text-festive-dark mt-1">
                      Tie the Sacred Rakhi Thread (रक्षा सूत्र बंधन)
                    </h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto mt-2 leading-relaxed">
                      <strong>{sisterName}</strong> ties the sacred silk thread on <strong>{brotherName}</strong>’s right wrist, sealing the eternal vow of love and protection.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs font-hindi text-festive-crimson font-bold max-w-sm mx-auto">
                    "येन बद्धो बली राजा दानवेन्द्रो महाबलः। तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥"
                  </div>

                  <div className="pt-2">
                    <FestiveButton
                      variant="primary"
                      size="md"
                      icon={Heart}
                      onClick={() => nextStep(4)}
                    >
                      Tie Sacred Rakhi 🧵
                    </FestiveButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Offer Mithai */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center space-y-4"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-4xl shadow-inner">
                    🍬
                  </div>

                  <div>
                    <span className="text-xs font-bold text-festive-saffron uppercase tracking-widest">
                      Step 4 of 5
                    </span>
                    <h4 className="text-xl font-heading font-bold text-festive-dark mt-1">
                      Offer Traditional Sweets (मिष्ठान भोग)
                    </h4>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto mt-2 leading-relaxed">
                      Feed delicious Ghevar, Kaju Katli, or Motichoor Ladoo to sweeten the relationship and dissolve all petty rivalries forever!
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 text-2xl pt-1">
                    <span>🍯</span>
                    <span>🥮</span>
                    <span>🍬</span>
                    <span>🍮</span>
                  </div>

                  <div className="pt-2">
                    <FestiveButton
                      variant="gold"
                      size="md"
                      icon={Sparkles}
                      onClick={() => nextStep(5)}
                    >
                      Feed Festive Sweet 🍬
                    </FestiveButton>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Flower Shower, Certificate & Sibling Selfie Booth */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-festive-crimson to-festive-gold text-white flex items-center justify-center text-3xl shadow-xl animate-bounce">
                    🏆
                  </div>

                  <div>
                    <span className="text-xs font-bold text-festive-saffron uppercase tracking-widest">
                      Ceremony Complete! 🎉
                    </span>
                    <h4 className="text-2xl font-heading font-black festive-gradient-text mt-1">
                      Happy Raksha Bandhan!
                    </h4>
                    <p className="text-xs text-stone-700 max-w-sm mx-auto mt-2 leading-relaxed">
                      The sacred vows of love, defense, and eternal companionship between{' '}
                      <strong>{sisterName}</strong> and <strong>{brotherName}</strong> are blessed!
                    </p>
                  </div>

                  {/* Digital Certificate of Bond */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-amber-300 shadow-md max-w-sm mx-auto text-left space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-festive-crimson">
                      <span>✨ Sacred Bond Certificate</span>
                      <span className="text-[10px] text-stone-400">Shravana Purnima</span>
                    </div>
                    <p className="text-xs text-stone-600">
                      This certifies that the eternal thread of Raksha has been tied with heartfelt prayers and lifelong devotion.
                    </p>
                    <div className="text-[11px] font-semibold text-festive-gold pt-1 border-t border-amber-100 flex justify-between">
                      <span>Sister: {sisterName}</span>
                      <span>Brother: {brotherName}</span>
                    </div>
                  </div>

                  {/* Action Buttons: Selfie Booth, Share, Retake */}
                  <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                    {/* Sibling Selfie Photo Booth Button */}
                    <button
                      onClick={() => setIsSelfieOpen(true)}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Sibling Selfie 📸</span>
                    </button>

                    <FestiveButton
                      variant="gold"
                      size="sm"
                      icon={Share2}
                      onClick={() => {
                        const text = `🪔 શુભ રક્ષાબંધન! ✨\n${sisterName || 'બહેન'} અને ${brotherName || 'ભાઈ'} તરફથી રક્ષાબંધનની ખૂબ ખૂબ શુભેચ્છાઓ! ભાઈ-બહેનનો આ પવિત્ર સ્નેહ સદાય અકબંધ રહે! 💖`;
                        if (navigator.share) {
                          navigator.share({ title: 'શુભ રક્ષાબંધન!', text });
                        } else {
                          navigator.clipboard.writeText(text);
                          if (showToast) showToast('📋 ગુજરાતી સંદેશ કૉપી થયો!');
                        }
                      }}
                    >
                      Share Message
                    </FestiveButton>

                    <FestiveButton
                      variant="outline"
                      size="sm"
                      icon={RotateCcw}
                      onClick={resetCeremony}
                    >
                      Perform Again
                    </FestiveButton>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Sibling Selfie Modal Popup */}
      <FestiveSelfieModal
        isOpen={isSelfieOpen}
        onClose={() => setIsSelfieOpen(false)}
        defaultSisterName={sisterName}
        defaultBrotherName={brotherName}
        showToast={showToast}
      />
    </>
  );
};

export default VirtualRakhiModal;
