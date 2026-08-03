import {
  ADMISSION_STEPS,
  CAMPUSES,
  CHAIRMAN_MESSAGE,
  COLLEGE_INFO,
  COURSES,
  FACILITIES,
  FAQ_LIST,
  GALLERY_ITEMS,
  HERO_SLIDES,
  HIGHLIGHT_COUNTERS,
  LEADERSHIP_MEMBERS,
  RANKERS,
} from './collegeData';
import { PROGRAM_DETAILS, COURSE_CATEGORIES } from './courseDetailsData';
import { CAMPUSES_SECTION } from './campusesSectionData';
import { NCC_EXPLORE, NCC_HOME } from './nccData';
import { KCJC_ADVANTAGE_PAGE } from './whyChooseAdvantageData';
import {
  WHY_CHOOSE_CATEGORIES,
  WHY_CHOOSE_HOME_FEATURE_CARDS,
  WHY_CHOOSE_HOME_INTRO,
  WHY_CHOOSE_HOME_TITLE,
  WHY_CHOOSE_HOME_TRUST_STATEMENT,
  WHY_CHOOSE_PAGE_INTRO,
  WHY_CHOOSE_VERIFIED_ITEMS,
} from './whyChooseData';

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const formatCourses = () =>
  COURSES.map(
    (c) =>
      `• ${c.code} — ${c.title}\n  Subtitle: ${c.subtitle}\n  Duration: ${c.duration}\n  Eligibility: ${c.eligibility}\n  Integrated coaching: ${c.integratedCoaching.join(', ')}\n  Subjects: ${c.subjects.join(', ')}\n  Career options: ${c.careerOptions.join(', ')}\n  Description: ${c.description}`
  ).join('\n\n');

const formatPrograms = () =>
  Object.values(PROGRAM_DETAILS)
    .map((p) => {
      const lines = [
        `• ${p.name} (${p.stream})`,
        `  Badge: ${p.badge}`,
        `  Tagline: ${p.tagline}`,
        `  Structure: ${p.structure.join('; ')}`,
        p.features?.length ? `  Features: ${p.features.join('; ')}` : null,
        p.advantages?.length ? `  Advantages: ${p.advantages.join('; ')}` : null,
        p.techLearning
          ? `  Tech: AI model, tablet learning, digital boards, recorded lectures, 360° test analysis`
          : null,
        `  Outcome: ${p.outcome}`,
      ];
      return lines.filter(Boolean).join('\n');
    })
    .join('\n\n');

const formatCampuses = () =>
  CAMPUSES.map((c) => {
    const slug = slugify(c.id);
    return `• ${c.name}
  Category: ${c.category} | Type: ${c.type}
  Address: ${c.address}
  Phone: ${c.phone || COLLEGE_INFO.phonePrimary}
  Email: ${c.email || COLLEGE_INFO.email}
  Facilities/tags: ${c.facilities.join(', ')}
  Detail page: /campuses/${slug}`;
  }).join('\n\n');

const formatFacilities = () =>
  FACILITIES.map(
    (f) =>
      `• ${f.title} (${f.category})\n  ${f.description}\n  Features: ${f.features.join(', ')}`
  ).join('\n\n');

const formatRankers = () =>
  RANKERS.map(
    (r) =>
      `• ${r.name} — ${r.exam} ${r.rank}${r.score ? ` (${r.score})` : ''}, ${r.year}, ${r.course}, ${r.campus}`
  ).join('\n');

const formatGalleryCategories = () => {
  const categories = [...new Set(GALLERY_ITEMS.map((g) => g.category))];
  return categories.map((cat) => {
    const items = GALLERY_ITEMS.filter((g) => g.category === cat);
    return `• ${cat}: ${items.map((i) => i.title).join('; ')}`;
  }).join('\n');
};

const formatWhyChooseVerified = () =>
  WHY_CHOOSE_VERIFIED_ITEMS.map(
    (item) =>
      `• [${item.category}] ${item.title}\n  ${item.description.replace(/\n/g, '\n  ')}`
  ).join('\n\n');

const formatFaq = () => FAQ_LIST.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

const formatCourseTracks = () =>
  COURSE_CATEGORIES.map(
    (cat) =>
      `• ${cat.code} — ${cat.name} (${cat.tagline})\n  Tracks: ${cat.tracks.map((t) => `${t.label} [${t.tag}]`).join('; ')}`
  ).join('\n\n');

