import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  UserCheck, 
  FolderCheck, 
  CheckCircle2, 
  ArrowDown, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ADMISSION_STEPS } from '../data/collegeData';

interface AdmissionProcessProps {
  onOpenApplyModal: () => void;
}

export const AdmissionProcess: React.FC<AdmissionProcessProps> = ({ onOpenApplyModal }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-6 h-6 text-white" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-white" />;
      case 'FolderCheck': return <FolderCheck className="w-6 h-6 text-white" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="admissions" className="py-16 md:py-24 bg-white text-[#1E293B] scroll-mt-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#0B3C91] bg-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
            Hassle-Free 4-Step Process
          </span>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Clear, transparent, and fast online or offline admission workflow for 2026-27 session.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {ADMISSION_STEPS.map((stepItem, idx) => (
            <React.Fragment key={stepItem.step}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-white rounded-3xl p-6 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#FBBF24] text-[#0B3C91] font-extrabold text-xs flex items-center justify-center font-serif shadow-sm">
                      0{stepItem.step}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-[#0B3C91] flex items-center justify-center shadow-md">
                      {getStepIcon(stepItem.icon)}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0B3C91] font-serif mb-2">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {stepItem.step} Verification</span>
                </div>
              </motion.div>

              {/* Down Arrow for Mobile timeline flow */}
              {idx < ADMISSION_STEPS.length - 1 && (
                <div className="md:hidden flex justify-center -my-3 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#0B3C91] text-[#FBBF24] flex items-center justify-center shadow-md">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-gradient-to-r from-[#0B3C91] to-[#072B6B] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-blue-500/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-serif text-white">
              Ready to begin Step 1?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              Submit your preliminary details in 30 seconds via our thumb-friendly WhatsApp form.
            </p>
          </div>

          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer transform active:scale-98"
          >
            <span>Start Online Application</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
