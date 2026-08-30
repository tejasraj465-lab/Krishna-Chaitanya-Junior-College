import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
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
  Copy,
  Check,
} from 'lucide-react';
import { ADMISSION_YEAR, CAMPUSES, COLLEGE_INFO, campusFormLabel } from '../data/collegeData';
import { ThemedSelect } from './ui/ThemedSelect';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import {
  normalizePhoneDigits,
  openExternalUrl,
  sanitizeForWhatsAppText,
  sanitizePersonName,
  sanitizePhoneInput,
  validatePersonName,
  validatePhone,
} from '../utils/security';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: string;
  preSelectedCampus?: string;
}

const FIELD =
  'w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-[#0B3C91] focus:ring-2 focus:ring-[#0B3C91]/15 text-sm font-medium outline-none bg-slate-50/80 transition-shadow';

const STREAM_OPTIONS = [
  { value: 'MPC', label: 'MPC — IIT-JEE / BITSAT' },
  { value: 'BiPC', label: 'BiPC — NEET / AIIMS' },
  { value: 'MEC', label: 'MEC — CA / IPMAT' },
  { value: 'CEC', label: 'CEC — CLAT / IAS' },
  { value: 'Long Term', label: 'Long Term — NEET / JEE / CA Repeater' },
];

const CAMPUS_OPTIONS = CAMPUSES.map((campus) => ({
  value: campus.id,
  label: campusFormLabel(campus),
}));

const resolveStream = (course?: string) => {
  const raw = (course ?? 'MPC').trim();
  if (/long\s*term/i.test(raw) || /longterm/i.test(raw)) return 'Long Term';
  const exact = STREAM_OPTIONS.find((option) => option.value === raw);
  if (exact) return exact.value;
  const match = STREAM_OPTIONS.find(
    (option) => raw.startsWith(option.value) || raw.includes(option.value)
  );
  return match?.value ?? 'MPC';
};

const resolveCampus = (campus?: string) => {
  const raw = (campus ?? '').trim();
  const match = CAMPUSES.find((item) => item.id === raw || item.name === raw);
  return match?.id ?? CAMPUSES[0]?.id ?? '';
};

const campusDisplayName = (campusId: string) => {
  const campus = CAMPUSES.find((item) => item.id === campusId);
  return campus ? campusFormLabel(campus) : campusId;
};

