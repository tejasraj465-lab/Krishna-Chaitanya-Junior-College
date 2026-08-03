import React, { memo, useMemo, useState } from 'react';
import { CheckCircle, ImageIcon, Award } from 'lucide-react';
import { NCC_EXPLORE, NCC_GALLERY_PHOTOS, NccGalleryCategory } from '../data/nccData';
import { GlassCard } from './ui';

const CheckList = memo<{ items: readonly string[]; columns?: 1 | 2 }>(function CheckList({
  items,
  columns = 2,
}) {
  return (
    <ul className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-snug">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});

const BulletList = memo<{ items: readonly string[] }>(function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-[#0B3C91] font-bold shrink-0 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
});

export const NccExploreContent: React.FC<{ variant?: 'page' | 'modal' }> = ({ variant = 'page' }) => {
  const data = NCC_EXPLORE;
  const isModal = variant === 'modal';
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<NccGalleryCategory | 'All'>('All');

  const filteredGallery = useMemo(() => {
    if (activeGalleryCategory === 'All') return NCC_GALLERY_PHOTOS;
    return NCC_GALLERY_PHOTOS.filter((photo) => photo.category === activeGalleryCategory);
  }, [activeGalleryCategory]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {!isModal && (
        <div className="space-y-3">
          <p className="text-label text-[#F97316] font-extrabold tracking-widest uppercase">{data.eyebrow}</p>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B3C91] leading-snug">{data.title}</h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{data.intro}</p>
        </div>
      )}
      {isModal && (
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{data.intro}</p>
      )}

      <GlassCard className="p-4 sm:p-5" hover={false}>
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] mb-3">{data.whyJoinHeading}</h3>
        <CheckList items={data.whyJoinItems} />
      </GlassCard>

      <GlassCard className="p-4 sm:p-5" hover={false}>
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] mb-3">{data.trainingHeading}</h3>
        <CheckList items={data.trainingItems} columns={2} />
      </GlassCard>

      <GlassCard className="p-4 sm:p-5" hover={false}>
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] mb-1">{data.opportunitiesHeading}</h3>
        <p className="text-[11px] sm:text-xs text-slate-500 mb-3">{data.opportunitiesNote}</p>
        <CheckList items={data.opportunitiesItems} columns={1} />
      </GlassCard>

      <GlassCard className="p-4 sm:p-5" hover={false}>
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] mb-3">{data.benefitsHeading}</h3>
        <BulletList items={data.benefitsItems} />
      </GlassCard>

      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91]">{data.galleryHeading}</h3>
        <p className="text-xs sm:text-sm text-slate-500">{data.galleryNote}</p>
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...data.galleryCategories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveGalleryCategory(cat)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold cursor-pointer transition-colors ${
                activeGalleryCategory === cat
                  ? 'bg-[#0B3C91] text-white'
                  : 'bg-[#EFF6FF] text-[#0B3C91] hover:bg-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {filteredGallery.map((photo) => (
              <figure
                key={photo.id}
                className="rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <figcaption className="p-2 text-[10px] sm:text-xs text-slate-600 leading-snug">
                  {photo.caption ?? photo.title}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 sm:p-8 text-center">
            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Real NCC photographs for{' '}
              {activeGalleryCategory === 'All' ? 'parade, training, camps, and events' : activeGalleryCategory}{' '}
              will appear here once uploaded.
            </p>
          </div>
        )}
      </section>

      <GlassCard className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/80 to-white border-amber-100" hover={false}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B3C91] text-[#FBBF24] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B3C91] mb-2">
              {data.achievementsHeading}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{data.achievementsPlaceholder}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
