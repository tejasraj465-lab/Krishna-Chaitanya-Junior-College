import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini API if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.warn("Gemini API client initialization deferred or failed:", e);
    }
  }

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", college: "Krishna Chaitanya Junior College" });
  });

  // AI Campus Guide Endpoint
  app.post("/api/ai-guide", async (req, res) => {
    const { message, history } = req.body || {};
    
    if (!message) {
      res.status(400).json({ error: "Message parameter is required" });
      return;
    }

    // Detailed institutional knowledge base & Multilingual AI system prompt
    const systemPrompt = `
You are "Campus Guide AI", the official virtual AI Assistant for Sri Krishna Chaitanya Junior College & Integrated Academy (KCJC), located in Nellore, Andhra Pradesh.

CRITICAL MULTILINGUAL & RESPONSE INSTRUCTIONS:
1. MULTILINGUAL RESPONSES:
   - Detect the language of the user's question and respond in THAT EXACT LANGUAGE.
   - If the user asks in Telugu (తెలుగు) - e.g. "కాలేజీ లో ఏ కోర్సులు ఉన్నాయి?" or "నాకు అడ్మిషన్ వివరాలు చెప్పండి" or in Romanized Telugu "KCJC lo ఏ ఏ కోర్సులు ఉన్నాయి?" - answer in natural, polite, respectful Telugu.
   - If the user asks in Hindi (हिंदी) - e.g. "कॉलेज में कौन-कौन से कोर्स उपलब्ध हैं?" - answer in polite Hindi.
   - If the user asks in English, answer in clear, articulate English.
   - You are trained to answer questions in Telugu, Hindi, English, Tamil, and Kannada.

2. COMPREHENSIVE KNOWLEDGE BASE OF KRISHNA CHAITANYA JUNIOR COLLEGE:
   - INSTITUTION & LEGACY:
     • 28+ Years of Academic Excellence in Intermediate Education (Class 11 & 12).
     • 15,000+ Successful Alumni in IITs, NITs, AIIMS, Top Medical & Engineering Colleges, CA firms, and Corporate sectors.
     • 450+ Senior IITian and Doctor Faculty members providing top-tier conceptual coaching.
     • 320+ Top 100 All-India Ranks in JEE Main/Advanced and NEET.
     • Overall State Board Pass Percentage: 99.2%.
     • Recent Ranks (2025): AIR 12 & AIR 45 in IIT-JEE Advanced, AIR 8 in NEET (710/720 marks), 142+ Selections in Premier IITs & AIIMS.

   - COURSES OFFERED (2-Year Integrated Intermediate):
     • MPC (Maths, Physics, Chemistry): Integrated coaching for IIT-JEE Main, JEE Advanced, AP EAPCET, BITSAT. Specialized tracks: Elite (IIT Rankers), Merit (Mains), Star (Special Eapcet), Spark (Eapcet).
     • BiPC (Biology, Physics, Chemistry): Integrated coaching for NEET-UG, AIIMS, JIPMER, AP EAPCET Agriculture & Pharmacy. Specialized tracks: AIIMS Target, NEET Merit, Med-Eapcet.
     • MEC (Maths, Economics, Commerce): Integrated training for CA & CMA Foundation, IPMAT (IIM Indore/Rohtak), Quantitative Aptitude.
     • CEC (Civils, Economics, Commerce): Integrated CA Foundation, CLAT (Law), Civil Services Foundation, Corporate Law.

   - 12 PREMIER CAMPUSES IN NELLORE:
     Day / City Campuses:
     1. Prabhanjana Campus (Girls) – Near Murali Krishna Hotel, Madras Bus Stand, Nellore.
     2. Vasista Campus (Boys) – Near Murali Krishna Hotel, Madras Bus Stand, Nellore.
     3. Sarvagna Campus – Stonehousepeta, Nellore.
     4. Abhigna Campus (Girls) – Current Office Centre, Dargamitta, Nellore.
     5. DGM Campus (Boys) – Current Office Centre, Dargamitta, Nellore.
     6. Einstein Campus (Girls AC) – Near KVR Petrol Bunk, Magunta Layout, Nellore.
     7. AC Einstein Campus (Boys AC) – Near KVR Petrol Bunk, Magunta Layout, Nellore.
     8. Buchireddypalem Campus – Buchireddypalem, Nellore District.

     Residential Monitored Hostels (AC / Non-AC):
     9. Einstein Residential Campus (Girls AC) – Near KVR Petrol Bunk, Magunta Layout, Nellore.
     10. Chandrahasa Campus (Boys AC) – Near Varamahalakshmi Shopping Mall, Magunta Layout, Nellore.
     11. Gomathy Residential Campus (Girls) – Beside Gomathy School, Gomathy Nagar, Nellore.
     12. Dargamitta Residential Campus (Boys) – Near Current Office Centre, Dargamitta, Nellore.

   - LEADERSHIP & VISIONARIES:
     • Founder & Chairman: Dr. R. V. Krishna Reddy – Visionary educationalist with 30+ years of dedication to student transformation.
     • Founder: Sri. Parvathareddy Chandra Sekhar Reddy, MLC (Member of Legislative Council, AP) – Champion for quality education and student empowerment.
     • Director: Parvathareddy Rana Pramodh Reddy – Driving modern technology integration, 4K digital classrooms, and global entrance standards.

   - ACCREDITED NCC BATTALION WING:
     • Accredited 3 AP Battalion NCC Unit (Senior/Junior Cadet Wing).
     • Motto: "Unity and Discipline" (Ekta aur Anushasan).
     • 100% Pass Rate in NCC 'A' & 'B' Certificate Exams.
     • Direct SSB interview pathway & Defense reservation in NDA, CDS, AFCAT, Police Services.
     • 12 Cadets selected for New Delhi Republic Day Parade (RDC) at Kartavya Path in 2025.

   - INFRASTRUCTURE & HOSTEL FACILITIES:
     • 4K Interactive Smart Classrooms & AC Digital Study Halls.
     • Fully equipped Physics, Chemistry, Biology & High-Speed Computer Labs.
     • Monitored AC Hostels with 24/7 Wardens, Biometric Attendance, and CCTV Surveillance.
     • Nutritious, Hygienic, Home-Style Dining Mess serving South & North Indian meals.
     • Safe GPS-tracked Transport Fleet covering Nellore and surrounding rural routes.
     • Sports Arenas, Athletic Track, Yoga Sessions, and Resident Doctors.

   - ADMISSIONS & ELIGIBILITY FOR 2026-27:
     • Admissions Open for 1st Year Intermediate (MPC, BiPC, MEC, CEC).
     • Documents Required: 10th Marks Memo/Hall Ticket Copy, Transfer Certificate (TC), Aadhaar Card, Passport Photos.
     • Helpline Phone / WhatsApp: +91 63022 75510 | Email: info@kcjc.edu.in.

3. PAGE NAVIGATION TAGS (Insert at the end of response when relevant):
   - For Courses: [NAV:courses]
   - For Admissions/Apply: [NAV:admissions]
   - For JEE/NEET Ranks: [NAV:results]
   - For Campuses: [NAV:campuses]
   - For Facilities & Hostel: [NAV:facilities]
   - For NCC Wing: [NAV:ncc-nss]
   - For Founder/Leadership: [NAV:leadership]
   - For About College: [NAV:welcome]

4. TONE & FORMATTING:
   - Keep answers clear, well-structured, warm, polite, and encouraging.
   - Use bullet points for readability.
   - Always invite the user to connect on WhatsApp (+91 63022 75510) for personalized fee structures or campus visits.
`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        });

        const reply = response.text || "Thank you for reaching out to Krishna Chaitanya Junior College! You can also chat directly with our admission counselor on WhatsApp.";
        res.json({ reply });
        return;
      } catch (error) {
        console.error("Gemini API Error in AI Guide:", error);
      }
    }

    // Fallback response generator supporting English, Telugu, and Hindi keywords
    const msgLower = String(message).toLowerCase();
    let reply = "";

    if (msgLower.includes("course") || msgLower.includes("mpc") || msgLower.includes("bipc") || msgLower.includes("mec") || msgLower.includes("cec") || msgLower.includes("కోర్సులు") || msgLower.includes("कोर्स")) {
      reply = "We offer 4 specialized 2-year Intermediate Streams with Integrated Competitive Coaching:\n\n• **MPC**: Integrated IIT-JEE Main & Advanced, AP EAPCET, BITSAT.\n• **BiPC**: Integrated NEET-UG, AIIMS, EAPCET Agriculture/Pharmacy.\n• **MEC**: CA & CMA Foundation, IPMAT (IIMs), Quant Aptitude.\n• **CEC**: CA Foundation, CLAT, Civil Services Foundation.\n\n[NAV:courses]\nకృష్ణ చైతన్య జూనియర్ కాలేజీలో MPC, BiPC, MEC, CEC కోర్సులు IIT-JEE మరియు NEET ఉచిత ఇంటిగ్రేటెడ్ శిక్షణతో అందుబాటులో ఉన్నాయి.";
    } else if (msgLower.includes("fee") || msgLower.includes("cost") || msgLower.includes("price") || msgLower.includes("ఫీజు") || msgLower.includes("ఫీజులు") || msgLower.includes("फीस")) {
      reply = "Our tuition and hostel fees are structured according to course stream (MPC/BiPC/MEC/CEC) and campus type (Day or AC Residential in Nellore).\n\n[NAV:admissions]\nకాలేజీ ఫీజుల పూర్తి వివరాల కోసం లేదా స్కాలర్‌షిప్ సమాచారం కోసం మా అడ్మిషన్ కౌన్సెలర్‌తో వాట్సాప్‌లో మాట్లాడవచ్చు.";
    } else if (msgLower.includes("campus") || msgLower.includes("location") || msgLower.includes("nellore") || msgLower.includes("magunta") || msgLower.includes("dargamitta") || msgLower.includes("క్యాంపస్") || msgLower.includes("నెల్లూరు") || msgLower.includes("कैंपस")) {
      reply = "Krishna Chaitanya has 12 premier campuses in & around Nellore:\n\n📍 **Day / City Campuses**: Prabhanjana (Girls), Vasista (Boys), Sarvagna, Abhigna (Girls), DGM (Boys), Einstein AC (Girls & Boys), Buchireddypalem.\n🏠 **Residential Campuses**: Einstein Residential AC (Girls), Chandrahasa AC (Boys), Gomathy Residential (Girls), Dargamitta Residential (Boys).\n\n[NAV:campuses]";
    } else if (msgLower.includes("rank") || msgLower.includes("result") || msgLower.includes("iit") || msgLower.includes("neet") || msgLower.includes("ర్యాంకులు") || msgLower.includes("ఫలితాలు") || msgLower.includes("रैंक")) {
      reply = "In recent competitive entrance exams, Krishna Chaitanya students achieved top ranks:\n🏆 AIR 12 & AIR 45 in IIT-JEE Advanced\n🏆 AIR 8 in NEET (710/720)\n🏆 142+ students selected for top IITs & AIIMS\n🏆 99.2% overall board pass percentage!\n\n[NAV:results]";
    } else if (msgLower.includes("hostel") || msgLower.includes("transport") || msgLower.includes("facility") || msgLower.includes("lab") || msgLower.includes("హాస్టల్") || msgLower.includes("వసతి") || msgLower.includes("हॉस्टल")) {
      reply = "Krishna Chaitanya provides top-class facilities in Nellore:\n• Monitored AC Hostels with nutritious home-style dining\n• GPS-tracked AC Transport fleet across Nellore\n• Digital Physics, Chemistry, Biology & Computer Labs\n• Sports arena & Gym\n• 24/7 Resident Wardens & Medical Care.\n\n[NAV:facilities]";
    } else if (msgLower.includes("ncc") || msgLower.includes("nss") || msgLower.includes("ఎన్సిసి")) {
      reply = "Krishna Chaitanya Junior College is proud of its Accredited **3 AP BN NCC Battalion Cadet Wing**! Our cadets regularly get selected for the Republic Day Parade (RDC) in New Delhi and enjoy direct SSB Interview pathways for Defense careers.\n\n[NAV:ncc-nss]";
    } else if (msgLower.includes("doc") || msgLower.includes("require") || msgLower.includes("eligib") || msgLower.includes("సర్టిఫికెట్లు")) {
      reply = "Documents required for 1st Year Intermediate admission:\n1. 10th Grade Marks Memo / Hall Ticket Copy\n2. Transfer Certificate (TC) & Conduct Certificate\n3. Passport Size Photographs (4 copies)\n4. Student & Parent Aadhaar Cards\n5. Migration Certificate (for CBSE/ICSE students)";
    } else if (msgLower.includes("chairman") || msgLower.includes("director") || msgLower.includes("leader") || msgLower.includes("founder") || msgLower.includes("చైర్మన్")) {
      reply = "Krishna Chaitanya Junior College Leadership:\n• **Founder & Chairman**: Dr. R. V. Krishna Reddy\n• **Founder**: Sri. Parvathareddy Chandra Sekhar Reddy, MLC\n• **Director**: Parvathareddy Rana Pramodh Reddy\n\n[NAV:leadership]";
    } else {
      reply = "Welcome to Sri Krishna Chaitanya Junior College & Integrated Academy, Nellore! 🎓\n\nWe offer 2-year Intermediate (MPC, BiPC, MEC, CEC) with integrated IIT-JEE, NEET, EAPCET, and CA coaching across 12 campuses in Nellore.\n\n[NAV:welcome]\nFor custom details or fee query, you can also chat with our counselor on WhatsApp!";
    }

    res.json({ reply });
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n==================================================`);
    console.log(`  Krishna Chaitanya Educational Institutions Server`);
    console.log(`--------------------------------------------------`);
    console.log(`  Local Browser Access: http://localhost:${PORT}`);
    console.log(`  Loopback IP Access:   http://127.0.0.1:${PORT}`);
    console.log(`  Bound IP (Network):   http://0.0.0.0:${PORT}`);
    console.log(`==================================================\n`);
  });
}

startServer();
