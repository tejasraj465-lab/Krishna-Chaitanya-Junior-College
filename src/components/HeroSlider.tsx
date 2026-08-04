import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { MessageCircle, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { heroSlides } from '../data/heroData';
import { AFFILIATION_LOGOS, COLLEGE_INFO } from '../data/collegeData';

interface HeroProps {
  onOpenApplyModal?: () => void;
  onOpenAIGuide?: () => void;
}

const TRUST_STATS = [
  { id: 'years', value: '28+', label: 'Years of Excellence' },
  { id: 'campuses', value: '17', label: 'Campuses' },
  { id: 'students', value: '13,000+', label: 'Students' },
  { id: 'faculty', value: '500+', label: 'Faculty & Staff' },
  { id: 'alumni', value: '2,00,000+', label: 'Alumni' },
] as const;

const VERIFIED_AFFILIATIONS = [
  {
    id: 'bieap',
    label: 'Board of Intermediate Education, Andhra Pradesh',
    shortLabel: 'BIEAP, Andhra Pradesh',
    logo: AFFILIATION_LOGOS.bieap,
    alt: 'Board of Intermediate Education, Andhra Pradesh logo',
  },
  {
    id: 'ncc',
    label: 'NCC Unit',
    shortLabel: 'NCC Unit',
    logo: AFFILIATION_LOGOS.ncc,
    alt: 'National Cadet Corps (NCC) India logo',
  },
] as const;

export const HeroSlider: React.FC<HeroProps> = ({ onOpenApplyModal }) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden select-none bg-slate-900">
      {/* Results label — above banner */}
      <div className="bg-[#031333] border-b border-blue-950/50 px-3 sm:px-6 py-1.5 sm:py-2">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10">
          <span className="inline-flex items-center bg-[#FBBF24] text-[#0B3C91] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shadow-sm">
            🏆 Intermediate Results 2026
          </span>
        </div>
      </div>

      {/* Image slider / results banner */}
      <div className="w-full aspect-[2/1] sm:aspect-[21/9] max-sm:min-h-[160px] max-sm:max-h-[200px] sm:min-h-[280px] relative bg-[#020e28] overflow-hidden">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          className="w-full h-full hero-swiper"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full bg-[#020e28] flex items-center justify-center p-0.5 sm:p-2 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="eager"
                  className="w-full h-full object-contain object-center max-w-full max-h-full rounded-sm sm:rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-blue-500/20 pointer-events-none rounded-sm sm:rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero content */}
      <div className="bg-gradient-to-b from-[#071D49] via-[#0B3C91] to-[#06245C] text-white py-2.5 sm:py-12 px-3 sm:px-6 lg:px-8 border-b border-blue-900 shadow-xl">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="max-w-4xl space-y-1.5 sm:space-y-5">
            <h1 className="text-display text-white max-sm:text-[1.2rem] max-sm:leading-snug">
              Nellore&apos;s Trusted Junior College for Academic Excellence
            </h1>

            <p className="text-blue-100 text-body-sm sm:text-lg font-normal leading-relaxed max-w-3xl max-sm:text-[0.8125rem] max-sm:leading-snug">
              Krishna Chaitanya Junior College has empowered students for 28+ years through experienced faculty,
              disciplined mentoring, and integrated competitive-exam coaching.
            </p>

            <div className="pt-0.5 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-4 max-w-xl sm:max-w-none">
              <button
                onClick={onOpenApplyModal}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-3 sm:px-8 py-2 sm:py-3.5 min-h-[38px] sm:min-h-[48px] rounded-xl font-bold text-[11px] sm:text-sm uppercase tracking-wide transition-all shadow-xl hover:shadow-orange-500/30 transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <a
                href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Admission Team! I would like to talk to an admission counselor about Intermediate admissions.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-5 py-2 sm:py-3.5 min-h-[38px] sm:min-h-[48px] rounded-xl font-semibold text-[11px] sm:text-sm transition-all flex items-center justify-center gap-1.5 border border-emerald-400/30 cursor-pointer w-full sm:w-auto text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white stroke-none shrink-0" />
                <span>Talk to an Admission Counselor (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Trust statistics — compact on mobile, no horizontal scroll */}
          <div className="mt-3 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-4">
            {TRUST_STATS.map((stat) => (
              <div
                key={stat.id}
                className="rounded-lg sm:rounded-2xl bg-white/10 border border-white/10 p-1.5 sm:p-4 backdrop-blur-sm shadow-lg text-center"
              >
                <p className="text-sm sm:text-2xl lg:text-3xl font-black text-[#FBBF24] font-serif leading-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-blue-100 mt-0.5 font-semibold leading-snug line-clamp-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 border-t border-white/10 pt-4 sm:pt-6">
            <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-200/80 mb-3 sm:mb-4">
              Recognised &amp; Affiliated
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-md sm:max-w-2xl mx-auto">
              {VERIFIED_AFFILIATIONS.map(({ id, label, shortLabel, logo, alt }) => (
                <div
                  key={id}
                  className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-1 ring-white/40 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 rounded-lg bg-slate-50 p-1.5 sm:p-2">
                    <img
                      src={logo}
                      alt={alt}
                      className="max-w-full max-h-full object-contain drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[9px] sm:text-xs text-[#0B3C91] font-bold text-center leading-snug">
                    <span className="sm:hidden">{shortLabel}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none !important;
          }
          .hero-swiper .swiper-pagination {
            bottom: 2px !important;
          }
          .hero-swiper .swiper-pagination-bullet {
            width: 5px;
            height: 5px;
          }
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #ffffff;
          background: rgba(11, 60, 145, 0.7);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.2s ease;
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 15px;
          font-weight: bold;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: #0B3C91;
          color: #FBBF24;
          border-color: #FBBF24;
        }
        .hero-swiper .swiper-pagination {
          bottom: 6px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.6;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #FBBF24 !important;
          opacity: 1;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