const formatWebsiteUiGuide = () => {
  const dayCount = CAMPUSES.filter((c) => c.category === 'Day').length;
  const resCount = CAMPUSES.filter((c) => c.category === 'Residential').length;

  return `
MOBILE VIEW (screens under 768px):
• Fixed bottom navigation bar (always visible): "Call Desk" (phone) | "Apply Now" (orange — opens admission form) | "Why KCJC" (opens /why-choose-kcjc page)
• Campus Guide AI (this chat): opens as full-width bottom sheet; tap the floating blue robot button at bottom-right (above the bottom nav)
• Optional "Need help?" assistance popup may appear — offers AI guide, WhatsApp, or Apply
• Homepage #why-us: 6 advantage cards in a horizontal swipe row; full details via "Discover the KCJC Advantage" button (modal) or /why-choose-kcjc page
• Homepage #facilities preview: shows 3 facility cards only (Smart Classrooms, Physics Lab, Chemistry Lab); tap "View All Facilities" for all ${FACILITIES.length} on /facilities
• Homepage #campuses: compact Day (${dayCount}) and Residential (${resCount}) category cards — tap to open filtered campus list
• Homepage #courses: tap any stream card or programme for detail modals with syllabus, coaching, and features
• Homepage #ncc-nss: tap "Explore NCC at KCJC" for full NCC modal (training, opportunities, benefits)
• Welcome section: "Our Legacy Since 1998" opens legacy history modal
• After AI answers, user may tap "Jump to Section" — chat closes on mobile and scrolls/navigates to the relevant area

DESKTOP VIEW (768px and above):
• Top navbar: Overview (#welcome), Why KCJC (/why-choose-kcjc), Facilities (/facilities), Campuses (/campuses), Top Results (#results), Life at KCJC (/life-at-kcjc), Leadership (#leadership), Gallery (/gallery)
• Courses dropdown in navbar lists MPC, BiPC, MEC, CEC, Long Term programme tracks — each opens programme detail modal
• "Apply Online" button in navbar opens WhatsApp admission form modal
• Campus Guide AI opens as compact panel (bottom-right, ~400px wide)
• Homepage #facilities preview: 5 facility cards in a row
• Homepage #why-us: 6 advantage cards in 3-column grid

HOMEPAGE SECTION ORDER (top to bottom):
  #hero → #welcome → #courses → #why-us → #facilities → #ncc-nss → #campuses → #results → #life-at-kc → Success Stories → #leadership → #gallery → Final Admissions CTA

APPLY / ADMISSION (no #admissions section on homepage — use Apply buttons):
• Mobile: bottom bar "Apply Now" OR floating CTAs
• Desktop: navbar "Apply Online" OR hero / final CTA buttons
• Admission modal collects: student name, parent name, phone, course (MPC/BiPC/MEC/CEC), preferred campus, hostel yes/no, 10th marks bracket
• Submits with auto-generated Application ID (KCJC-2026-XXXXX) and opens WhatsApp to counselor
• Exact fees, scholarships, and seat availability are NOT on the website — always direct to WhatsApp ${COLLEGE_INFO.phonePrimary}

CAMPUS DIRECTORY & FILTERS:
• All campuses: [NAV:page:/campuses]
• Day campuses only (${dayCount}): [NAV:page:/campuses?category=Day]
• Residential campuses only (${resCount}): [NAV:page:/campuses?category=Residential]
• Homepage #campuses category cards navigate to these filtered URLs
• Campuses page supports search by name/city/address/facility, filter by campus type and city
• Individual campus pages: /campuses/c1 … /campuses/c12 (slug = campus id)

CAMPUS CATEGORIES (homepage cards):
${CAMPUSES_SECTION.categories.map((c) => `• ${c.label} (${c.count}): ${c.description}`).join('\n')}

FACILITY CARD CATEGORIES (unique badge per facility):
${FACILITIES.map((f) => `• ${f.title} → ${f.category}`).join('\n')}

COURSE PROGRAMME TRACKS (navbar Courses menu):
${formatCourseTracks()}

INTERACTIVE MODALS ON WEBSITE:
• Course stream detail modals — per MPC/BiPC/MEC/CEC/Long Term track
• KCJC Advantage modal — full why-choose content from homepage #why-us
• NCC Explore modal — why join, training, opportunities, benefits, gallery placeholder
• Campus Visit modal — schedule visit request
• Facility detail modal — tap any facility card for features list
• Legacy modal — college history since 1998`.trim();
};

