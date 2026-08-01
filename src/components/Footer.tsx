import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter
} from 'lucide-react';
import { COLLEGE_INFO, COURSES, CAMPUSES } from '../data/collegeData';
import kcLogo from '../assets/kc_logo.svg';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateToSection }) => {
  return (
    <footer className="bg-[#031333] text-slate-300 font-sans border-t border-blue-950 pb-20 md:pb-8 pt-16">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-blue-900/60">
          
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) {
                  onNavigateHome();
                  return;
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group cursor-pointer inline-flex"
              title="Go to Hero Section"
            >
              <img 
                src={kcLogo} 
                alt="Sri Krishna Chaitanya Educational Institutions" 
                className="w-12 h-12 object-contain shrink-0 group-hover:scale-105 transition-transform" 
              />
              <div>
                <span className="font-extrabold text-white text-xl font-serif tracking-tight uppercase group-hover:text-[#FBBF24] transition-colors">
                  KRISHNA <span className="text-[#FBBF24]">CHAITANYA</span>
                </span>
                <p className="text-[10px] text-blue-300 tracking-wider uppercase font-semibold">Junior College & Integrated Academy</p>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {COLLEGE_INFO.taglineSecondary} Recognized by State Board of Intermediate Education Telangana & Andhra Pradesh.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href={COLLEGE_INFO.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={COLLEGE_INFO.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={COLLEGE_INFO.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={COLLEGE_INFO.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 rounded-xl transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Academic Streams */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FBBF24] pl-2 font-serif">
              Academic Streams
            </h3>
            <ul className="space-y-2 text-xs">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateToSection?.('courses')}
                    className="hover:text-[#FBBF24] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span>{course.code} ({course.title.split(',')[0]})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Campuses */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FBBF24] pl-2 font-serif">
              Our Campuses
            </h3>
            <ul className="space-y-2 text-xs">
              {CAMPUSES.map((camp) => (
                <li key={camp.id}>
                  <a href={camp.googleMapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#FBBF24] transition-colors flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F97316]" />
                    <span className="truncate">{camp.city} ({camp.type.split(' ')[0]})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Central Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FBBF24] pl-2 font-serif">
              Central Desk
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <span>{COLLEGE_INFO.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>

              <div className="pt-2">
                <a 
                  href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 stroke-none" />
                  <span>WhatsApp 24/7 Helpline</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {COLLEGE_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Admission</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Mandatory Disclosures</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
