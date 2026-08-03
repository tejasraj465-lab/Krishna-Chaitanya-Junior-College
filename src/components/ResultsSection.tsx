import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { RANKERS } from '../data/collegeData';

export const ResultsSection: React.FC = () => {
  const [filterExam, setFilterExam] = useState<string>('ALL');

  const filteredRankers = filterExam === 'ALL'
    ? RANKERS
    : RANKERS.filter(r => r.exam === filterExam);

  return (
    <section id="results" className="py-16 md:py-24 bg-[#0B3C91] text-white relative overflow-hidden scroll-mt-24">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#FBBF24] bg-blue-900/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            Outstanding Academic Supremacy 2025-26
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mt-3">
            Top All-India Rankers & Board Toppers
          </h2>
          <p className="text-sm sm:text-base text-blue-200 mt-2">
            Celebrating the extraordinary dedication of our students, faculty mentors, and parent community.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {['ALL', 'IIT-JEE', 'NEET', 'EAMCET', 'BOARD'].map((exam) => (
              <button
                key={exam}
                onClick={() => setFilterExam(exam)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filterExam === exam
                    ? 'bg-[#FBBF24] text-[#0B3C91] shadow-lg scale-105'
                    : 'bg-blue-900/60 text-blue-100 hover:bg-blue-800 border border-blue-500/30'
                }`}
              >
                {exam === 'ALL' ? 'All Top Results' : exam}
              </button>
            ))}
          </div>
        </div>

        {/* Ranker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRankers.map((ranker, idx) => (
            <motion.div
              key={ranker.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-blue-950/80 hover:bg-blue-900/90 rounded-3xl p-6 border border-blue-400/30 shadow-xl relative flex flex-col justify-between group transform hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Top Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gradient-to-r from-[#FBBF24] to-[#F97316] text-[#0B3C91] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Trophy className="w-3.5 h-3.5 fill-[#0B3C91]" /> {ranker.rank}
                  </span>

                  <span className="text-xs text-blue-300 font-semibold bg-blue-900/60 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                    {ranker.exam} ({ranker.year})
                  </span>
                </div>

                {/* Photo & Name */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={ranker.photo}
                    alt={ranker.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FBBF24] shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      {ranker.name}
                    </h3>
                    <p className="text-xs text-[#FBBF24] font-semibold">
                      Score: {ranker.score}
                    </p>
                    <p className="text-[11px] text-blue-200 truncate max-w-[180px]">
                      {ranker.course}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-3.5 rounded-2xl bg-blue-900/50 border border-blue-500/20 relative">
                  <Quote className="w-5 h-5 text-blue-400/30 absolute top-2 right-2" />
                  <p className="text-xs text-blue-100 italic leading-relaxed pr-3">
                    "{ranker.quote}"
                  </p>
                </div>
              </div>

              {/* Campus */}
              <div className="mt-4 pt-3 border-t border-blue-800/80 text-[11px] text-blue-300 flex items-center justify-between font-medium">
                <span>{ranker.campus}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Result
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admissions Direct Call Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0B3C91] to-[#072B6B] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-blue-400/30">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider bg-[#FBBF24] text-[#0B3C91] px-3 py-1 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Intermediate Admissions 2026-27
            </div>
            <h3 className="text-2xl font-black font-serif text-white">
              Join India's Top Academic Excellence League
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              Limited seats across Nellore campuses for IIT-JEE, NEET, CA/CMA & Long Term programs.
            </p>
          </div>

          <a
            href={`https://wa.me/919100088888?text=${encodeURIComponent('Hello Krishna Chaitanya! I want to inquire about Intermediate Admissions 2026-27.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all text-center uppercase tracking-wider cursor-pointer whitespace-nowrap"
          >
            Enquire Admissions
          </a>
        </div>

      </div>
    </section>
  );
};
