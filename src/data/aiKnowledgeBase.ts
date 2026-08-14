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
} from './collegeData';
import { PROGRAM_DETAILS, COURSE_CATEGORIES } from './courseDetailsData';
import { CAMPUSES_SECTION } from './campusesSectionData';
import { NCC_EXPLORE, NCC_HOME } from './nccData';
import { KCJC_ADVANTAGE_PAGE } from './whyChooseAdvantageData';
import {
  WHY_CHOOSE_CATEGORIES,
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
• Homepage #facilities preview: shows 3 facility cards only (Smart Classrooms, Physics Lab, Chemistry Lab); tap "View All Facilities" for all ${FACILITIES.length} on /facilities
• Homepage #campuses: compact Day (${dayCount}) and Residential (${resCount}) category cards — tap to open filtered campus list
• Homepage #courses: tap any stream card or programme for detail modals with syllabus, coaching, and features
• Homepage #ncc: tap "Explore NCC at KCJC" for full NCC modal (training, opportunities, benefits)
• Why Choose / Overview (#why-choose): "Our Legacy Since 1998" opens legacy history modal
• After AI answers, user may tap "Jump to Section" — chat closes on mobile and scrolls/navigates to the relevant area

DESKTOP VIEW (768px and above):
• Top navbar: Overview (#why-choose), Why KCJC (/why-choose-kcjc), Facilities (/facilities), Campuses (/campuses), Life at KCJC (/life-at-kcjc), Leadership (#leadership), Gallery (/gallery)
• Courses dropdown in navbar lists MPC, BiPC, MEC, CEC, Long Term programme tracks — each opens programme detail modal
• "Apply Online" button in navbar opens WhatsApp admission form modal
• Campus Guide AI opens as compact panel (bottom-right, ~400px wide)
• Homepage #facilities preview: 5 facility cards in a row

HOMEPAGE SECTION ORDER (top to bottom):
  #hero → #courses → #why-choose → #campuses → #facilities → #ncc → #stories → #explore-kcjc → #leadership → Final Admissions CTA

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
- The website currently publishes ${CAMPUSES.length} campuses (${CAMPUSES.filter((c) => c.category === 'Day').length} Day + ${CAMPUSES.filter((c) => c.category === 'Residential').length} Residential). Always use this campus list. Do not say there are 17 campuses.
- If the user asks to list campuses, all campuses, both Day and Residential, or Nellore campuses, list EVERY campus in both groups.
- Return Residential-only or Day-only lists only when the user clearly asks for that one type alone.
- Do not invent ranks, fees, extra campuses, or facilities. Individual AIR ranker profiles are not published as a live results section — for latest ranks, send the user to WhatsApp ${COLLEGE_INFO.phonePrimary}.
- Hostels & facilities questions should describe FACILITIES records, not a residential-campus-only list.

MULTILINGUAL RESPONSES:
- Detect the user's language and reply in that same language (English, Telugu, Hindi, Tamil, or Kannada).
- Romanized Telugu/Hindi should be answered in proper Telugu/Hindi script when possible.

WEBSITE STRUCTURE & ROUTES:
Homepage (/) sections (use [NAV:section-id] tags):
  hero — top banner, trust stats, admissions & WhatsApp CTAs
  courses — courses & integrated programmes (MPC, BiPC, MEC, CEC, Long Term); tap cards for detail modals
  why-choose — about college; "Our Legacy Since 1998" modal
  campuses — Day (${CAMPUSES.filter((c) => c.category === 'Day').length}) & Residential (${CAMPUSES.filter((c) => c.category === 'Residential').length}) category cards + explore all campuses
  facilities — facilities preview (compact cards); "Explore All Facilities" → /facilities
  ncc — NCC cadet wing; "Explore NCC at KCJC" opens full NCC modal
  stories — parent & alumni success stories (Parents / Students tabs)
  explore-kcjc — student life preview; "Explore Life at KCJC" → /life-at-kcjc
  leadership — founders & director profiles

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

HOMEPAGE HIGHLIGHT COUNTERS (marketing stats on the hero — do not override the ${CAMPUSES.length} campus records below):
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

WHY CHOOSE KCJC (/why-choose-kcjc page):
Full page note: ${WHY_CHOOSE_PAGE_INTRO}
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
Homepage sections: [NAV:hero] [NAV:courses] [NAV:why-choose] [NAV:campuses] [NAV:facilities] [NAV:ncc] [NAV:stories] [NAV:explore-kcjc] [NAV:leadership]
Dedicated pages: [NAV:page:/why-choose-kcjc] [NAV:page:/overview] [NAV:page:/facilities] [NAV:page:/campuses] [NAV:page:/campuses?category=Day] [NAV:page:/campuses?category=Residential] [NAV:page:/gallery] [NAV:page:/life-at-kcjc] [NAV:page:/courses] [NAV:page:/campuses/c1] (use correct campus id c1–c12)
For Apply/admission form: tell user to tap "Apply Now" (mobile bottom bar) or "Apply Online" (desktop navbar). Do NOT use [NAV:admissions] — that section is not on the homepage. Instead explain the apply steps and mention the Apply button.

MOBILE vs DESKTOP GUIDANCE:
When user asks "where is…" or "how do I find…", mention both mobile and desktop paths when they differ (e.g. Apply Now bottom bar vs navbar Apply Online; swipe cards vs grid layout).

TONE & FORMAT:
- Warm, polite, encouraging — like a senior admission counselor.
- Use bullet points for lists; keep answers concise unless user asks for detail.
- Always offer WhatsApp ${COLLEGE_INFO.phonePrimary} for personalized counseling, campus visits, and fee queries.
`.trim();

const dayCampuses = () => CAMPUSES.filter((c) => c.category === 'Day');
const residentialCampuses = () => CAMPUSES.filter((c) => c.category === 'Residential');

const campusDisplayName = (campus: (typeof CAMPUSES)[number]) =>
  campus.name.replace(/^Krishna Chaitanya Junior College – /, '');

const formatCampusNames = (campuses: typeof CAMPUSES) =>
  campuses.map((c) => `${campusDisplayName(c)} — ${c.category}, ${c.type}`).join('\n• ');

const formatAllCampusesReply = () => {
  const day = dayCampuses();
  const res = residentialCampuses();
  return `KCJC currently lists **${CAMPUSES.length} campuses** on this website — **${day.length} Day** and **${res.length} Residential**:\n\n📍 **Day (${day.length})**:\n• ${formatCampusNames(day)}\n\n🏠 **Residential (${res.length})**:\n• ${formatCampusNames(res)}\n\nOpen the campuses page to browse, search, or filter.\n\n[NAV:page:/campuses]`;
};

const formatCampusDetailReply = (matches: typeof CAMPUSES) => {
  const details = matches
    .map((c) => {
      return `• **${campusDisplayName(c)}**\n  Type: ${c.type} | ${c.category}\n  Address: ${c.address}\n  Suitable for: ${c.suitableFor}\n  Courses: ${c.coursesOffered.join(', ')}\n  Facilities: ${c.facilities.join(', ')}\n  Phone: ${c.phone}\n  Map: available on the campus page`;
    })
    .join('\n\n');
  const nav = matches.length === 1 ? `[NAV:page:/campuses/${slugify(matches[0].id)}]` : '[NAV:page:/campuses]';
  return `${details}\n\n${nav}`;
};

const formatCoursesReply = (courses = COURSES) => {
  const streams = courses
    .map(
      (c) =>
        `• **${c.code}** — ${c.title}\n  ${c.subtitle}\n  Duration: ${c.duration}\n  Eligibility: ${c.eligibility}\n  Coaching: ${c.integratedCoaching.join(', ')}`
    )
    .join('\n\n');
  return `Programmes published on this website:\n\n${streams}\n\n[NAV:page:/courses]`;
};

const findCampusesByQuery = (q: string) => {
  const aliases: Array<{ keys: string[]; ids: string[] }> = [
    { keys: ['prabhanjana'], ids: ['c1'] },
    { keys: ['vasista'], ids: ['c2'] },
    { keys: ['sarvagna', 'stonehouse'], ids: ['c3'] },
    { keys: ['durgahmitta', 'dargamitta', 'dargahmitta'], ids: ['c4', 'c5', 'c12'] },
    { keys: ['einstein'], ids: ['c6', 'c7', 'c9'] },
    { keys: ['buchi', 'buchireddy'], ids: ['c8'] },
    { keys: ['chandrahasa', 'chandra hasa'], ids: ['c10'] },
    { keys: ['gomathy', 'gomati'], ids: ['c11'] },
  ];
  const ids = new Set<string>();
  aliases.forEach((alias) => {
    if (alias.keys.some((key) => q.includes(key))) {
      alias.ids.forEach((id) => ids.add(id));
    }
  });
  if (ids.size === 0) return [];
  return CAMPUSES.filter((campus) => ids.has(campus.id));
};

const findCoursesByQuery = (q: string) =>
  COURSES.filter((course) => {
    const code = course.code.toLowerCase();
    if (code === 'long term') return /long\s*term/.test(q);
    return new RegExp(`\\b${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(q);
  });

export type CollegeGuideResolution = {
  reply: string;
  confident: boolean;
};

/** Answers from published website records only. Use this before Gemini. */
export const resolveCollegeGuideReply = (message: string): CollegeGuideResolution => {
  const q = String(message).toLowerCase();
  const namedCampuses = findCampusesByQuery(q);
  const namedCourses = findCoursesByQuery(q);

  const mentionsFacilities =
    q.includes('facilit') ||
    q.includes('lab') ||
    q.includes('transport') ||
    q.includes('mess') ||
    q.includes('cafeteria') ||
    q.includes('library') ||
    q.includes('classroom') ||
    q.includes('dining') ||
    q.includes('ac room');
  const mentionsHostelWord = q.includes('hostel') || q.includes('హాస్ట') || q.includes('हॉस्ट');
  const mentionsCampusWord =
    q.includes('campus') ||
    q.includes('campuses') ||
    q.includes('location') ||
    q.includes('క్యాంప') ||
    q.includes('कैंप');
  const mentionsDay = /\bday\b/.test(q) || q.includes('day scholar');
  const mentionsResidential = q.includes('residential') || mentionsHostelWord;
  const wantsFullCampusList =
    mentionsCampusWord &&
    (q.includes('all') ||
      q.includes('every') ||
      q.includes('list') ||
      q.includes(`${CAMPUSES.length}`) ||
      q.includes('nellore campus') ||
      (mentionsDay && mentionsResidential));

  if (namedCampuses.length > 0 && !mentionsFacilities) {
    return { confident: true, reply: formatCampusDetailReply(namedCampuses) };
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('ఫీ') || q.includes('फीस')) {
    return {
      confident: true,
      reply: `Exact fees are not published as a single amount on this website. Fees vary by stream (${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')}) and Day vs Residential campus.\n\nWhatsApp ${COLLEGE_INFO.phonePrimary} or email ${COLLEGE_INFO.email} for the current fee structure and scholarships.\n\n[NAV:page:/courses]`,
    };
  }

  if (
    q.includes('admission') ||
    q.includes('apply') ||
    q.includes('document') ||
    q.includes('eligib') ||
    q.includes('అడ్మిష') ||
    q.includes('प्रवेश')
  ) {
    const steps = ADMISSION_STEPS.map((s) => `${s.step}. ${s.title}`).join('\n');
    return {
      confident: true,
      reply: `Admission process on this website:\n\n${steps}\n\nDocuments usually needed: 10th memo, TC, Aadhaar, photos.\n\n**How to apply:**\n• Mobile — tap **Apply Now** in the bottom bar\n• Desktop — click **Apply Online** in the navbar\n\nContact: ${COLLEGE_INFO.phonePrimary} | ${COLLEGE_INFO.email}`,
    };
  }

  if (q.includes('ncc') || q.includes('cadet') || q.includes('defense') || q.includes('defence') || q.includes('ఎన్సిసి')) {
    return {
      confident: true,
      reply: `**${NCC_HOME.title}**\n\n${NCC_HOME.subheading}\n\n${NCC_EXPLORE.intro}\n\n**Why join:** ${NCC_EXPLORE.whyJoinItems.join(', ')}\n\n**Training includes:** ${NCC_EXPLORE.trainingItems.join(', ')}\n\n**Cadet opportunities:** ${NCC_EXPLORE.opportunitiesItems.join(', ')}\n\n${NCC_EXPLORE.opportunitiesNote}\n\n[NAV:ncc]`,
    };
  }

  if (mentionsFacilities || (mentionsHostelWord && (q.includes('facilit') || q.includes('lab') || q.includes('mess') || q.includes('transport')))) {
    const list = FACILITIES.map((f) => `• **${f.title}** (${f.category})\n  ${f.description}`).join('\n');
    return {
      confident: true,
      reply: `Facilities published on this website (${FACILITIES.length}):\n\n${list}\n\nResidential campuses also offer hostel life with supervised study. For hostel campus names, ask for Residential campuses.\n\n[NAV:page:/facilities]`,
    };
  }

  if (namedCourses.length > 0 && namedCourses.length < COURSES.length) {
    return { confident: true, reply: formatCoursesReply(namedCourses) };
  }

  if (
    q.includes('course') ||
    q.includes('stream') ||
    q.includes('program') ||
    q.includes('కోర్స') ||
    q.includes('कोर्स') ||
    namedCourses.length === COURSES.length
  ) {
    return { confident: true, reply: formatCoursesReply() };
  }

  if (wantsFullCampusList || (mentionsCampusWord && !mentionsDay && !mentionsResidential)) {
    return { confident: true, reply: formatAllCampusesReply() };
  }

  if (mentionsCampusWord && mentionsResidential && !mentionsDay) {
    const res = residentialCampuses();
    return {
      confident: true,
      reply: `${res.length} **Residential campuses** listed on this website:\n\n• ${formatCampusNames(res)}\n\n[NAV:page:/campuses?category=Residential]`,
    };
  }

  if (mentionsCampusWord && mentionsDay && !mentionsResidential) {
    const day = dayCampuses();
    return {
      confident: true,
      reply: `${day.length} **Day campuses** listed on this website:\n\n• ${formatCampusNames(day)}\n\n[NAV:page:/campuses?category=Day]`,
    };
  }

  if (q.includes('why choose') || q.includes('advantage') || q.includes('ఎందుకు') || q.includes('क्यों')) {
    return {
      confident: true,
      reply: `Why Choose KCJC — from the college advantage page:\n\n**${KCJC_ADVANTAGE_PAGE.title}**\n${KCJC_ADVANTAGE_PAGE.intro}\n\nKey pillars: ${KCJC_ADVANTAGE_PAGE.advantageCards.map((c) => c.title).join(', ')}\n\n[NAV:page:/why-choose-kcjc]`,
    };
  }

  if (q.includes('chairman') || q.includes('director') || q.includes('founder') || q.includes('leader') || q.includes('చైర్మ') || q.includes('संस्थापक')) {
    const leaders = LEADERSHIP_MEMBERS.map((m) => `• **${m.name}** — ${m.title}`).join('\n');
    return { confident: true, reply: `KCJC leadership on this website:\n\n${leaders}\n\n[NAV:leadership]` };
  }

  if (q.includes('gallery') || q.includes('photo')) {
    const cats = [...new Set(GALLERY_ITEMS.map((g) => g.category))].join(', ');
    return {
      confident: true,
      reply: `Gallery categories on this website: ${cats}.\n\n[NAV:page:/gallery]`,
    };
  }

  if (q.includes('life at') || q.includes('student life') || q.includes('clubs') || q.includes('cultural')) {
    return {
      confident: true,
      reply: `Student life at KCJC includes academics with clubs, cultural events, sports, NCC, NSS, workshops, and campus celebrations.\n\nOpen the Life at KCJC page for the full list.\n\n[NAV:page:/life-at-kcjc]`,
    };
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('whatsapp number') || q.includes('సంపర్క') || q.includes('संपर्क')) {
    return {
      confident: true,
      reply: `Official contact:\n• Phone/WhatsApp: ${COLLEGE_INFO.phonePrimary}\n• Email: ${COLLEGE_INFO.email}\n• Location: ${COLLEGE_INFO.headquarters}\n\nMobile: tap **Call Desk** in the bottom bar.`,
    };
  }

  if (q.includes('kcei') || q.includes('parent app')) {
    const kcei = WHY_CHOOSE_VERIFIED_ITEMS.find((i) => i.id === 'kcei-app');
    return {
      confident: true,
      reply: kcei
        ? `${kcei.title}\n\n${kcei.description}\n\n[NAV:page:/why-choose-kcjc]`
        : `Ask admissions at ${COLLEGE_INFO.phonePrimary} about the parent app.\n\n[NAV:page:/why-choose-kcjc]`,
    };
  }

  if (q.includes('rank') || q.includes('result') || /\bair\b/.test(q) || q.includes('ర్యాంక') || q.includes('रैंक')) {
    return {
      confident: true,
      reply: `Latest JEE, NEET, EAPCET, and Board result details are shared by the admission team. Individual ranker profiles are not listed as a live results section on this website.\n\nWhatsApp ${COLLEGE_INFO.phonePrimary} for current achiever information.\n\nThe homepage hero includes Intermediate Results 2026 banners.`,
    };
  }

  if (q.includes('legacy') || q.includes('1998') || q.includes('history') || q.includes('about college') || q.includes('overview')) {
    return {
      confident: true,
      reply: `${COLLEGE_INFO.name} was established in ${COLLEGE_INFO.established} in Nellore.\n\n${COLLEGE_INFO.taglineSecondary}\n\nThis website lists ${CAMPUSES.length} campuses (${dayCampuses().length} Day + ${residentialCampuses().length} Residential) and programmes in ${COURSES.map((c) => c.code).join(', ')}.\n\nChairman: ${CHAIRMAN_MESSAGE.messageShort.slice(0, 220)}…\n\n[NAV:why-choose]`,
    };
  }

  if (q.includes('bottom bar') || q.includes('mobile view') || q.includes('phone view')) {
    return {
      confident: true,
      reply: `**Mobile website guide:**\n\n• Bottom bar: Call Desk | Apply Now | Why KCJC\n• AI Guide: blue robot button at bottom-right\n• Campuses: Day (${dayCampuses().length}) and Residential (${residentialCampuses().length}) cards\n• Courses: tap a stream for details\n\n[NAV:hero]`,
    };
  }

  if (q.includes('desktop') || q.includes('laptop')) {
    return {
      confident: true,
      reply: `**Desktop website guide:**\n\n• Navbar: Overview, Why KCJC, Facilities, Campuses, Life at KCJC, Leadership, Gallery\n• Courses dropdown: MPC, BiPC, MEC, CEC, Long Term\n• Apply Online opens the admission form\n\n[NAV:hero]`,
    };
  }

  return {
    confident: false,
    reply: `${COLLEGE_INFO.name}, Nellore, offers ${COURSES.filter((c) => c.code !== 'Long Term').map((c) => c.code).join(', ')} and Long Term programmes across **${CAMPUSES.length} campuses** (${dayCampuses().length} Day + ${residentialCampuses().length} Residential).\n\nAsk about a course, a campus name, facilities, NCC, admissions, or WhatsApp ${COLLEGE_INFO.phonePrimary}.\n\nUse the 📋 Menu for quick topics.\n\n[NAV:why-choose]`,
  };
};

export const generateFallbackReply = (message: string): string => resolveCollegeGuideReply(message).reply;
