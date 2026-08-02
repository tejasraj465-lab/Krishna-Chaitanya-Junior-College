import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Download, Sparkles, MessageCircle, Bot, ArrowRight, ShieldCheck, Award, GraduationCap, CheckCircle2, Building2, Calendar } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { heroSlides } from '../data/heroData';
import { COLLEGE_INFO } from '../data/collegeData';
import { HIGHLIGHT_COUNTERS } from '../data/collegeData';

interface HeroProps {
  onOpenApplyModal?: () => void;
  onOpenBrochureModal?: () => void;
  onOpenAIGuide?: () => void;
}

export const HeroSlider: React.FC<HeroProps> = ({
  onOpenApplyModal,
  onOpenBrochureModal,
  onOpenAIGuide
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-[#FBBF24]" />,
    Building2: <Building2 className="w-5 h-5 text-[#FBBF24]" />,
    Award: <Award className="w-5 h-5 text-[#FBBF24]" />,
    Calendar: <Calendar className="w-5 h-5 text-[#FBBF24]" />,
  };

  const quickStats = [
    {
      id: 'legacy',
      icon: ShieldCheck,
      iconClass: 'text-[#FBBF24]',
      value: '28+ Yrs',
      label: 'Academic Legacy',
    },
    {
      id: 'neet',
      icon: Award,
      iconClass: 'text-emerald-400',
      value: 'AIR 1',
      label: 'NEET 720/720 Score',
    },
    {
      id: 'pass-ratio',
      icon: GraduationCap,
      iconClass: 'text-orange-400',
      value: '99.8%',
      label: 'Board Pass Ratio',
    },
    {
      id: 'alumni',
      icon: CheckCircle2,
      iconClass: 'text-cyan-400',
      value: '10,000+',
      label: 'Top Engineers & Doctors',
    },
  ] as const;

  return (
    <section id="hero" className="relative w-full overflow-hidden select-none bg-slate-900">
      {/* 1. Ultra-Wide Image Slider with exact 21:9 aspect ratio */}
      <div className="w-full aspect-[4/3] sm:aspect-[21/9] min-h-[160px] sm:min-h-[280px] relative bg-[#020e28] overflow-hidden">
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
              <div className="relative w-full h-full bg-[#020e28] flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="eager"
                  className="w-full h-full object-contain object-center max-w-full max-h-full rounded-md sm:rounded-lg"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle inner highlight border */}
                <div className="absolute inset-0 border border-blue-500/20 pointer-events-none rounded-md sm:rounded-lg" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. Hero Matter Section (Rendered directly below the Image Slider) */}
      <div className="bg-gradient-to-b from-[#071D49] via-[#0B3C91] to-[#06245C] text-white py-4 sm:py-12 px-3 sm:px-6 lg:px-8 border-b border-blue-900 shadow-xl">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            {/* Left Main Content Block */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-5">
              {/* Institutional Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FBBF24] text-[#0B3C91] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-eyebrow shadow-md whitespace-nowrap max-w-full">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 fill-[#0B3C91] shrink-0" />
                <span className="whitespace-nowrap">Krishna Chaitanya • Admissions 2026-27 Open</span>
              </div>

              {/* Title */}
              <h1 className="text-display text-white">
                Admissions Open 2026-27 — Shape Your Future with Excellence
              </h1>

              {/* Subtitle */}
              <p className="text-blue-100 text-body-sm sm:text-lg font-normal leading-relaxed max-w-3xl">
                Integrated IIT-JEE, NEET, EAPCET, CA/CMA, Long Term & Intermediate Programs with 28+ Years of Academic Supremacy in Nellore.
              </p>

              {/* Action CTAs */}
              <div className="pt-1 sm:pt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap items-stretch sm:items-center sm:gap-4">
                <button
                  onClick={onOpenApplyModal}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white px-3.5 sm:px-8 py-2.5 sm:py-3.5 min-h-[42px] sm:min-h-[48px] rounded-xl font-bold text-caption sm:text-sm uppercase tracking-wide transition-all shadow-xl hover:shadow-orange-500/30 transform active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer w-full"
                >
                  <span>Apply For Admission</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={onOpenBrochureModal}
                  className="bg-white/10 hover:bg-white/20 text-white px-3.5 sm:px-7 py-2.5 sm:py-3.5 min-h-[42px] sm:min-h-[48px] rounded-xl font-semibold text-caption sm:text-sm border border-white/25 backdrop-blur-md transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24]" />
                  <span>Syllabus Brochure</span>
                </button>

                <a
                  href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Admission Team! I am interested in Intermediate 2026-27 admission.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 sm:px-5 sm:py-3.5 min-h-[42px] sm:min-h-[48px] rounded-xl font-semibold text-caption sm:text-sm transition-all flex items-center justify-center gap-1.5 border border-emerald-400/30 cursor-pointer w-full"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white stroke-none" />
                  <span>WhatsApp Desk</span>
                </a>

                {onOpenAIGuide && (
                  <button
                    onClick={onOpenAIGuide}
                    className="hidden sm:flex bg-blue-900/80 hover:bg-blue-800 text-blue-100 px-4 py-3.5 min-h-[48px] rounded-xl font-semibold text-xs border border-blue-400/30 transition-all items-center gap-2 cursor-pointer"
                  >
                    <Bot className="w-4 h-4 text-[#FBBF24]" />
                    <span>Ask AI Assistant</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Quick Key Stats — desktop sidebar only */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="grid grid-cols-2 gap-3.5">
                {quickStats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className="bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-sm space-y-1"
                    >
                      <StatIcon className={`w-6 h-6 ${stat.iconClass}`} />
                      <p className="text-2xl font-black text-white leading-tight">{stat.value}</p>
                      <p className="text-xs text-blue-200 font-medium leading-tight">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Stats — mobile: one unified block | desktop: At A Glance only (quick stats in sidebar above) */}
          <div className="mt-3 lg:mt-10 rounded-2xl lg:rounded-3xl border border-white/10 bg-white/6 backdrop-blur-md p-2.5 lg:p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-1.5 sm:gap-3 mb-2 lg:mb-5">
              <div>
                <span className="inline-flex items-center gap-1 text-[#FBBF24] bg-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-eyebrow border border-white/10">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  <span>A Legacy of Triumph</span>
                </span>
                <h2 className="text-base lg:text-section-title text-white mt-1.5 lg:mt-3 leading-snug">
                  Krishna Chaitanya At A Glance
                </h2>
              </div>
              <p className="hidden md:block text-body-sm sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                Proven academic strength, trusted faculty, and a legacy of top results across engineering, medical, commerce, and board examinations.
              </p>
            </div>

            {/* Mobile: single horizontal scroll — quick stats + highlight counters */}
            <div className="lg:hidden -mx-0.5">
              <div className="flex gap-2 overflow-x-auto pb-0.5 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {quickStats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className="snap-start shrink-0 w-[44%] rounded-xl bg-white/10 border border-white/10 p-2.5 shadow-lg"
                    >
                      <div className="flex items-center gap-2">
                        <StatIcon className={`w-3.5 h-3.5 shrink-0 ${stat.iconClass}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-black text-white leading-none">{stat.value}</p>
                          <p className="text-[10px] text-blue-200 font-medium leading-tight mt-0.5 line-clamp-2">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {HIGHLIGHT_COUNTERS.map((item) => (
                  <div
                    key={item.id}
                    className="snap-start shrink-0 w-[44%] rounded-xl bg-white/10 border border-white/10 p-2.5 shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 [&_svg]:w-3.5 [&_svg]:h-3.5">
                        {iconMap[item.icon] || <Award className="w-3.5 h-3.5 text-[#FBBF24]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-black text-[#FBBF24] font-serif leading-none">
                          {item.count.toLocaleString()}{item.suffix}
                        </div>
                        <p className="text-[10px] text-blue-100 mt-0.5 font-semibold leading-tight line-clamp-2">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: highlight counters grid only */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-4">
              {HIGHLIGHT_COUNTERS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white/10 border border-white/10 p-4 shadow-lg"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-3 [&_svg]:w-5 [&_svg]:h-5">
                    {iconMap[item.icon] || <Award className="w-5 h-5 text-[#FBBF24]" />}
                  </div>
                  <div className="text-3xl font-black text-[#FBBF24] font-serif leading-tight">
                    {item.count.toLocaleString()}{item.suffix}
                  </div>
                  <p className="text-xs text-blue-100 mt-1 font-semibold leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper CSS Tweaks */}
      <style>{`
        @media (max-width: 639px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none !important;
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
