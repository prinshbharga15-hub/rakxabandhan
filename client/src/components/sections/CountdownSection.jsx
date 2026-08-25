import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import FestiveButton from '../common/FestiveButton';
import { Calendar, Clock, Sparkles, Sun, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const CountdownSection = ({ showToast }) => {
  // Target: Shravana Purnima (Raksha Bandhan 2026/2027)
  const targetDate = new Date('2026-08-28T09:00:00+05:30');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let res = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        res = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(res);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Raksha Bandhan Mahotsav 🪔');
    const details = encodeURIComponent(
      'Celebrate the sacred bond of love, protection, and cherished sibling memories. Auspicious Rakhi tying rituals!'
    );
    const location = encodeURIComponent('Home & Family Reunion');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260828T033000Z/20260828T143000Z`;

    window.open(googleCalendarUrl, '_blank');
    if (showToast) showToast('📅 Raksha Bandhan added to your Calendar!');
  };

  const timeUnits = [
    { label: 'Days', hindi: 'दिन', value: timeLeft.days },
    { label: 'Hours', hindi: 'घंटे', value: timeLeft.hours },
    { label: 'Minutes', hindi: 'मिनट', value: timeLeft.minutes },
    { label: 'Seconds', hindi: 'सेकंड', value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="py-20 md:py-28 relative bg-[#FFFDF9] overflow-hidden">
      {/* Background festive glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-300/15 via-red-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="शुभ मुहूर्त एवं समय गणना"
          badge="Auspicious Muhurat & Countdown"
          title="Raksha Bandhan Countdown"
          subtitle="Countdown to the joyous full moon day of Shravan. Plan your rituals during the most auspicious Vedic Muhurat for maximum blessings."
        />

        {/* Countdown Digits Display */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="text-center p-6 md:p-8 border-2 border-amber-300 shadow-xl bg-gradient-to-b from-white via-amber-50/40 to-amber-100/30">
                <span className="font-hindi text-xs text-festive-saffron font-bold block mb-1">
                  {unit.hindi}
                </span>
                <span className="text-4xl md:text-6xl font-heading font-black festive-gradient-text block tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-stone-600 mt-2 block">
                  {unit.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Auspicious Muhurat Details Card */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-6 md:p-8 border border-amber-300 shadow-xl bg-white/95">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-festive-crimson flex items-center justify-center text-white shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-festive-saffron">
                    Panchang Auspicious Timings
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-festive-dark">
                    Auspicious Rakhi Tying Muhurat
                  </h3>
                </div>
              </div>

              <FestiveButton
                variant="gold"
                size="sm"
                icon={Calendar}
                onClick={handleAddToCalendar}
              >
                Add to Calendar
              </FestiveButton>
            </div>

            {/* Timings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-festive-kumkum mb-1">
                  <Sun className="w-4 h-4 text-festive-gold" /> Aparahna Muhurat (Best)
                </div>
                <div className="text-sm md:text-base font-bold text-festive-dark">
                  01:42 PM to 04:18 PM
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Most auspicious time for tying Rakhi with Vedic mantras.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-festive-saffron mb-1">
                  <Clock className="w-4 h-4 text-festive-saffron" /> Pradosh Kaal Muhurat
                </div>
                <div className="text-sm md:text-base font-bold text-festive-dark">
                  06:54 PM to 09:08 PM
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Auspicious evening time after sunset.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-festive-crimson mb-1">
                  <ShieldAlert className="w-4 h-4 text-festive-crimson" /> Bhadra Kaal (Avoid)
                </div>
                <div className="text-sm md:text-base font-bold text-stone-800">
                  Ends before sunrise
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Avoid performing rituals during Bhadra Mukha.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