/** Full system prompt built from the same data sources as the public website */
export const buildAiSystemPrompt = (): string => `
You are "Campus Guide AI", the official virtual assistant for ${COLLEGE_INFO.name} (KCJC), ${COLLEGE_INFO.headquarters}.

ACCURACY RULE (CRITICAL):
- Answer ONLY using the website knowledge below. Do NOT invent campuses, courses, ranks, fees, or facilities not listed here.
- If asked about exact fee amounts, scholarship rules, or seat availability, say these vary by stream/campus and invite the user to WhatsApp ${COLLEGE_INFO.phonePrimary} or email ${COLLEGE_INFO.email}.
- When citing statistics, prefer verified "Why Choose" items and structured records below over marketing headlines.

MULTILINGUAL RESPONSES:
- Detect the user's language and reply in that same language (English, Telugu, Hindi, Tamil, or Kannada).
- Romanized Telugu/Hindi should be answered in proper Telugu/Hindi script when possible.

WEBSITE STRUCTURE & ROUTES:
Homepage (/) sections (use [NAV:section-id] tags):
  hero — top banner, trust stats, admissions & WhatsApp CTAs
  welcome — about college; "Our Legacy Since 1998" modal
  courses — courses & integrated programmes (MPC, BiPC, MEC, CEC, Long Term); tap cards for detail modals
  why-us — Why Choose KCJC preview (mobile: swipe cards; desktop: grid); "Discover KCJC Advantage" opens full modal
  facilities — facilities preview (mobile: 3 cards; desktop: 5 cards); "View All Facilities" → /facilities
  ncc-nss — NCC cadet wing; "Explore NCC at KCJC" opens full NCC modal
  campuses — Day (${CAMPUSES.filter((c) => c.category === 'Day').length}) & Residential (${CAMPUSES.filter((c) => c.category === 'Residential').length}) category cards + campus previews
  results — ranks & achievements
  life-at-kc — student life, clubs, sports, culture preview
  leadership — founders & director profiles
  gallery — photo gallery preview

Dedicated pages (use [NAV:page:/path] tags):
  /why-choose-kcjc — full KCJC Advantage (stats, methodology, FAQs, sticky section nav)
  /facilities — all ${FACILITIES.length} facilities with detail modals
  /campuses — searchable campus directory; filter chips: All, Day, Residential
  /campuses?category=Day — day campuses only
  /campuses?category=Residential — residential campuses only
  /campuses/{id} — individual campus detail (ids: c1–c12)
  /gallery — full photo gallery (Achievements, Campus, Labs, NCC, NSS, Sports, Annual Day)
  /life-at-kcjc — student life page (academics balance, clubs, NCC/NSS, celebrations)

${formatWebsiteUiGuide()}

INSTITUTION CONTACT & IDENTITY:
• Name: ${COLLEGE_INFO.name}
• Tagline: ${COLLEGE_INFO.tagline}
• Secondary tagline: ${COLLEGE_INFO.taglineSecondary}
• Established: ${COLLEGE_INFO.established}
• Headquarters: ${COLLEGE_INFO.headquarters}
• Phone / WhatsApp: ${COLLEGE_INFO.phonePrimary} (WhatsApp: ${COLLEGE_INFO.whatsappNumber})
• Email: ${COLLEGE_INFO.email}
• Website: ${COLLEGE_INFO.website}
• Admission assessment: ${COLLEGE_INFO.admissionExam}
• Social: Facebook, Instagram, YouTube, LinkedIn, Twitter (links on website footer)

HOMEPAGE HIGHLIGHT COUNTERS (as shown on site):
${HIGHLIGHT_COUNTERS.map((h) => `• ${h.label}: ${h.count}${h.suffix}`).join('\n')}

HERO SLIDES (homepage banners):
${HERO_SLIDES.map((s) => `• ${s.badge}: ${s.title} — ${s.subtitle}`).join('\n')}

COURSES & STREAMS:
${formatCourses()}

SPECIALIZED PROGRAM BATCHES (from Courses dropdown / programme modals):
${formatPrograms()}

ALL ${CAMPUSES.length} CAMPUSES IN NELLORE:
Day campuses: ${CAMPUSES.filter((c) => c.category === 'Day').length}
Residential campuses: ${CAMPUSES.filter((c) => c.category === 'Residential').length}

${formatCampuses()}

FACILITIES & INFRASTRUCTURE (${FACILITIES.length} listed):
${formatFacilities()}

ADMISSION PROCESS (${ADMISSION_STEPS.length} steps):
${ADMISSION_STEPS.map((s) => `${s.step}. ${s.title}: ${s.desc}`).join('\n')}

Documents typically required: 10th marks memo/hall ticket, Transfer Certificate (TC), Aadhaar, passport photos, conduct certificate; CBSE/ICSE students may need migration certificate.

LEADERSHIP:
${LEADERSHIP_MEMBERS.map((m) => `• ${m.name} — ${m.title} (${m.qualification})\n  ${m.description}`).join('\n')}

Chairman message excerpt: ${CHAIRMAN_MESSAGE.messageShort}

TOP RANKERS & RESULTS (published on website):
${formatRankers()}

WHY CHOOSE KCJC (published homepage content):
Title: ${WHY_CHOOSE_HOME_TITLE}
Intro: ${WHY_CHOOSE_HOME_INTRO}
Trust statement: ${WHY_CHOOSE_HOME_TRUST_STATEMENT}
Full page note: ${WHY_CHOOSE_PAGE_INTRO}

Homepage feature cards:
${WHY_CHOOSE_HOME_FEATURE_CARDS.map((h) => `• ${h.title}\n  ${h.subtitle}\n  ${h.description}`).join('\n\n')}

Full KCJC Advantage page (/why-choose-kcjc):
Title: ${KCJC_ADVANTAGE_PAGE.title}
Intro: ${KCJC_ADVANTAGE_PAGE.intro}
Key offerings: ${KCJC_ADVANTAGE_PAGE.needsItems.join('; ')}
Advantage pillars: ${KCJC_ADVANTAGE_PAGE.advantageCards.map((c) => c.title).join(', ')}
Methodology: ${KCJC_ADVANTAGE_PAGE.methodologySteps.join(' → ')}
Competitive programmes: ${KCJC_ADVANTAGE_PAGE.competitiveProgrammes.join(', ')}
FAQs: ${KCJC_ADVANTAGE_PAGE.faqs.map((f) => `Q: ${f.question} A: ${f.answer}`).join(' | ')}

Categories on /why-choose-kcjc:
${WHY_CHOOSE_CATEGORIES.map((c) => `• ${c.label}: ${c.description}`).join('\n')}

Verified items:
${formatWhyChooseVerified()}

NCC AT KCJC (homepage + Explore NCC modal):
Title: ${NCC_HOME.title}
Subheading: ${NCC_HOME.subheading}
Summary: ${NCC_HOME.description}
Features: ${NCC_HOME.featureCards.map((c) => `${c.emoji} ${c.label}`).join(', ')}
Explore intro: ${NCC_EXPLORE.intro}
Why join: ${NCC_EXPLORE.whyJoinItems.join(', ')}
Training: ${NCC_EXPLORE.trainingItems.join(', ')}
Cadet opportunities: ${NCC_EXPLORE.opportunitiesItems.join(', ')}
Note: ${NCC_EXPLORE.opportunitiesNote}
Benefits: ${NCC_EXPLORE.benefitsItems.join(' ')}

GALLERY CATEGORIES & HIGHLIGHTS:
${formatGalleryCategories()}

FREQUENTLY ASKED QUESTIONS:
${formatFaq()}

NAVIGATION TAGS — append ONE relevant tag at the end when helpful:
Homepage sections: [NAV:hero] [NAV:welcome] [NAV:courses] [NAV:why-us] [NAV:results] [NAV:campuses] [NAV:facilities] [NAV:ncc-nss] [NAV:leadership] [NAV:life-at-kc] [NAV:gallery]
Dedicated pages: [NAV:page:/why-choose-kcjc] [NAV:page:/facilities] [NAV:page:/campuses] [NAV:page:/campuses?category=Day] [NAV:page:/campuses?category=Residential] [NAV:page:/gallery] [NAV:page:/life-at-kcjc] [NAV:page:/campuses/c1] (use correct campus id c1–c12)
For Apply/admission form: tell user to tap "Apply Now" (mobile bottom bar) or "Apply Online" (desktop navbar). Do NOT use [NAV:admissions] — that section is not on the homepage. Instead explain the apply steps and mention the Apply button.

MOBILE vs DESKTOP GUIDANCE:
When user asks "where is…" or "how do I find…", mention both mobile and desktop paths when they differ (e.g. Apply Now bottom bar vs navbar Apply Online; swipe cards vs grid layout).

TONE & FORMAT:
- Warm, polite, encouraging — like a senior admission counselor.
- Use bullet points for lists; keep answers concise unless user asks for detail.
- Always offer WhatsApp ${COLLEGE_INFO.phonePrimary} for personalized counseling, campus visits, and fee queries.
`.trim();

