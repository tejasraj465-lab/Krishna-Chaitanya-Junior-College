import{r as S,j as n,A as Z,m as q}from"./motion-v051CQOq.js";import{e as y,d as u,a as d,F as j,W as ee,H as te,f as se,L as ie,g as ne,G as P,n as ae,h as re,u as oe,j as F}from"./index-BW4VZFme.js";import"./campusesSectionData-cKK5JA6I.js";import{N as B,a as N}from"./nccData-Dco8DHDm.js";import{K as D}from"./whyChooseAdvantageData-BoLb_BnN.js";import{o as G,s as le}from"./security-CalIPvWD.js";import{X as ce,v as de,a as ue,f as pe}from"./icons-C7F5O-6C.js";import"./swiper-CTFhE5Gg.js";const p=t=>typeof t=="string"&&t.trim().length>0,R=()=>y.length>0&&y.every(t=>p(t.code)&&p(t.title)&&p(t.duration)&&Array.isArray(t.integratedCoaching)&&t.integratedCoaching.length>0&&t.integratedCoaching.every(p)),T=()=>u.length>0&&u.every(t=>p(t.name)&&p(t.address)&&(t.category==="Day"||t.category==="Residential")),M=()=>p(d.phonePrimary)&&p(d.email)&&p(d.headquarters),K=()=>te.find(t=>t.badge?.includes("NCC")||t.title.includes("NCC")),me=()=>ee.find(t=>t.id===11),he=()=>{const t=[];if(R()){const a=y.filter(i=>i.code!=="Long Term").map(i=>i.code),r=y.some(i=>i.code==="Long Term");t.push({id:"integrated-programmes",title:"Integrated Intermediate Programmes",description:`Offers Intermediate streams including ${a.join(", ")}${r?", and Long Term coaching":""}, as listed under Courses on this website.`,icon:"Layers",badge:"Programmes",source:"COURSES"})}if(T()){const a=u.filter(i=>i.category==="Day").length,r=u.filter(i=>i.category==="Residential").length;t.push({id:"nellore-campuses",title:"Campuses in Nellore",description:`${u.length} campuses are listed on this website (${a} day, ${r} residential), including separate boys and girls campuses.`,icon:"Building2",badge:"Campuses",source:"CAMPUSES"})}const e=K();return e&&p(e.title)&&t.push({id:"ncc-wing",title:e.title,description:p(e.subtitle)?e.subtitle:"Listed on this website as part of student development activities.",icon:"ShieldCheck",badge:"NCC",source:"HERO_SLIDES"}),M()&&t.push({id:"admissions-support",title:"Admissions Enquiries",description:`Contact ${d.phonePrimary} or ${d.email}. Headquarters: ${d.headquarters}.`,icon:"Phone",badge:"Admissions",source:"COLLEGE_INFO"}),t},ge=()=>{const t=[];R()&&(t.push({id:"streams-offered",category:"academics",title:"Intermediate Streams Offered",description:y.map(i=>`${i.code}: ${i.title} (${i.duration})`).join(`
`),icon:"Layers",badge:"Streams",source:"COURSES"}),t.push({id:"integrated-coaching",category:"academics",title:"Integrated Coaching by Stream",description:y.map(i=>`${i.code} — ${i.integratedCoaching.join(", ")}`).join(`
`),icon:"Target",badge:"Coaching",source:"COURSES.integratedCoaching"}));const e=me();if(e&&p(e.title)&&p(e.description)&&t.push({id:"kcei-app",category:"campuses",title:e.title,description:e.description,icon:"Smartphone",badge:e.badge??"App",source:"WHY_CHOOSE_US.id11"}),T()){u.forEach(l=>{t.push({id:`campus-${l.id}`,category:"campuses",title:l.name,description:[`Address: ${l.address}`,`Type: ${l.type}`,`Category: ${l.category}`,p(l.phone)?`Phone: ${l.phone}`:null,p(l.email)?`Email: ${l.email}`:null].filter(Boolean).join(`
`),icon:"MapPin",badge:l.category,source:`CAMPUSES.${l.id}`})});const i=u.filter(l=>l.category==="Day").length,f=u.filter(l=>l.category==="Residential").length;t.push({id:"campus-types",category:"campuses",title:"Day & Residential Campuses",description:`Day campuses listed: ${i}. Residential campuses listed: ${f}.`,icon:"Building2",badge:"Summary",source:"CAMPUSES.category"})}M()&&t.push({id:"official-contact",category:"campuses",title:"Official Contact Details",description:`Phone: ${d.phonePrimary}
Email: ${d.email}
Location: ${d.headquarters}`,icon:"Phone",badge:"Contact",source:"COLLEGE_INFO"}),j.length>0&&j.every(i=>p(i.title))&&t.push({id:"listed-facilities",category:"facilities",title:"Facilities Listed on Website",description:j.map(i=>i.title).join(`
`),icon:"FlaskConical",badge:"Facilities",source:"FACILITIES"});const a=[...new Set(u.flatMap(i=>i.facilities).filter(p))];a.length>0&&t.push({id:"campus-facility-tags",category:"facilities",title:"Campus-Level Facility Mentions",description:a.join(`
`),icon:"Bus",badge:"Campus Facilities",source:"CAMPUSES.facilities"});const r=K();return r&&p(r.title)&&t.push({id:"ncc-battalion",category:"student-life",title:r.title,description:[r.subtitle,"NSS activities are also referenced elsewhere on this website."].filter(p).join(`
`),icon:"ShieldCheck",badge:"NCC",source:"HERO_SLIDES"}),t};he();const fe=ge();R(),T(),M();const ye=t=>t.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),Ce=()=>[...new Set(P.map(e=>e.category))].map(e=>{const a=P.filter(r=>r.category===e);return`• ${e}: ${a.map(r=>r.title).join("; ")}`}).join(`
`),A=()=>u.filter(t=>t.category==="Day"),v=()=>u.filter(t=>t.category==="Residential"),V=t=>t.name.replace(/^Krishna Chaitanya Junior College – /,""),I=t=>t.map(e=>`${V(e)} — ${e.category}, ${e.type}`).join(`
• `),be=()=>{const t=A(),e=v();return`KCJC currently lists **${u.length} campuses** on this website — **${t.length} Day** and **${e.length} Residential**:

📍 **Day (${t.length})**:
• ${I(t)}

🏠 **Residential (${e.length})**:
• ${I(e)}

Open the campuses page to browse, search, or filter.

[NAV:page:/campuses]`},we=t=>{const e=t.map(r=>`• **${V(r)}**
  Type: ${r.type} | ${r.category}
  Address: ${r.address}
  Suitable for: ${r.suitableFor}
  Courses: ${r.coursesOffered.join(", ")}
  Facilities: ${r.facilities.join(", ")}
  Phone: ${r.phone}
  Overview: /campuses/${r.id}
  Directions: Get Directions on the campus card or campus overview page (not in the footer)`).join(`

`),a=t.length===1?`[NAV:page:/campuses/${ye(t[0].id)}]`:"[NAV:page:/campuses]";return`${e}

${a}`},_=(t=y)=>`Programmes published on this website:

${t.map(a=>`• **${a.code}** — ${a.title}
  ${a.subtitle}
  Duration: ${a.duration}
  Eligibility: ${a.eligibility}
  Coaching: ${a.integratedCoaching.join(", ")}`).join(`

