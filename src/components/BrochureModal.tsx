import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { COLLEGE_INFO, COURSES } from '../data/collegeData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);

    // Create a simulated PDF download blob
    const content = `KRISHNA CHAITANYA JUNIOR COLLEGE
Syllabus & Information Brochure 2026-27
--------------------------------------------------
Official Portal: ${COLLEGE_INFO.website}
Admissions Helpline: ${COLLEGE_INFO.phonePrimary}

OFFERED STREAMS & BATCHES:
1. MPC - Maths, Physics, Chemistry (Integrated IIT-JEE Main & Advanced)
2. BiPC - Biology, Physics, Chemistry (Integrated NEET Medical)
3. MEC - Maths, Economics, Commerce (Integrated CA/CMA & Foundation)
4. CEC - Civics, Economics, Commerce (Integrated CA/CMA, Law & Civil Services)
5. LONG TERM - Dedicated 1-Year Repeater Batches (NEET, JEE & CA/CMA)

Campuses:
- Nellore Main Residential Campus
- Nellore Trunk Road Campus
- Nellore Pogathota Girls Campus
- Nellore Vedayapalem Campus
--------------------------------------------------
Thank you for downloading our brochure!`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KCJC_Junior_College_Brochure_2026.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-blue-100 font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Brochure Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!downloaded ? (
            <div className="space-y-4">
              <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Official Prospectus 2026-27
              </span>

              <h3 className="text-xl font-bold font-serif text-[#0B3C91]">
                Download College Prospectus & Fee Structure
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your email to instantly download the complete 32-page syllabus roadmap, faculty profiles, and fee structure details.
              </p>

              <form onSubmit={handleDownload} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Email Address or Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B3C91] bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 min-h-[48px] bg-[#0B3C91] hover:bg-[#072B6B] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FBBF24]" />
                  <span>Download Prospectus PDF</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B3C91]">
                Brochure Downloaded!
              </h3>
              <p className="text-xs text-slate-600">
                The official {COLLEGE_INFO.name} Prospectus PDF has been downloaded to your device.
              </p>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 min-h-[48px] bg-[#0B3C91] hover:bg-[#072B6B] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