/** Keyword-based fallback when Gemini API is unavailable */
export const generateFallbackReply = (message: string): string => {
  const msgLower = String(message).toLowerCase();

  if (
    msgLower.includes('why choose') ||
    msgLower.includes('advantage') ||
    msgLower.includes('ఎందుకు') ||
    msgLower.includes('क्यों')
  ) {
    return `Why Choose KCJC — highlights from our website:\n\n${WHY_CHOOSE_HOME_FEATURE_CARDS.map((h) => `• **${h.title}** — ${h.subtitle}\n  ${h.description}`).join('\n\n')}\n\n${WHY_CHOOSE_HOME_TRUST_STATEMENT}\n\nBrowse the full list on the Why Choose page.\n\n[NAV:page:/why-choose-kcjc]`;
  }

  if (
    msgLower.includes('course') ||
    msgLower.includes('mpc') ||
    msgLower.includes('bipc') ||
    msgLower.includes('mec') ||
    msgLower.includes('cec') ||
    msgLower.includes('long term') ||
    msgLower.includes('program') ||
    msgLower.includes('కోర్స') ||
    msgLower.includes('कोर्स')
  ) {
    const streams = COURSES.map(
      (c) => `• **${c.code}**: ${c.subtitle}\n  Coaching: ${c.integratedCoaching.slice(0, 3).join(', ')}`
    ).join('\n');
    return `Krishna Chaitanya offers these streams (2-year Intermediate unless noted):\n\n${streams}\n\nSpecialized batches include MPC Elite/Merit/Star/Spark, BiPC Elite/Spark/Long Term, MEC & CEC integrated programmes.\n\n[NAV:courses]`;
  }

  if (msgLower.includes('fee') || msgLower.includes('cost') || msgLower.includes('price') || msgLower.includes('ఫీ') || msgLower.includes('फीस')) {
    return `Fees depend on stream (${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')}) and campus type (Day vs Residential).\n\nFor exact fee structure and scholarships, please WhatsApp our counselor at ${COLLEGE_INFO.phonePrimary}.\n\nOn mobile tap **Apply Now** in the bottom bar; on desktop use **Apply Online** in the navbar.`;
  }

  if (
    msgLower.includes('campus') ||
    msgLower.includes('hostel') ||
    msgLower.includes('residential') ||
    msgLower.includes('location') ||
    msgLower.includes('nellore') ||
    msgLower.includes('day campus') ||
    msgLower.includes('day scholar') ||
    msgLower.includes('క్యాంప') ||
    msgLower.includes('कैंप')
  ) {
    const dayCount = CAMPUSES.filter((c) => c.category === 'Day').length;
    const resCount = CAMPUSES.filter((c) => c.category === 'Residential').length;
    const dayList = CAMPUSES.filter((c) => c.category === 'Day')
      .map((c) => c.name.replace(/^Krishna Chaitanya Junior College – /, ''))
      .join('\n• ');
    const resList = CAMPUSES.filter((c) => c.category === 'Residential')
      .map((c) => c.name.replace(/^Krishna Chaitanya Junior College – /, ''))
      .join('\n• ');

    if (msgLower.includes('residential') || msgLower.includes('hostel')) {
      return `${resCount} **Residential campuses** with AC hostels:\n\n• ${resList}\n\nBrowse all residential campuses on the website.\n\n[NAV:page:/campuses?category=Residential]`;
    }
    if (msgLower.includes('day')) {
      return `${dayCount} **Day campuses** across Nellore:\n\n• ${dayList}\n\nBrowse all day campuses on the website.\n\n[NAV:page:/campuses?category=Day]`;
    }

    return `${CAMPUSES.length} campuses in Nellore:\n\n📍 **Day (${dayCount})**:\n• ${dayList}\n\n🏠 **Residential (${resCount})**:\n• ${resList}\n\nOn the homepage #campuses section, tap the Day or Residential card to filter. Mobile bottom bar also has quick links.\n\n[NAV:page:/campuses]`;
  }

  if (msgLower.includes('rank') || msgLower.includes('result') || msgLower.includes('iit') || msgLower.includes('neet') || msgLower.includes('air') || msgLower.includes('ర్యాంక') || msgLower.includes('रैंक')) {
    const top = RANKERS.slice(0, 4).map((r) => `🏆 ${r.name}: ${r.exam} ${r.rank} (${r.year})`).join('\n');
    return `Recent ranks published on our website:\n\n${top}\n\nSee the full results section for more achievers.\n\n[NAV:results]`;
  }

  if (
    msgLower.includes('facility') ||
    msgLower.includes('lab') ||
    msgLower.includes('transport') ||
    msgLower.includes('mess') ||
    msgLower.includes('cafeteria') ||
    msgLower.includes('library') ||
    msgLower.includes('classroom') ||
    msgLower.includes('హాస్ట') ||
    msgLower.includes('हॉस्ट')
  ) {
    const list = FACILITIES.map((f) => `• **${f.title}** (${f.category})`).join('\n');
    return `All ${FACILITIES.length} facilities on our website:\n\n${list}\n\nHomepage shows 3 on mobile / 5 on desktop — tap **View All Facilities** for the complete page.\n\n[NAV:page:/facilities]`;
  }

  if (msgLower.includes('ncc') || msgLower.includes('nss') || msgLower.includes('defense') || msgLower.includes('cadet') || msgLower.includes('ఎన్సిసి')) {
    return `**${NCC_HOME.title}**\n\n${NCC_HOME.subheading}\n\n${NCC_EXPLORE.intro}\n\n**Why Join:** ${NCC_EXPLORE.whyJoinItems.slice(0, 4).join(', ')}…\n\n**Training includes:** ${NCC_EXPLORE.trainingItems.slice(0, 4).join(', ')}…\n\n**Cadet opportunities:** ${NCC_EXPLORE.opportunitiesItems.join(', ')}\n\n${NCC_EXPLORE.benefitsItems[NCC_EXPLORE.benefitsItems.length - 1]}\n\nExplore the NCC section on our homepage.\n\n[NAV:ncc-nss]`;
  }

  if (msgLower.includes('gallery') || msgLower.includes('photo') || msgLower.includes('event') || msgLower.includes('sport') || msgLower.includes('fest')) {
    const cats = [...new Set(GALLERY_ITEMS.map((g) => g.category))].join(', ');
    return `Our gallery includes: ${cats}.\n\nBrowse campus photos, achievements, NCC/NSS events, sports, and cultural fests.\n\n[NAV:page:/gallery]`;
  }

  if (msgLower.includes('life') || msgLower.includes('club') || msgLower.includes('culture') || msgLower.includes('student')) {
    return `Student life at KCJC includes integrated academics, NCC/NSS, sports, cultural events, and personality development — explore the Life at KCJC page.\n\n[NAV:page:/life-at-kcjc]`;
  }

  if (msgLower.includes('doc') || msgLower.includes('require') || msgLower.includes('eligib') || msgLower.includes('admission') || msgLower.includes('apply') || msgLower.includes('అడ్మిష') || msgLower.includes('प्रवेश')) {
    const steps = ADMISSION_STEPS.map((s) => `${s.step}. ${s.title}`).join('\n');
    return `Admission process:\n\n${steps}\n\nDocuments: 10th memo, TC, Aadhaar, photos.\n\n**How to apply:**\n• Mobile — tap **Apply Now** in the bottom bar\n• Desktop — click **Apply Online** in the navbar\n\nFill the form → get Application ID → WhatsApp opens with your details.\n\nContact: ${COLLEGE_INFO.phonePrimary} | ${COLLEGE_INFO.email}`;
  }

  if (msgLower.includes('chairman') || msgLower.includes('director') || msgLower.includes('founder') || msgLower.includes('leader') || msgLower.includes('చైర్మ') || msgLower.includes('संस्थापक')) {
    const leaders = LEADERSHIP_MEMBERS.map((m) => `• **${m.name}** — ${m.title}`).join('\n');
    return `Krishna Chaitanya Leadership:\n\n${leaders}\n\n[NAV:leadership]`;
  }

  if (msgLower.includes('contact') || msgLower.includes('whatsapp') || msgLower.includes('phone') || msgLower.includes('email') || msgLower.includes('సంపర్క') || msgLower.includes('संपर्क')) {
    return `Official contact:\n• Phone/WhatsApp: ${COLLEGE_INFO.phonePrimary}\n• Email: ${COLLEGE_INFO.email}\n• Location: ${COLLEGE_INFO.headquarters}\n• Website: ${COLLEGE_INFO.website}\n\nMobile: tap **Call Desk** in bottom bar or **Talk on WhatsApp** in this chat menu.`;
  }

  if (msgLower.includes('kcei') || msgLower.includes('app') || msgLower.includes('parent')) {
    const kcei = WHY_CHOOSE_VERIFIED_ITEMS.find((i) => i.id === 'kcei-app');
    return kcei
      ? `${kcei.title}\n\n${kcei.description}\n\n[NAV:page:/why-choose-kcjc]`
      : `Parents can track attendance, tests, and announcements via the KCEI mobile app. Ask admissions for setup help.\n\nContact: ${COLLEGE_INFO.phonePrimary}`;
  }

  if (
    msgLower.includes('mobile') ||
    msgLower.includes('phone view') ||
    msgLower.includes('bottom bar') ||
    msgLower.includes('menu')
  ) {
    return `**Mobile website guide:**\n\n• Bottom bar: Call Desk | Apply Now | Why KCJC\n• AI Guide: tap blue robot button (bottom-right)\n• Why Choose KCJC: swipe cards horizontally in #why-us\n• Facilities: 3 preview cards — tap View All for full list\n• Campuses: tap Day (${CAMPUSES.filter((c) => c.category === 'Day').length}) or Residential (${CAMPUSES.filter((c) => c.category === 'Residential').length}) cards\n• Courses: tap any stream for detail modal\n\n[NAV:hero]`;
  }

  if (msgLower.includes('desktop') || msgLower.includes('laptop') || msgLower.includes('computer')) {
    return `**Desktop website guide:**\n\n• Top navbar: Overview, Why KCJC, Facilities, Campuses, Results, Life at KCJC, Leadership, Gallery\n• Courses dropdown: all MPC/BiPC/MEC/CEC/Long Term tracks\n• Apply Online button opens admission form\n• AI Guide: panel at bottom-right\n• Facilities preview: 5 cards in a row on homepage\n\n[NAV:hero]`;
  }

  if (msgLower.includes('legacy') || msgLower.includes('1998') || msgLower.includes('history') || msgLower.includes('about')) {
    return `Krishna Chaitanya has ${COLLEGE_INFO.established} legacy in Nellore.\n\nOn the homepage #welcome section, tap **Our Legacy Since 1998** for the full history modal.\n\nChairman message: ${CHAIRMAN_MESSAGE.messageShort.slice(0, 200)}…\n\n[NAV:welcome]`;
  }

  return `Welcome to ${COLLEGE_INFO.name}, Nellore!\n\nWe offer Intermediate streams (${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')}) with integrated IIT-JEE, NEET, CA/CMA coaching across ${CAMPUSES.length} campuses (${CAMPUSES.filter((c) => c.category === 'Day').length} Day + ${CAMPUSES.filter((c) => c.category === 'Residential').length} Residential).\n\nAsk about courses, campuses, facilities, admissions, ranks, NCC, mobile/desktop navigation, or student life — or WhatsApp ${COLLEGE_INFO.phonePrimary}.\n\nUse the 📋 Menu below for quick topics.\n\n[NAV:welcome]`;
};
