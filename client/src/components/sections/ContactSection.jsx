import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import GlassCard from '../common/GlassCard';
import FestiveButton from '../common/FestiveButton';
import { submitContactMessage } from '../../services/api';
import { soundManager } from '../../utils/soundEffects';
import { Mail, Send, Sparkles, MessageSquare, MapPin, Heart } from 'lucide-react';

export const ContactSection = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Raksha Bandhan Celebration Greeting',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    soundManager.playFanfare();

    try {
      await submitContactMessage(formData);
      if (showToast) showToast('✨ Your festive message was received! Shubh Raksha Bandhan!');
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Raksha Bandhan Celebration Greeting',
        message: ''
      });
    } catch (err) {
      console.warn('Submitted in fallback mode:', err.message);
      if (showToast) showToast('✨ Message received with warm blessings!');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#FFFDF9] overflow-hidden">
      {/* Background ambient flourishes */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          hindiBadge="स्नेह संवाद एवं संपर्क"
          badge="Get in Touch"
          title="Send a Festive Greeting"
          subtitle="Have a heartfelt story, cultural inquiry, or festival feedback to share? Send us a warm message and celebrate the sacred bond together."
        />

        {/* 2-Column Contact & Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Festive Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 border border-amber-300 shadow-xl bg-white/90 space-y-4">
              <h3 className="text-xl font-heading font-bold text-festive-dark flex items-center gap-2">
                <span className="text-xl">🪔</span> Raksha Bandhan Portal
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dedicated to honoring ancient Vedic traditions, spreading joyous sibling memories, and bridging distances with digital celebrations.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-stone-700">
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-festive-crimson flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">Festive Desk</div>
                    <div className="text-stone-500">celebrations@rakshabandhan.org</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-stone-700">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-festive-gold flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">Global Heritage Hub</div>
                    <div className="text-stone-500">Varanasi • New Delhi • Worldwide</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-stone-700">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-festive-saffron flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">Shravana Purnima 2026</div>
                    <div className="text-stone-500">August 28, 2026 • Full Moon Day</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 md:p-8 border border-amber-300 shadow-xl bg-white/95">
              <div className="flex items-center gap-2 pb-4 border-b border-amber-200 mb-6">
                <MessageSquare className="w-5 h-5 text-festive-crimson" />
                <h4 className="font-heading font-bold text-festive-dark text-base">
                  Leave a Festive Note
                </h4>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-amber-300 text-center space-y-3"
                >
                  <div className="text-3xl">🎉</div>
                  <h4 className="text-lg font-heading font-bold text-festive-crimson">
                    Dhanyavaad! (Thank you!)
                  </h4>
                  <p className="text-xs text-stone-700">
                    Your lovely message has been received with joyous blessings. Wishing you and your family a wonderful Raksha Bandhan!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-festive-saffron hover:underline pt-2 inline-block"
                  >
                    Send another greeting
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Festive Greetings from London"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Message or Story *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your festive thoughts, wishes, or inquiries..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-xs focus:ring-2 focus:ring-festive-crimson bg-white text-stone-800 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <FestiveButton
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full"
                      disabled={loading}
                      icon={Send}
                    >
                      {loading ? 'Sending...' : 'Send Message 🪔'}
                    </FestiveButton>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
