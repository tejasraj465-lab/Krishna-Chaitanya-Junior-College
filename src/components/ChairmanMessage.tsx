import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, BookOpen, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { CHAIRMAN_MESSAGE } from '../data/collegeData';

export const ChairmanMessage: React.FC = () => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  return (
    <section id="chairman" className="py-16 md:py-24 bg-white text-[#1E293B] scroll-mt-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="bg-gradient-to-br from-[#0B3C91] to-[#072B6B] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-blue-500/30">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left: Chairman Portrait Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/20">
                <img
                  src={CHAIRMAN_MESSAGE.photo}
                  alt={CHAIRMAN_MESSAGE.name}
                  className="w-full h-[360px] sm:h-[420px] object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91] via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                  <h3 className="font-serif font-bold text-lg text-[#FBBF24]">
                    {CHAIRMAN_MESSAGE.name}
                  </h3>
                  <p className="text-xs text-blue-100">{CHAIRMAN_MESSAGE.qualification}</p>
                  <p className="text-[10px] text-blue-200 mt-0.5">{CHAIRMAN_MESSAGE.designation}</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Message Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-1.5 bg-[#FBBF24] text-[#0B3C91] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Founder & Chairman's Message
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white leading-snug">
                "Education is not merely preparing for an exam; it is preparing for a life of purpose, courage, and excellence."
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                {CHAIRMAN_MESSAGE.messageShort}
              </p>

              {/* Vision Highlight */}
              <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-400/30 text-xs text-blue-100 space-y-1">
                <p className="font-bold text-[#FBBF24] uppercase tracking-wider text-[10px]">
                  Institutional Vision:
                </p>
                <p className="italic">"{CHAIRMAN_MESSAGE.vision}"</p>
              </div>

              {/* Signature & Read More */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="font-serif italic text-lg text-[#FBBF24] tracking-wide font-bold">
                  ~ {CHAIRMAN_MESSAGE.signatureText}
                </div>

                <button
                  onClick={() => setShowFullMessage(true)}
                  className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <span>Read Full Message</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>

          </div>
        </div>

        {/* Read Full Message Modal */}
        <AnimatePresence>
          {showFullMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-blue-100 text-[#1E293B]"
              >
                <button
                  onClick={() => setShowFullMessage(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3C91] bg-blue-50 px-3 py-1 rounded-full">
                    From the Chairman's Desk
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-[#0B3C91]">
                    Message to Parents & Students
                  </h3>

                  <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                    {CHAIRMAN_MESSAGE.messageFull}
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => setShowFullMessage(false)}
                      className="bg-[#0B3C91] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