`)}

[NAV:page:/courses]`,xe=t=>{const e=[{keys:["prabhanjana"],ids:["c1"]},{keys:["vasista"],ids:["c2"]},{keys:["sarvagna","stonehouse"],ids:["c3"]},{keys:["durgahmitta","dargamitta","dargahmitta"],ids:["c4","c5","c12"]},{keys:["einstein"],ids:["c6","c7","c9"]},{keys:["buchi","buchireddy","guthikonda","sreeramulu","gandhi nagar"],ids:["c8"]},{keys:["chandrahasa","chandra hasa"],ids:["c10"]},{keys:["gomathy","gomati"],ids:["c11"]}],a=new Set;return e.forEach(r=>{r.keys.some(i=>t.includes(i))&&r.ids.forEach(i=>a.add(i))}),a.size===0?[]:u.filter(r=>a.has(r.id))},$e=t=>y.filter(e=>{const a=e.code.toLowerCase();return a==="long term"?/long\s*term/.test(t):new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"i").test(t)}),Se=t=>{const e=String(t).toLowerCase(),a=xe(e),r=$e(e),i=e.includes("facilit")||e.includes("lab")||e.includes("transport")||e.includes("mess")||e.includes("cafeteria")||e.includes("library")||e.includes("classroom")||e.includes("dining")||e.includes("ac room"),f=e.includes("hostel")||e.includes("హాస్ట")||e.includes("हॉस्ट"),l=e.includes("campus")||e.includes("campuses")||e.includes("location")||e.includes("క్యాంప")||e.includes("कैंप"),C=/\bday\b/.test(e)||e.includes("day scholar"),$=e.includes("residential")||f,k=l&&(e.includes("all")||e.includes("every")||e.includes("list")||e.includes(`${u.length}`)||e.includes("nellore campus")||C&&$);if(a.length>0&&!i)return{confident:!0,reply:we(a)};if(e.includes("fee")||e.includes("cost")||e.includes("price")||e.includes("ఫీ")||e.includes("फीस"))return{confident:!0,reply:`Exact fees are not published as a single amount on this website. Fees vary by stream (${y.filter(c=>c.code!=="Long Term").map(c=>c.code).join(", ")}) and Day vs Residential campus.

WhatsApp ${d.phonePrimary} or email ${d.email} for the current fee structure and scholarships.

[NAV:page:/courses]`};if(e.includes("admission")||e.includes("apply")||e.includes("document")||e.includes("eligib")||e.includes("అడ్మిష")||e.includes("प्रवेश"))return{confident:!0,reply:`Admission process on this website:

${se.map(h=>`${h.step}. ${h.title}`).join(`
`)}

Documents usually needed: 10th memo, TC, Aadhaar, photos.

**How to apply** (form fields: Name, Phone, Stream, Preferred Campus):
• Mobile — tap **Apply Now** in the bottom bar
• Desktop — click **Apply Online** in the navbar

Contact: ${d.phonePrimary} | ${d.email}`};if(e.includes("life at")||e.includes("student life")||e.includes("clubs")||e.includes("cultural")&&!e.includes("gallery"))return{confident:!0,reply:`Student life at KCJC includes academics with clubs, cultural events, sports, NCC, NSS, workshops, and campus celebrations.

Open the Life at KCJC page for the full list. Sports meet and annual-day photos are in Gallery.

[NAV:page:/life-at-kcjc]`};if(e.includes("ncc")||e.includes("cadet")||e.includes("defense")||e.includes("defence")||e.includes("ఎన్సిసి"))return{confident:!0,reply:`**${B.title}**

${B.subheading}

${N.intro}

**Why join:** ${N.whyJoinItems.join(", ")}

**Training includes:** ${N.trainingItems.join(", ")}

**Cadet opportunities:** ${N.opportunitiesItems.join(", ")}

${N.opportunitiesNote}

Photos of cadets, camps, drill, and the sports-meet honour guard are in Explore NCC and Gallery → NCC.

[NAV:ncc]`};if(i||f&&(e.includes("facilit")||e.includes("lab")||e.includes("mess")||e.includes("transport"))){const c=j.map(h=>`• **${h.title}** (${h.category})
  ${h.description}`).join(`
`);return{confident:!0,reply:`Facilities published on this website (${j.length}):

${c}

Residential campuses also offer hostel life with supervised study. For hostel campus names, ask for Residential campuses.

[NAV:page:/facilities]`}}if(r.length>0&&r.length<y.length)return{confident:!0,reply:_(r)};if(e.includes("course")||e.includes("stream")||e.includes("program")||e.includes("కోర్స")||e.includes("कोर्स")||r.length===y.length)return{confident:!0,reply:_()};if(k||l&&!C&&!$)return{confident:!0,reply:be()};if(l&&$&&!C){const c=v();return{confident:!0,reply:`${c.length} **Residential campuses** listed on this website:

• ${I(c)}

[NAV:page:/campuses?category=Residential]`}}if(l&&C&&!$){const c=A();return{confident:!0,reply:`${c.length} **Day campuses** listed on this website:

• ${I(c)}

[NAV:page:/campuses?category=Day]`}}if(e.includes("why choose")||e.includes("advantage")||e.includes("ఎందుకు")||e.includes("क्यों"))return{confident:!0,reply:`Why Choose KCJC — from the college advantage page:

**${D.title}**
${D.intro}

Key pillars: ${D.advantageCards.map(c=>c.title).join(", ")}

[NAV:page:/why-choose-kcjc]`};if(e.includes("chairman")||e.includes("director")||e.includes("founder")||e.includes("leader")||e.includes("చైర్మ")||e.includes("संस्थापक"))return{confident:!0,reply:`KCJC leadership on this website:

${ie.map(h=>`• **${h.name}** — ${h.title}`).join(`
`)}

[NAV:leadership]`};if(e.includes("gallery")||e.includes("photo")||e.includes("sports meet")||e.includes("annual day")||e.includes("nss")||e.includes("kho kho")||e.includes("carrom"))return{confident:!0,reply:`The Gallery has real campus photos. Categories and highlights:

${Ce()}

Sports: track sprint, kho-kho, carrom, Games & Sports Meet 2024.
NCC: cadet honour guard, procession, torch lighting, plus camp and drill photos in Explore NCC.
NSS: campus service and sports-meet event photos.
Annual Day / Events: Freshers Day and annual-day stage performances.
Achievements: result banners, award ceremony, MEC 495 felicitation (Neelisetty Gayathri).
Campus: exteriors including Buchireddy Palem and 4K classroom.

[NAV:page:/gallery]`};if(e.includes("contact")||e.includes("phone")||e.includes("email")||e.includes("whatsapp number")||e.includes("సంపర్క")||e.includes("संपर्क"))return{confident:!0,reply:`Official contact:
• Phone/WhatsApp: ${d.phonePrimary}
• Email: ${d.email}
• Location: ${d.headquarters}

Mobile: tap **Call Desk** in the bottom bar.`};if(e.includes("kcei")||e.includes("parent app")){const c=fe.find(h=>h.id==="kcei-app");return{confident:!0,reply:c?`${c.title}

${c.description}

[NAV:page:/why-choose-kcjc]`:`Ask admissions at ${d.phonePrimary} about the parent app.

[NAV:page:/why-choose-kcjc]`}}return e.includes("rank")||e.includes("result")||/\bair\b/.test(e)||e.includes("ర్యాంక")||e.includes("रैंक")?{confident:!0,reply:`Latest JEE, NEET, EAPCET, and Board result details are shared by the admission team. Individual ranker profiles are not listed as a live results section on this website.

WhatsApp ${d.phonePrimary} for current achiever information.

The homepage hero includes Intermediate Results 2026 banners.`}:e.includes("legacy")||e.includes("1998")||e.includes("history")||e.includes("about college")||e.includes("overview")?{confident:!0,reply:`${d.name} was established in ${d.established} in Nellore.

${d.taglineSecondary}

This website lists ${u.length} campuses (${A().length} Day + ${v().length} Residential) and programmes in ${y.map(c=>c.code).join(", ")}.

Chairman: ${ne.messageShort.slice(0,220)}…

[NAV:why-choose]`}:e.includes("direction")||e.includes("google map")||e.includes("google maps")||e.includes("how to reach")||e.includes("map")?{confident:!0,reply:`Each campus page has a location map and **Get Directions / Open in Google Maps**.

On campus cards, use **Get Directions**.
In the website footer, tapping a campus name opens that campus **overview** — it does not open Maps.

[NAV:page:/campuses]`}:e.includes("bottom bar")||e.includes("mobile view")||e.includes("phone view")?{confident:!0,reply:`**Mobile website guide:**

• Bottom bar: Call Desk | Apply Now
• AI Guide: circular robot button at bottom-right
• Campuses: Day (${A().length}) and Residential (${v().length}) cards — tap a footer campus name for that campus overview
• Courses: tap a stream for details

[NAV:hero]`}:e.includes("desktop")||e.includes("laptop")?{confident:!0,reply:`**Desktop website guide:**

• Navbar: Overview, Why KCJC, Facilities, Campuses, Life at KCJC, Leadership, Gallery
• Courses dropdown: MPC, BiPC, MEC, CEC, Long Term
• Apply Online opens the admission form

[NAV:hero]`}:{confident:!1,reply:`${d.name}, Nellore, offers ${y.filter(c=>c.code!=="Long Term").map(c=>c.code).join(", ")} and Long Term programmes across **${u.length} campuses** (${A().length} Day + ${v().length} Residential).

Ask about a course, a campus name, facilities, NCC, admissions, or WhatsApp ${d.phonePrimary}.

Use the 📋 Menu for quick topics.

[NAV:why-choose]`}},Ne=new Set([...re,"welcome","ncc-nss","life-at-kc","admissions"]),Ae=new Set(["/","/facilities","/gallery","/life-at-kcjc","/courses","/overview","/why-choose-kcjc","/campuses"]),ve=/^[a-z0-9-]+$/i;function je(t){const e=t.trim();if(!e||e.includes("://")||e.startsWith("//"))return null;const a=ae(e);return a||(Ne.has(e)?e:null)}function H(t){if(!t||typeof t!="string")return null;const e=t.trim();if(!e.startsWith("/")||e.includes("://")||e.startsWith("//"))return null;const[a,r=""]=e.split("?");if(!Ae.has(a)){if(!a.startsWith("/campuses/"))return null;const C=a.slice(10);if(!C||!ve.test(C))return null}if(!r)return a;const i=new URLSearchParams(r),f=[...i.keys()];if(f.length===0)return a;if(f.length!==1||f[0]!=="category")return null;const l=i.get("category");return l!=="Day"&&l!=="Residential"?null:`${a}?category=${l}`}const We=({isOpen:t,onClose:e,onOpenApplyModal:a,onNavigateToSection:r,onNavigateToPath:i})=>{oe(t);const f=["🏛️ About College","📚 Courses & Streams","⭐ Why Choose KCJC","🎖️ NCC Cadet Wing","🏢 Nellore Campuses","🏠 Hostels & Facilities","🎓 Life at KCJC","🖼️ Gallery","📝 Apply Online Now","💬 Talk on WhatsApp"],[l,C]=S.useState([{id:"m1",sender:"ai",text:`Welcome to ${d.name}, Nellore!

I'm Campus Guide AI — trained on the live website: all ${u.length} campuses, courses, facilities, NCC, gallery photos (sports, annual day, achievements), admissions, and student life.

Footer campus names open that campus overview. Directions stay on the campus page.

Languages: English • తెలుగు • हिन्दी

Tap 📋 Menu or ask anything below.`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),quickReplies:f}]),[$,k]=S.useState(""),[c,h]=S.useState(!1),W=S.useRef(null),J=()=>{W.current?.scrollIntoView({behavior:"smooth"})};S.useEffect(()=>{t&&J()},[l,t]);const w=(s,o=!0)=>{if(o&&typeof window<"u"&&window.innerWidth<768&&e(),r){r(s);return}setTimeout(()=>{const m=document.getElementById(s);m&&(m.scrollIntoView({behavior:"smooth",block:"start"}),m.classList.add("ring-4","ring-[#FBBF24]","transition-all","duration-500"),setTimeout(()=>{m.classList.remove("ring-4","ring-[#FBBF24]","transition-all","duration-500")},2500))},150)},O=(s,o=!0)=>{const m=H(s);m&&(o&&typeof window<"u"&&window.innerWidth<768&&e(),i?i(m):(window.history.pushState({},"",m),window.scrollTo({top:0,behavior:"smooth"})))},U=s=>{const o=s.match(/\[NAV:page:(.*?)\]/);if(o?.[1]){const g=H(o[1].trim());return g?(O(g,!1),`page:${g}`):void 0}const m=s.match(/\[NAV:(.*?)\]/);if(m?.[1]){const g=je(m[1].trim());return g?(w(g,!1),g):void 0}},z=s=>{if(s.startsWith("page:")){const o=s.replace("page:","");if(o.includes("category=Day"))return"Day Campuses";if(o.includes("category=Residential"))return"Residential Campuses";switch(o.split("?")[0]){case"/why-choose-kcjc":return"Why Choose KCJC";case"/facilities":return"Facilities Page";case"/campuses":return"Campuses Page";case"/gallery":return"Gallery";case"/life-at-kcjc":return"Life at KCJC";default:return o.startsWith("/campuses/")?"Campus Details":"Website Page"}}switch(s){case"facilities":return"Facilities & Hostels";case"courses":return"Courses & Streams";case"campuses":return"Campuses";case"ncc":case"ncc-nss":return"NCC Cadet Wing";case"why-choose":case"welcome":return"About College";case"hero":return"Homepage";case"leadership":return"Leadership";case"explore-kcjc":case"life-at-kc":return"Student Life";case"stories":return"Success Stories";case"gallery":return"Gallery";default:return"College Section"}},Y=()=>{const s={id:Date.now().toString(),sender:"ai",text:"**Main Options Menu** — Please select a category below or enter your query:",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),quickReplies:f};C(o=>[...o,s])},Q=s=>{if(s==="📝 Apply Online Now"||s==="Apply Online Now"){a();return}if(s==="💬 Talk on WhatsApp"||s==="Talk on WhatsApp"){G(`https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent("Hello Krishna Chaitanya! I am chatting with Campus Guide AI and want to connect with an admission counselor.")}`);return}if(s==="🏛️ About College"){w("why-choose"),b("Tell me about Sri Krishna Chaitanya College overview, legacy, and founders");return}if(s==="📚 Courses & Streams"||s==="Explore Courses"){w("courses"),b("What courses and academic streams (MPC, BiPC, MEC, CEC) are offered?");return}if(s==="🎖️ NCC Cadet Wing"||s==="NCC & NSS Wings"){w("ncc"),b("Tell me about the Accredited 3 AP BN NCC Battalion Cadet Wing and Defense benefits");return}if(s==="🏢 Nellore Campuses"||s==="Campus Locations"||s==="Show Campuses"){w("campuses"),b(`List all ${u.length} campuses in Nellore — ${u.filter(o=>o.category==="Day").length} Day and ${u.filter(o=>o.category==="Residential").length} Residential`);return}if(s==="🏠 Hostels & Facilities"||s==="Hostel & Facilities"||s==="Ask Facilities"){i?i("/facilities"):w("facilities"),b("What facilities, labs, dining mess, and transport are listed on the website?");return}if(s==="⭐ Why Choose KCJC"||s==="Why Choose KCJC"){i&&i("/why-choose-kcjc"),b("Why should I choose Krishna Chaitanya Junior College? Show verified advantages from the website.");return}if(s==="🎓 Life at KCJC"||s==="Life at KCJC"){i?i("/life-at-kcjc",{fromSection:"explore-kcjc"}):w("explore-kcjc"),b("Tell me about student life, clubs, sports, NCC/NSS, and cultural activities at KCJC");return}if(s==="🖼️ Gallery"||s==="Gallery"){i?i("/gallery",{fromSection:"leadership"}):w("leadership"),b("What photos and events are in the KCJC gallery?");return}b(s)},E=s=>{const o=U(s),m={id:(Date.now()+1).toString(),sender:"ai",text:s.replace(/\[NAV:.*?\]/g,"").trim(),timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),quickReplies:f,navTarget:o};C(g=>[...g,m])},b=async s=>{const o=le((s||$).trim()).slice(0,2e3);if(!o)return;const m={id:Date.now().toString(),sender:"user",text:o,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};if(C(x=>[...x,m]),s||k(""),h(!0),o.toLowerCase().includes("whatsapp")&&!o.toLowerCase().includes("whatsapp number")){h(!1);const x={id:(Date.now()+1).toString(),sender:"ai",text:"Connecting you directly with our senior admission counselor on WhatsApp...",timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),quickReplies:f};C(L=>[...L,x]),G(`https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent("Hello Krishna Chaitanya! I am chatting with Campus Guide AI and want to connect with a counselor.")}`);return}const g=Se(o);if(g.confident){E(g.reply),h(!1);return}try{const x=await fetch("/api/ai-guide",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:o,history:l.slice(-6)})});if(x.status===429){E("You are sending messages too quickly. Please wait a moment and try again.");return}const L=await x.json().catch(()=>({})),X=x.ok&&L.reply||g.reply||"Thank you for asking! For personalized guidance, connect on WhatsApp.";E(X)}catch(x){console.error("AI Chat Error:",x),E(g.reply)}finally{h(!1)}};return t?n.jsxs(n.Fragment,{children:[n.jsx("div",{onClick:e,className:"fixed inset-0 bg-[#0866FF]/20 backdrop-blur-xs sm:bg-black/25 z-[55] transition-opacity cursor-pointer","aria-hidden":"true"}),n.jsx(Z,{children:n.jsx("div",{className:"fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-[60] flex flex-col justify-end sm:block pointer-events-none",children:n.jsxs(q.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},className:"bg-white w-full sm:w-[400px] h-[85vh] sm:h-[580px] rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden font-sans pointer-events-auto",children:[n.jsxs("div",{className:"bg-gradient-to-r from-[#0866FF] via-[#0064E0] to-[#0052CC] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md",children:[n.jsxs("div",{className:"flex items-center gap-2.5",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-md shrink-0 border border-white/25",children:n.jsx(F,{className:"w-7 h-7"})}),n.jsxs("div",{children:[n.jsxs("h3",{className:"font-serif font-bold text-xs sm:text-sm text-white flex items-center gap-1.5",children:["Campus Guide AI",n.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-ping"})]}),n.jsx("p",{className:"text-[10px] text-blue-100 font-medium",children:"English • తెలుగు • हिंदी Supported"})]})]}),n.jsxs("div",{className:"flex items-center gap-1.5",children:[n.jsx("button",{onClick:Y,className:"text-[11px] bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold px-2.5 py-1.5 rounded-lg border border-white/20 transition-all cursor-pointer flex items-center gap-1 shadow-2xs",title:"Show Main Menu options",children:n.jsx("span",{children:"📋 Menu"})}),n.jsx("button",{onClick:e,className:"w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors","aria-label":"Close Campus Guide AI",children:n.jsx(ce,{className:"w-5 h-5"})})]})]}),n.jsxs("div",{className:"flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]",children:[l.map(s=>n.jsxs("div",{className:`flex flex-col ${s.sender==="user"?"items-end":"items-start"}`,children:[n.jsxs("div",{className:`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs leading-relaxed shadow-sm ${s.sender==="user"?"bg-[#0B3C91] text-white rounded-br-none":"bg-white text-slate-800 border border-blue-100 rounded-bl-none"}`,children:[n.jsx("p",{className:"whitespace-pre-line",children:s.text}),s.navTarget&&n.jsxs("button",{onClick:()=>{s.navTarget.startsWith("page:")?O(s.navTarget.replace("page:",""),!0):w(s.navTarget,!0)},className:"mt-2.5 w-full bg-[#0B3C91] hover:bg-[#072B6B] active:bg-[#04122B] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-xs transition-all cursor-pointer border border-blue-400/30 flex items-center justify-center gap-1.5",children:[n.jsx(de,{className:"w-3.5 h-3.5 text-[#FBBF24] animate-bounce"}),n.jsxs("span",{children:["Jump to ",z(s.navTarget)," Section"]})]}),n.jsx("span",{className:`text-[9px] mt-1 block text-right font-medium ${s.sender==="user"?"text-blue-200":"text-slate-400"}`,children:s.timestamp})]}),s.quickReplies&&s.sender==="ai"&&n.jsx("div",{className:"flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 max-w-[98%]",children:s.quickReplies.map((o,m)=>n.jsx("button",{onClick:()=>Q(o),className:"bg-blue-50 hover:bg-[#0B3C91] hover:text-white active:bg-blue-200 text-[#0B3C91] border border-blue-200/80 font-bold text-xs px-3 py-2 sm:px-3.5 sm:py-2.5 min-h-[38px] rounded-full cursor-pointer transition-all shadow-2xs flex items-center justify-center text-center",children:o},m))})]},s.id)),c&&n.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-xs bg-white p-3 rounded-2xl border border-blue-100 max-w-[140px]",children:[n.jsx(F,{className:"w-5 h-5 animate-bounce shrink-0"}),n.jsx("span",{className:"font-medium text-[11px]",children:"Searching AI..."})]}),n.jsx("div",{ref:W})]}),n.jsxs("div",{className:"bg-emerald-50 px-3.5 py-2 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900",children:[n.jsx("span",{className:"text-[11px] font-semibold",children:"Need direct human assistance?"}),n.jsxs("a",{href:`https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent("Hello Krishna Chaitanya Counselor! I need help with Intermediate Admissions.")}`,target:"_blank",rel:"noopener noreferrer",className:"text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-100 transition-colors",children:[n.jsx(ue,{className:"w-4 h-4 fill-emerald-600 stroke-none"}),n.jsx("span",{children:"WhatsApp Counselor"})]})]}),n.jsxs("div",{className:"p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2",children:[n.jsx("input",{type:"text",placeholder:"Ask in English, తెలుగు, or हिंदी...",value:$,onChange:s=>k(s.target.value),onKeyDown:s=>s.key==="Enter"&&b(),className:"flex-1 px-3.5 py-2.5 sm:py-3 min-h-[44px] rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B3C91] bg-slate-50 focus:bg-white"}),n.jsx("button",{onClick:()=>b(),className:"w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] bg-[#0B3C91] text-white rounded-xl flex items-center justify-center hover:bg-[#072B6B] active:scale-95 transition-all cursor-pointer shrink-0 shadow-md","aria-label":"Send Message",children:n.jsx(pe,{className:"w-5 h-5"})})]})]})})})]}):null};export{We as AICampusGuide};
