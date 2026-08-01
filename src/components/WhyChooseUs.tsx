import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  GraduationCap, 
  Layers, 
  Target, 
  BarChart3, 
  Sparkles, 
  Clock, 
  MonitorPlay, 
  FlaskConical, 
  Users, 
  Smartphone, 
  Bus, 
  Building2, 
  Compass, 
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  LayoutGrid,
  Check
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/collegeData';
import { Container, SectionHeader, GlassCard } from './ui';

interface WhyChooseUsProps {
  onOpenApplyModal?: (course?: string, campus?: string) => void;
  onOpenCampusVisit?: () => void;
  variant?: 'home' | 'page';
  onExploreFullPage?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenApplyModal,
  onOpenCampusVisit,
  variant = 'home',
  onExploreFullPage
}) => {
  const [activeTab, setActiveTab] = useState<string>('academics');

  const getIcon = (iconName: string) => {
    const className = "w-5 h-5 text-[#0B3C91] shrink-0";
    switch (iconName) {
      case 'Trophy': return <Trophy className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Target': return <Target className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'MonitorPlay': return <MonitorPlay className={className} />;
      case 'FlaskConical': return <FlaskConical className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Bus': return <Bus className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <GraduationCap className={className} />;
    }
  };

  const categories = [
    { 
      id: 'academics', 
      label: 'Academics & Ranks', 
      icon: Trophy,
      count: 5,
      description: 'Result-oriented coaching with expert faculty & 1-on-1 mentorship.'
    },
    { 
      id: 'tech', 
      label: 'Digital Labs & AI', 
      icon: Sparkles,
      count: 4,
      description: 'Smart digital classrooms, modern science labs & AI learning analytics.'
    },
    { 
      id: 'parent', 
      label: 'Parent App & Care', 
      icon: Smartphone,
      count: 2,
      description: 'KCEI Parent App for live attendance, test scores & progress tracking.'
    },
    { 
      id: 'life', 
      label: 'Campus & Facilities', 
      icon: Building2,
      count: 4,
      description: 'Safe transport, separate residential hostels & 24x7 security.'
    },
    { 
      id: 'all', 
      label: 'View All 15 Highlights', 
      icon: LayoutGrid,
      count: 15,
      description: 'Complete overview of all 15 key features at Krishna Chaitanya.'
    },
  ];

  const getCategoryId = (item: typeof WHY_CHOOSE_US[0]) => {
    if ([1, 2, 3, 4, 5].includes(item.id)) return 'academics';
    if ([6, 7, 8, 9].includes(item.id)) return 'tech';
    if ([10, 11].includes(item.id)) return 'parent';
    if ([12, 13, 14, 15].includes(item.id)) return 'life';
    return 'all';
  };

  const filteredItems = activeTab === 'all' 
    ? WHY_CHOOSE_US 
    : WHY_CHOOSE_US.filter(item => getCategoryId(item) === activeTab);

  const currentCategoryObj = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section id="why-us" className={variant === 'home' ? 'section-padding-sm bg-[#F8FAFC] text-[#1E293B] scroll-mt-20 relative overflow-hidden' : 'py-10 md:py-14 bg-white text-[#1E293B]'}>
      {variant === 'home' && <div className="absolute inset-0 bg-mesh-light pointer-events-none" />}
      <Container className="relative z-10">
        
        <SectionHeader
          eyebrow="Why Choose KCJC?"
          title="Why Choose Krishna Chaitanya Junior College?"
          description="We combine academic rigor, integrated competitive coaching (IIT-JEE / NEET / EAPCET / CA), modern infrastructure, and personalized care to help every student excel."
          align={variant === 'home' ? 'center' : 'left'}
          className={variant === 'page' ? 'max-w-4xl mb-8' : ''}
        />

        {/* Streamlined Category Selector Pills */}
        {variant === 'home' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#0B3C91] text-white border-[#0B3C91] shadow-md ring-2 ring-blue-300'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#0B3C91]'}`} />
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.count}
                  </span>
                </div>
                <span className="text-xs font-bold line-clamp-1">
                  {cat.label}
                </span>
              </button>
            );
          })}
          </div>
        )}

        {variant === 'page' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#0B3C91] text-white border-[#0B3C91] shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#0B3C91]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Current Category Info Bar */}
        <GlassCard className="p-3.5 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2" hover={false}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0B3C91]">
              <currentCategoryObj.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B3C91]">
                {currentCategoryObj.label} ({filteredItems.length} Key Advantages)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {currentCategoryObj.description}
              </p>
            </div>
          </div>
          {activeTab !== 'all' && (
            <button
              onClick={() => setActiveTab('all')}
              className="text-xs font-bold text-[#0B3C91] hover:text-[#F97316] transition-colors shrink-0 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer"
            >
              <span>View All 15 Advantages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </GlassCard>

        {/* Compact Feature Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-3 sm:gap-4 ${
              activeTab === 'all' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredItems.map((item) => (
              <GlassCard
                key={item.id}
                className="p-4 flex items-start gap-3.5 group"
              >
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 group-hover:bg-[#0B3C91] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  {getIcon(item.icon)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-[#0B3C91] group-hover:text-[#F97316] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <span className="text-[10px] font-extrabold text-[#0B3C91] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0 hidden xs:inline-block">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {variant === 'home' && onExploreFullPage && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={onExploreFullPage}
              className="bg-[#0B3C91] hover:bg-[#072B6B] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Why Choose KCJC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </Container>
    </section>
  );
};
