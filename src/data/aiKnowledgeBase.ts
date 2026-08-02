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
import { PROGRAM_DETAILS } from './courseDetailsData';
import {
  WHY_CHOOSE_CATEGORIES,
  WHY_CHOOSE_HOME_HIGHLIGHTS,
  WHY_CHOOSE_HOME_INTRO,
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
  hero — top banner & admissions CTA
  welcome — about college & chairman message
  courses — courses & integrated programmes (MPC, BiPC, MEC, CEC, Long Term)
  why-us — Why Choose KCJC preview
  facilities — facilities preview on homepage
  admissions — admission process & apply
  ncc-nss — NCC cadet wing & NSS
  campuses — campus directory preview
  results — ranks & achievements
  life-at-kc — student life, clubs, sports, culture
  leadership — founders & director profiles
  gallery — photo gallery preview

Dedicated pages (use [NAV:page:/path] tags):
  /why-choose-kcjc — full verified advantages (academics, campuses, facilities, student life)
  /facilities — full facilities & infrastructure page
  /campuses — searchable campus directory with Day & Residential filters
  /campuses/{slug} — individual campus detail (e.g. /campuses/c1 for Prabhanjana)
  /gallery — full photo gallery (Achievements, Campus, Labs, NCC, NSS, Sports, Annual Day)
  /life-at-kcjc — student life page (academics balance, clubs, NCC/NSS, celebrations)

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

WHY CHOOSE KCJC (verified content only):
Intro: ${WHY_CHOOSE_HOME_INTRO}
Full page note: ${WHY_CHOOSE_PAGE_INTRO}

Homepage highlights:
${WHY_CHOOSE_HOME_HIGHLIGHTS.map((h) => `• ${h.title}: ${h.description}`).join('\n')}

Categories on /why-choose-kcjc:
${WHY_CHOOSE_CATEGORIES.map((c) => `• ${c.label}: ${c.description}`).join('\n')}

Verified items:
${formatWhyChooseVerified()}

GALLERY CATEGORIES & HIGHLIGHTS:
${formatGalleryCategories()}

FREQUENTLY ASKED QUESTIONS:
${formatFaq()}

NAVIGATION TAGS — append ONE relevant tag at the end when helpful:
Homepage sections: [NAV:welcome] [NAV:courses] [NAV:admissions] [NAV:results] [NAV:campuses] [NAV:facilities] [NAV:ncc-nss] [NAV:leadership] [NAV:life-at-kc] [NAV:why-us] [NAV:gallery]
Dedicated pages: [NAV:page:/why-choose-kcjc] [NAV:page:/facilities] [NAV:page:/campuses] [NAV:page:/gallery] [NAV:page:/life-at-kcjc] [NAV:page:/campuses/c1] (use correct campus slug)
For Apply/admission form: tell user to click "Apply Online" — use [NAV:admissions]

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
    return `Why Choose KCJC — verified highlights from our website:\n\n${WHY_CHOOSE_HOME_HIGHLIGHTS.map((h) => `• **${h.title}**: ${h.description}`).join('\n')}\n\nBrowse the full verified list on the Why Choose page.\n\n[NAV:page:/why-choose-kcjc]`;
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
    return `Fees depend on stream (${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')}) and campus type (Day vs Residential).\n\nFor exact fee structure and scholarships, please WhatsApp our counselor at ${COLLEGE_INFO.phonePrimary}.\n\n[NAV:admissions]`;
  }

  if (
    msgLower.includes('campus') ||
    msgLower.includes('hostel') ||
    msgLower.includes('residential') ||
    msgLower.includes('location') ||
    msgLower.includes('nellore') ||
    msgLower.includes('క్యాంప') ||
    msgLower.includes('कैंप')
  ) {
    const dayList = CAMPUSES.filter((c) => c.category === 'Day').map((c) => c.name.replace(/^Krishna Chaitanya Junior College – /, '')).join('\n• ');
    const resList = CAMPUSES.filter((c) => c.category === 'Residential').map((c) => c.name.replace(/^Krishna Chaitanya Junior College – /, '')).join('\n• ');
    return `${CAMPUSES.length} campuses in Nellore:\n\n📍 **Day (${CAMPUSES.filter((c) => c.category === 'Day').length})**:\n• ${dayList}\n\n🏠 **Residential (${CAMPUSES.filter((c) => c.category === 'Residential').length})**:\n• ${resList}\n\n[NAV:page:/campuses]`;
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
    msgLower.includes('హాస్ట') ||
    msgLower.includes('हॉस्ट')
  ) {
    const list = FACILITIES.slice(0, 6).map((f) => `• ${f.title}`).join('\n');
    return `Facilities listed on our website:\n\n${list}\n• …and ${FACILITIES.length - 6} more on the Facilities page.\n\n[NAV:page:/facilities]`;
  }

  if (msgLower.includes('ncc') || msgLower.includes('nss') || msgLower.includes('defense') || msgLower.includes('cadet') || msgLower.includes('ఎన్సిసి')) {
    const nccSlide = HERO_SLIDES.find((s) => s.title.includes('NCC'));
    return `${nccSlide?.title || 'Accredited 3 AP BN NCC Battalion Cadet Wing'}\n\n${nccSlide?.subtitle || 'Leadership, discipline, and defense career pathways alongside academics.'}\n\nNSS community service activities are also featured on the website.\n\n[NAV:ncc-nss]`;
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
    return `Admission process:\n\n${steps}\n\nDocuments: 10th memo, TC, Aadhaar, photos. Contact: ${COLLEGE_INFO.phonePrimary} | ${COLLEGE_INFO.email}\n\n[NAV:admissions]`;
  }

  if (msgLower.includes('chairman') || msgLower.includes('director') || msgLower.includes('founder') || msgLower.includes('leader') || msgLower.includes('చైర్మ') || msgLower.includes('संस्थापक')) {
    const leaders = LEADERSHIP_MEMBERS.map((m) => `• **${m.name}** — ${m.title}`).join('\n');
    return `Krishna Chaitanya Leadership:\n\n${leaders}\n\n[NAV:leadership]`;
  }

  if (msgLower.includes('contact') || msgLower.includes('whatsapp') || msgLower.includes('phone') || msgLower.includes('email') || msgLower.includes('సంపర్క') || msgLower.includes('संपर्क')) {
    return `Official contact:\n• Phone/WhatsApp: ${COLLEGE_INFO.phonePrimary}\n• Email: ${COLLEGE_INFO.email}\n• Location: ${COLLEGE_INFO.headquarters}\n• Website: ${COLLEGE_INFO.website}\n\n[NAV:admissions]`;
  }

  if (msgLower.includes('kcei') || msgLower.includes('app') || msgLower.includes('parent')) {
    const kcei = WHY_CHOOSE_VERIFIED_ITEMS.find((i) => i.id === 'kcei-app');
    return kcei
      ? `${kcei.title}\n\n${kcei.description}\n\n[NAV:page:/why-choose-kcjc]`
      : `Parents can track attendance, tests, and announcements via the KCEI mobile app. Ask admissions for setup help.\n\n[NAV:admissions]`;
  }

  return `Welcome to ${COLLEGE_INFO.name}, Nellore!\n\nWe offer Intermediate streams (${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')}) with integrated IIT-JEE, NEET, CA/CMA coaching across ${CAMPUSES.length} campuses.\n\nAsk about courses, campuses, facilities, admissions, ranks, NCC, or student life — or WhatsApp ${COLLEGE_INFO.phonePrimary}.\n\n[NAV:welcome]`;
};