export const AdmissionModalBottomSheet: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourse = 'MPC',
  preSelectedCampus = CAMPUSES[0]?.id ?? '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    course: resolveStream(preSelectedCourse),
    campus: resolveCampus(preSelectedCampus),
  });

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');
  const isSubmittingRef = useRef(false);

  useBodyScrollLock(isOpen);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      studentName: '',
      phone: '',
      course: resolveStream(preSelectedCourse),
      campus: resolveCampus(preSelectedCampus),
    });
    setSubmitted(false);
    setApplicationId('');
    setCopied(false);
    setFormError('');
  }, [isOpen, preSelectedCourse, preSelectedCampus]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    const studentName = sanitizePersonName(formData.studentName);
    const phone = normalizePhoneDigits(formData.phone);

    const nameError = validatePersonName(studentName, 'Student name');
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setFormError(nameError || phoneError || 'Please check your details.');
      return;
    }

    isSubmittingRef.current = true;
    setFormError('');

    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `KCJC-${ADMISSION_YEAR.slice(0, 4)}-${randomDigits}`;
    setApplicationId(generatedId);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // confetti optional
    }

    setSubmitted(true);

    const campusLabel = campusDisplayName(formData.campus);
    const waText = `*Krishna Chaitanya Junior College Online Admission Application ${ADMISSION_YEAR}*
---------------------------------------
🆔 *Application ID:* ${generatedId}
👤 *Student Name:* ${sanitizeForWhatsAppText(studentName)}
📱 *Phone Number:* ${phone}
🎓 *Course Stream:* ${sanitizeForWhatsAppText(formData.course, 80)}
🏫 *Preferred Campus:* ${sanitizeForWhatsAppText(campusLabel, 120)}
---------------------------------------
Hello Admission Counselor! My Application ID is ${generatedId}. I have submitted my details on the website. Please guide me regarding seat booking & admission counseling.`;

    const waUrl = `https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    openExternalUrl(waUrl);
    isSubmittingRef.current = false;
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden overscroll-none bg-black/60 backdrop-blur-sm p-4"
      onClick={handleClose}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admission-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md mx-auto flex flex-col overflow-hidden rounded-3xl p-5 sm:p-7 relative shadow-2xl border border-blue-100 font-sans max-h-[calc(100dvh-2rem)]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-[#F97316] bg-white hover:bg-orange-50 text-[#F97316] flex items-center justify-center cursor-pointer transition-colors z-10"
          aria-label="Close Admission Form"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="pr-12 mb-5">
              <span className="bg-[#FBBF24] text-[#0B3C91] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-sm mb-2">
                <Sparkles className="w-3 h-3" /> Quick WhatsApp Admission Form
              </span>
              <h3 id="admission-modal-title" className="text-lg sm:text-2xl font-extrabold font-serif text-[#0B3C91] leading-none whitespace-nowrap">
                Apply For Admission {ADMISSION_YEAR}
              </h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Fill in these details to connect with our counselor on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admission-name" className="block text-sm font-bold text-[#0B3C91] mb-1.5">
                  Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admission-name"
                    type="text"
                    required
                    placeholder="Student full name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: sanitizePersonName(e.target.value, { trim: false }) })}
                    maxLength={80}
                    autoComplete="name"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admission-phone" className="block text-sm font-bold text-[#0B3C91] mb-1.5">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admission-phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: sanitizePhoneInput(e.target.value) })}
                    maxLength={15}
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9+\s-]{10,15}"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admission-stream" className="block text-sm font-bold text-[#0B3C91] mb-1.5">
                  Stream *
                </label>
                <ThemedSelect
                  id="admission-stream"
                  icon={GraduationCap}
                  value={formData.course}
                  options={STREAM_OPTIONS}
                  placeholder="Select stream"
                  onChange={(course) => setFormData({ ...formData, course })}
                />
              </div>

              <div>
                <label htmlFor="admission-campus" className="block text-sm font-bold text-[#0B3C91] mb-1.5">
                  Preferred Campus *
                </label>
                <ThemedSelect
                  id="admission-campus"
                  icon={MapPin}
                  value={formData.campus}
                  options={CAMPUS_OPTIONS}
                  placeholder="Preferred campus"
                  onChange={(campus) => setFormData({ ...formData, campus })}
                />
              </div>

              {formError && (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[48px] bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                <span>Submit on WhatsApp</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full inline-block mb-1">
                Application Submitted Successfully
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B3C91]">Your Admission Application</h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#0B3C91]/30 rounded-2xl p-4 text-left space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Unique Application ID</span>
                <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">ACTIVE {ADMISSION_YEAR.slice(0, 4)}</span>
              </div>

              <div className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-blue-200">
                <span className="font-mono font-black text-lg text-[#0B3C91] tracking-wide">{applicationId}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(applicationId);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2000);
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
                <p>
                  👤 <strong className="text-slate-800">Name:</strong> {formData.studentName}
                </p>
                <p>
                  📱 <strong className="text-slate-800">Phone:</strong> {formData.phone}
                </p>
                <p>
                  🎓 <strong className="text-slate-800">Stream:</strong> {formData.course}
                </p>
                <p>
                  🏫 <strong className="text-slate-800">Campus:</strong> {campusDisplayName(formData.campus)}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Opening WhatsApp with your details and <strong>Application ID ({applicationId})</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Admission Desk! My Application ID is ${applicationId}. I have submitted my application for ${formData.studentName} for course ${formData.course}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Open WhatsApp Chat</span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};
