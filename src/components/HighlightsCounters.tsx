import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Building2, Award, Trophy, Calendar } from 'lucide-react';
import { HIGHLIGHT_COUNTERS } from '../data/collegeData';

export const HighlightsCounters: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#FBBF24]" />,
    Building2: <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#FBBF24]" />,
    Award: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#FBBF24]" />,
    Trophy: <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#FBBF24]" />,
    Calendar: <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#FBBF24]" />
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#072B6B] via-[#0B3C91] to-[#082C6E] text-white relative overflow-hidden border-y border-blue-800/40">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-[#FBBF24] text-[11px] sm:text-xs font-black uppercase tracking-widest bg-blue-900/90 px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-sm">
            <span>A Legacy of Triumph</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-white mt-3 tracking-tight">
            Krishna Chaitanya At A Glance
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/90 mt-2 leading-relaxed">
            Proven track record of excellence across academic coaching, faculty caliber, and top national ranks.
          </p>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {HIGHLIGHT_COUNTERS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`bg-gradient-to-b from-blue-900/80 to-blue-950/90 hover:from-blue-800/90 hover:to-blue-900/95 border border-blue-400/25 hover:border-amber-400/50 rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl flex flex-col items-center justify-between group ${
                index === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-950 to-indigo-950 rounded-2xl flex items-center justify-center mb-3 shadow-inner border border-blue-500/20 group-hover:scale-105 group-hover:border-amber-400/40 transition-all">
                {iconMap[item.icon] || <Award className="w-6 h-6 text-[#FBBF24]" />}
              </div>

              {/* Number Counter */}
              <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-[#FBBF24] font-serif tracking-tight leading-tight">
                {item.count.toLocaleString()}{item.suffix}
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm text-blue-100 font-semibold mt-1.5 leading-snug">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

