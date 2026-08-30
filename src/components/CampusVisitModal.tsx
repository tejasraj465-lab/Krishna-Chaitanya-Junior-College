import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { CAMPUSES, COLLEGE_INFO, campusFormLabel } from '../data/collegeData';
import { ThemedSelect } from './ui/ThemedSelect';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import {
  openExternalUrl,
  normalizePhoneDigits,
  sanitizeForWhatsAppText,
  sanitizePersonName,
  sanitizePhoneInput,
  validatePersonName,
  validatePhone,
} from '../utils/security';

interface CampusVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusVisitModal: React.FC<CampusVisitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    campus: CAMPUSES[0].id,
    visitDate: '',
    timeSlot: 'Morning (10:00 AM - 12:00 PM)'
  });

  const [booked, setBooked] = useState(false);
  const [visitRefId, setVisitRefId] = useState('');
  const [formError, setFormError] = useState('');
  const isSubmittingRef = useRef(false);

  useBodyScrollLock(isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    const name = sanitizePersonName(formData.name);
    const phone = normalizePhoneDigits(formData.phone);
    const nameError = validatePersonName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      setFormError(nameError || phoneError || 'Please check your details.');
      return;
    }

    if (!CAMPUSES.some((campus) => campus.id === formData.campus)) {
      setFormError('Please select a valid campus.');
      return;
    }

    isSubmittingRef.current = true;
    setFormError('');

    const generatedRef = `KCJC-VISIT-${Math.floor(10000 + Math.random() * 90000)}`;
    setVisitRefId(generatedRef);
    setBooked(true);

    const selectedCampus = CAMPUSES.find((campus) => campus.id === formData.campus);
    const campusLabel = selectedCampus ? campusFormLabel(selectedCampus) : formData.campus;

    const waText = `*Guided Campus Visit Request*
----------------------------------
🆔 Ref ID: ${generatedRef}
👤 Name: ${sanitizeForWhatsAppText(name)}
📱 Phone: ${phone}
🏫 Campus: ${sanitizeForWhatsAppText(campusLabel, 120)}
📅 Preferred Date: ${formData.visitDate || 'Tomorrow'}
⏰ Time Slot: ${sanitizeForWhatsAppText(formData.timeSlot, 80)}
----------------------------------
Hello Krishna Chaitanya Team, my visit reference ID is ${generatedRef}. I would like to schedule a physical campus tour for our family.`;

    openExternalUrl(`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`);
    isSubmittingRef.current = false;
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
            aria-label="Close Visit Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!booked ? (
            <div className="space-y-4">
              <span className="bg-[#0B3C91] text-[#FBBF24] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Book A Physical Campus Tour
              </span>

              <h3 className="text-xl font-bold font-serif text-[#0B3C91]">
                Schedule Campus Visit
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Experience our 4K smart classrooms, digital labs, and AC hostels firsthand with an official student counselor.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 pt-1 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: sanitizePersonName(e.target.value, { trim: false }) })}
                    maxLength={80}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B3C91] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: sanitizePhoneInput(e.target.value) })}
                    maxLength={15}
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9+\s-]{10,15}"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B3C91] bg-slate-50"
                  />
                </div>

                <div>
                  <label htmlFor="visit-campus" className="block font-bold text-slate-800 mb-1">Campus Location *</label>
                  <ThemedSelect
                    id="visit-campus"
                    icon={MapPin}
                    value={formData.campus}
                    options={CAMPUSES.map((campus) => ({ value: campus.id, label: campusFormLabel(campus) }))}
                    onChange={(campus) => setFormData({ ...formData, campus })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Visit Date</label>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="visit-timeslot" className="block font-bold text-slate-800 mb-1">Time Slot</label>
                    <ThemedSelect
                      id="visit-timeslot"
                      icon={Clock}
                      value={formData.timeSlot}
                      options={[
                        { value: 'Morning (10:00 AM - 12:00 PM)', label: 'Morning (10 AM - 12 PM)' },
                        { value: 'Afternoon (2:00 PM - 4:00 PM)', label: 'Afternoon (2 PM - 4 PM)' },
                        { value: 'Evening (4:00 PM - 6:00 PM)', label: 'Evening (4 PM - 6 PM)' },
                      ]}
                      onChange={(timeSlot) => setFormData({ ...formData, timeSlot })}
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 min-h-[48px] bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all uppercase tracking-wider cursor-pointer mt-2 flex items-center justify-center gap-2"
                >
                  Confirm & Send On WhatsApp
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[#0B3C91]">
                Visit Scheduled!
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Visit Reference ID
                </span>
                <p className="font-mono font-bold text-base text-[#0B3C91]">
                  {visitRefId}
                </p>
              </div>

              <p className="text-xs text-slate-600">
                Opening WhatsApp with reference <strong>{visitRefId}</strong> to confirm your campus tour with our reception team.
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
