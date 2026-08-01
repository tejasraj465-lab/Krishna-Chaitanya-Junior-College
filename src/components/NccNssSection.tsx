import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Flag, 
  CheckCircle,
  ShieldCheck,
  Target,
  Compass,
  Zap,
  Star
} from 'lucide-react';

export const NccNssSection: React.FC = () => {
  const nccFeatures = [
    { 
      title: 'Military Discipline & Drill Training', 
      desc: 'Smart drill practice, parade command, uniform etiquette, and development of Officer-Like Qualities (OLQ).',
      icon: Target
    },
    { 
      title: 'Republic Day Parade (RDC) Delhi', 
      desc: 'Consistent selection and representation of KCJC cadets at the prestigious New Delhi Kartavya Path RDC Parade.',
      icon: Flag
    },
    { 
      title: 'Defense Reservation & SSB Pathway', 
      desc: 'Bonus marks and direct SSB interview entries for NCC \'A\' & \'B\' Certificate holders in NDA, CDS, AFCAT & Police Services.',
      icon: ShieldCheck
    },
    { 
      title: 'National Camps & Adventure Training', 
      desc: 'Combined Annual Training Camps (CATC), Thal Sainik Camp (TSC), firing range drills, obstacle courses & trekking.',
      icon: Compass
    }
  ];

  const nccBenefits = [
    '100% Pass Rate in NCC \'A\' & \'B\' Certificate Examinations',
    'Special SSB Interview Direct Coaching for Defense Aspirants',
    'Physical Stamina, Firing Range Drills & Obstacle Course Access',
    'Special Weightage in University & Engineering/Medical Admissions',
    'Cadet Leadership Appointments (SUO, JUO, Sergeant Ranks)',
    'National Integration Camps across India'
  ];

  return (
    <section id="ncc-nss" className="py-16 md:py-24 bg-slate-900 text-white scroll-mt-20 relative overflow-hidden">
      {/* Background Subtle Accent Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#FBBF24] bg-blue-950/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-800 shadow-md inline-flex items-center gap-2">
            <Flag className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>3 AP Battalion Accredited Unit</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif mt-3.5">
            National Cadet Corps (NCC) Cadet Wing
          </h2>
          <p className="text-sm sm:text-base text-blue-200 mt-2.5 leading-relaxed font-medium">
            Unit Motto: <span className="text-[#FBBF24] font-bold">"Unity and Discipline" (Ekta aur Anushasan)</span>. At Krishna Chaitanya, we forge patriotic leaders, physically fit cadets, and future Defense Officers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image Banner Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-gradient-to-b from-blue-950 to-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-blue-800/60 flex flex-col justify-between"
          >
            <div className="relative h-72 sm:h-80">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
                alt="NCC Cadet Parade Krishna Chaitanya"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-[#FBBF24] text-[#0B3C91] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#0B3C91]" /> Accredited NCC Battalion
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <h3 className="text-2xl font-extrabold font-serif text-white">
                  3 AP BN NCC Unit
                </h3>
                <p className="text-xs text-blue-200 mt-0.5 font-medium">
                  Official Military Training Accreditation for Intermediate Students
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The Krishna Chaitanya NCC wing prepares cadets for official <strong className="text-white">'A' & 'B' Certificate</strong> examinations. NCC certificate holders receive direct exemptions and reservations in Defense entrance exams (NDA, CDS, AFCAT) and state engineering/medical admissions.
              </p>

              <div className="p-4 bg-blue-950/80 rounded-2xl border border-blue-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">RDC Delhi Selection</span>
                  <span className="text-[#FBBF24] font-extrabold text-sm">12 Cadets Selected (2025)</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Pass Percentage</span>
                  <span className="text-emerald-400 font-extrabold text-sm">100% Certificate Clearance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Feature Cards 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nccFeatures.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="p-5 bg-blue-950/40 rounded-2xl border border-blue-800/50 hover:border-[#FBBF24]/50 transition-all group"
                  >
                    <div className="p-2.5 bg-[#0B3C91] text-[#FBBF24] rounded-xl w-fit mb-3 shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FBBF24] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* NCC Key Highlights Checklist */}
            <div className="bg-gradient-to-r from-blue-950/80 to-slate-900/90 p-6 rounded-3xl border border-blue-800/60 shadow-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FBBF24] flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>NCC Cadet Advantages at Krishna Chaitanya</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {nccBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

