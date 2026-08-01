import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Phone, 
  GraduationCap, 
  MapPin, 
  Send,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { COLLEGE_INFO, COURSES, CAMPUSES } from '../data/collegeData';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: string;
  preSelectedCampus?: string;
}

export const AdmissionModalBottomSheet: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourse = 'MPC',
  preSelectedCampus = 'Nellore Main Residential Campus'
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    course: preSelectedCourse,
    campus: preSelectedCampus,
    hostelRequired: 'Yes',
    marks10th: 'Above 90%'
  });

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone) return;

    // Generate Unique Application ID (e.g. KCJC-2026-84920)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `KCJC-2026-${randomDigits}`;
    setApplicationId(generatedId);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    setSubmitted(true);

    // Format WhatsApp query message with Unique Application ID
    const waText = `*Krishna Chaitanya Junior College Online Admission Application 2026-27*
---------------------------------------
🆔 *Application ID:* ${generatedId}
👤 *Student Name:* ${formData.studentName}
👨‍👩‍👦 *Parent Name:* ${formData.parentName || 'N/A'}
📱 *Phone Number:* ${formData.phone}
🎓 *Course Chosen:* ${formData.course}
🏫 *Preferred Campus:* ${formData.campus}
🏠 *Hostel Facility Needed:* ${formData.hostelRequired}
📊 *10th Board Marks:* ${formData.marks10th}
---------------------------------------
Hello Admission Counselor! My Application ID is ${generatedId}. I have submitted my details on the website. Please guide me regarding seat booking & admission counseling.`;

    const waUrl = `https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-blue-100 font-sans"
        >
          {/* Top Handle bar for mobile bottom sheet UX */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Admission Form"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-5">
              {/* Header */}
              <div>
                <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm mb-2">
                  <Sparkles className="w-3 h-3" /> Quick WhatsApp Admission Form
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-serif text-[#0B3C91]">
                  Apply For Admission 2026-27
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill in details below to instantly connect with our senior counselor on WhatsApp.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700">
                {/* Student Name */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. K. Sai Siddartha"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-1 focus:ring-[#0B3C91] text-xs font-medium outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Phone & Parent Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-1 focus:ring-[#0B3C91] text-xs font-medium outline-none bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      placeholder="Parent's Name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-1 focus:ring-[#0B3C91] text-xs font-medium outline-none bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Course Select */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Select Course Stream *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-1 focus:ring-[#0B3C91] text-xs font-semibold outline-none bg-slate-50"
                  >
                    <option value="MPC">MPC (Maths, Physics, Chem - Integrated IIT-JEE/BITSAT)</option>
                    <option value="BiPC">BiPC (Biology, Physics, Chem - Integrated NEET/AIIMS)</option>
                    <option value="MEC">MEC (Maths, Economics, Commerce - Integrated CA/IPMAT)</option>
                    <option value="CEC">CEC (Civics, Economics, Commerce - Integrated CLAT/IAS)</option>
                  </select>
                </div>

                {/* Campus Select */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Select Preferred Campus *
                  </label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-1 focus:ring-[#0B3C91] text-xs font-semibold outline-none bg-slate-50"
                  >
                    {CAMPUSES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Hostel & Marks Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Hostel Needed?
                    </label>
                    <select
                      value={formData.hostelRequired}
                      onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50"
                    >
                      <option value="Yes">Yes (Residential)</option>
                      <option value="No">No (Day Scholar)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      10th Grade Marks
                    </label>
                    <select
                      value={formData.marks10th}
                      onChange={(e) => setFormData({ ...formData, marks10th: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50"
                    >
                      <option value="Above 95%">Above 95%</option>
                      <option value="90% - 95%">90% - 95%</option>
                      <option value="80% - 90%">80% - 90%</option>
                      <option value="Below 80%">Below 80%</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-14 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer active:scale-98 mt-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>Submit & Launch WhatsApp Chat</span>
                </button>

                <p className="text-[10px] text-slate-400 text-center">
                  By submitting, you agree to receive official admission guidance from {COLLEGE_INFO.name}.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full inline-block mb-1">
                  Application Submitted Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B3C91]">
                  Your Admission Application
                </h3>
              </div>

              {/* Unique Application ID Display Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#0B3C91]/30 rounded-2xl p-4 text-left space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Unique Application ID
                  </span>
                  <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    ACTIVE 2026
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-blue-200">
                  <span className="font-mono font-black text-lg text-[#0B3C91] tracking-wide">
                    {applicationId || 'KCJC-2026-84920'}
                  </span>
                  <button
                    onClick={() => {
                      if (applicationId) {
                        navigator.clipboard.writeText(applicationId);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-[#0070CD] hover:text-[#0B3C91] px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                  <p>👤 <strong className="text-slate-800">Student:</strong> {formData.studentName}</p>
                  <p>🎓 <strong className="text-slate-800">Stream:</strong> {formData.course} | 🏫 <strong className="text-slate-800">Campus:</strong> {formData.campus}</p>
                  <p>📱 <strong className="text-slate-800">Contact:</strong> {formData.phone}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Opening WhatsApp with your filled details & <strong>Application ID ({applicationId})</strong>. Our counselor will assist you!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <a
                  href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Admission Desk! My Application ID is ${applicationId}. I have submitted my application for ${formData.studentName} for course ${formData.course}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Open WhatsApp Chat</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
