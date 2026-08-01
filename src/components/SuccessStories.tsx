import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Play, Star, CheckCircle, X, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/collegeData';

export const SuccessStories: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#EFF6FF] text-[#1E293B]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#0B3C91] bg-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
            Real Voices of Success
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3C91] font-serif mt-3">
            Parent & Alumni Success Stories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Hear from parents whose children achieved dream ranks and alumni now excelling at top global institutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Role Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-50 text-[#0B3C91] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-blue-100">
                    {test.role} • {test.course}
                  </span>

                  <div className="flex items-center text-[#FBBF24]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24]" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-blue-200/60 absolute -top-2 -left-2" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pt-3 pl-3">
                    "{test.quote}"
                  </p>
                </div>
              </div>

              {/* Person Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={test.photo}
                  alt={test.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-blue-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0B3C91]">
                    {test.name}
                  </h3>
                  {test.collegeOrCompany && (
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {test.collegeOrCompany}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
