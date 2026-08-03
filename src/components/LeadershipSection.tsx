import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Quote, ChevronRight, BookOpen, X, Sparkles } from 'lucide-react';
import { LEADERSHIP_MEMBERS, CHAIRMAN_MESSAGE } from '../data/collegeData';

export const LeadershipSection: React.FC = () => {
  const [showFullChairmanMsg, setShowFullChairmanMsg] = useState(false);

  return (
    <section id="leadership" className="py-16 md:py-24 bg-[#F8FAFC] text-[#1E293B] scroll-mt-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#0B3C91] bg-blue-100/80 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border border-blue-200">
            Visionary Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3C91] font-serif mt-3.5 leading-tight">
            Leadership at Krishna Chaitanya
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-medium">
            Steered by eminent educationists and visionary leaders dedicated to shaping futures, fostering values, and empowering thousands of young achievers every year.
          </p>
        </div>

        {/* 3 Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {LEADERSHIP_MEMBERS.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Top Accent Gradient Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#0B3C91] via-[#3B82F6] to-[#F97316]" />

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                
                {/* Photo & Badge */}
                <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-100 h-64 sm:h-72 w-full">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C91]/90 via-[#0B3C91]/10 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#0B3C91] text-white px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-white/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>{leader.badge}</span>
                  </div>

                  {/* Name overlay at bottom of photo */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                      {leader.qualification}
                    </p>
                  </div>
                </div>

                {/* Leader Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-[#0B3C91] font-serif group-hover:text-[#F97316] transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <div className="inline-block bg-blue-50 text-[#0B3C91] px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">
                    {leader.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {leader.description}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic space-y-1 relative">
                  <Quote className="w-4 h-4 text-[#0B3C91] inline-block mr-1 opacity-70" />
                  <span>"{leader.quote}"</span>
                </div>

              </div>

              {/* Card Footer Button for Chairman */}
              {leader.id === 'l1' && (
                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => setShowFullChairmanMsg(true)}
                    className="w-full py-2.5 bg-blue-50 hover:bg-[#0B3C91] text-[#0B3C91] hover:text-white font-bold text-xs rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Chairman's Message</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Read Full Chairman Message Modal */}
        <AnimatePresence>
          {showFullChairmanMsg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-blue-100 text-[#1E293B]"
              >
                <button
                  onClick={() => setShowFullChairmanMsg(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={CHAIRMAN_MESSAGE.photo}
                    alt={CHAIRMAN_MESSAGE.name}
                    className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-[#0B3C91]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#0B3C91]">
                      {CHAIRMAN_MESSAGE.name}
                    </h3>
                    <p className="text-xs font-bold text-[#F97316]">{CHAIRMAN_MESSAGE.designation}</p>
                    <p className="text-[11px] text-slate-500">{CHAIRMAN_MESSAGE.qualification}</p>
                  </div>
                </div>

                <div className="prose prose-slate text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  {CHAIRMAN_MESSAGE.messageFull}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setShowFullChairmanMsg(false)}
                    className="px-6 py-2.5 bg-[#0B3C91] hover:bg-[#072B6B] text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Close Message
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
