import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  ArrowDown, 
  Compass, 
  User, 
  Minimize2,
  RefreshCw
} from 'lucide-react';
import { ChatMessage } from '../types';
import { COLLEGE_INFO, CAMPUSES } from '../data/collegeData';
import { generateFallbackReply } from '../data/aiKnowledgeBase';
import { CuteRobotIcon } from './CuteRobotIcon';

interface AICampusGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyModal: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToPath?: (path: string) => void;
}

export const AICampusGuide: React.FC<AICampusGuideProps> = ({
  isOpen,
  onClose,
  onOpenApplyModal,
  onNavigateToSection,
  onNavigateToPath,
}) => {
  const MAIN_MENU_OPTIONS = [
    '🏛️ About College',
    '📚 Courses & Streams',
    '⭐ Why Choose KCJC',
    '🏆 Ranks & Results',
    '🎖️ NCC Cadet Wing',
    '🏢 Nellore Campuses',
    '🏠 Hostels & Facilities',
    '🎓 Life at KCJC',
    '🖼️ Gallery',
    '📝 Apply Online Now',
    '💬 Talk on WhatsApp',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Welcome to ${COLLEGE_INFO.name}, Nellore!\n\nI'm Campus Guide AI — trained on our complete website for mobile and desktop, including courses, all ${CAMPUSES.length} campuses, facilities, admissions, ranks, NCC, gallery, and student life.\n\nLanguages: English • తెలుగు • हिन्दी\n\nTap 📋 Menu or ask anything below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: MAIN_MENU_OPTIONS
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle page scrolling if response contains [NAV:target]
  const scrollToSection = (targetId: string, autoCloseMobile: boolean = true) => {
    if (autoCloseMobile && typeof window !== 'undefined' && window.innerWidth < 768) {
      onClose();
    }

    if (onNavigateToSection) {
      onNavigateToSection(targetId);
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.classList.add('ring-4', 'ring-[#FBBF24]', 'transition-all', 'duration-500');
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-[#FBBF24]', 'transition-all', 'duration-500');
        }, 2500);
      }
    }, 150);
  };

  const navigateToPage = (path: string, autoCloseMobile: boolean = true) => {
    if (autoCloseMobile && typeof window !== 'undefined' && window.innerWidth < 768) {
      onClose();
    }
    if (onNavigateToPath) {
      onNavigateToPath(path);
    } else {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const processNavigation = (text: string): string | undefined => {
    const pageMatch = text.match(/\[NAV:page:(.*?)\]/);
    if (pageMatch?.[1]) {
      const path = pageMatch[1].trim();
      navigateToPage(path, false);
      return `page:${path}`;
    }

    const navMatch = text.match(/\[NAV:(.*?)\]/);
    if (navMatch?.[1]) {
      const targetId = navMatch[1].trim();
      scrollToSection(targetId, false);
      return targetId;
    }
    return undefined;
  };

  const getSectionTitle = (target: string) => {
    if (target.startsWith('page:')) {
      const path = target.replace('page:', '');
      if (path.includes('category=Day')) return 'Day Campuses';
      if (path.includes('category=Residential')) return 'Residential Campuses';
      switch (path.split('?')[0]) {
        case '/why-choose-kcjc':
          return 'Why Choose KCJC';
        case '/facilities':
          return 'Facilities Page';
        case '/campuses':
          return 'Campuses Page';
        case '/gallery':
          return 'Gallery';
        case '/life-at-kcjc':
          return 'Life at KCJC';
        default:
          if (path.startsWith('/campuses/')) return 'Campus Details';
          return 'Website Page';
      }
    }

    switch (target) {
      case 'facilities':
        return 'Facilities & Hostels';
      case 'courses':
        return 'Courses & Streams';
      case 'campuses':
        return 'Campuses';
      case 'results':
        return 'Ranks & Results';
      case 'ncc-nss':
        return 'NCC Cadet Wing';
      case 'welcome':
        return 'About College';
      case 'hero':
        return 'Homepage';
      case 'leadership':
        return 'Leadership';
      case 'life-at-kc':
        return 'Student Life';
      case 'why-us':
        return 'Why Choose KCJC';
      case 'gallery':
        return 'Gallery';
      default:
        return 'College Section';
    }
  };

  const showMainMenuInChat = () => {
    const menuMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'ai',
      text: `**Main Options Menu** — Please select a category below or enter your query:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: MAIN_MENU_OPTIONS
    };
    setMessages((prev) => [...prev, menuMsg]);
  };

  const handleQuickReplyClick = (qr: string) => {
    if (qr === '📝 Apply Online Now' || qr === 'Apply Online Now') {
      onOpenApplyModal();
      return;
    }
    if (qr === '💬 Talk on WhatsApp' || qr === 'Talk on WhatsApp') {
      window.open(`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya! I am chatting with Campus Guide AI and want to connect with an admission counselor.')}`, '_blank');
      return;
    }
    if (qr === '🏛️ About College') {
      scrollToSection('welcome');
      handleSend("Tell me about Sri Krishna Chaitanya College overview, legacy, and founders");
      return;
    }
    if (qr === '📚 Courses & Streams' || qr === 'Explore Courses') {
      scrollToSection('courses');
      handleSend("What courses and academic streams (MPC, BiPC, MEC, CEC) are offered?");
      return;
    }
    if (qr === '🏆 Ranks & Results' || qr === 'Top JEE/NEET Ranks') {
      scrollToSection('results');
      handleSend("Show me top IIT-JEE and NEET ranks achieved by Krishna Chaitanya students");
      return;
    }
    if (qr === '🎖️ NCC Cadet Wing' || qr === 'NCC & NSS Wings') {
      scrollToSection('ncc-nss');
      handleSend("Tell me about the Accredited 3 AP BN NCC Battalion Cadet Wing and Defense benefits");
      return;
    }
    if (qr === '🏢 Nellore Campuses' || qr === 'Campus Locations' || qr === 'Show Campuses') {
      scrollToSection('campuses');
      handleSend(`List all ${CAMPUSES.length} campuses in Nellore — ${CAMPUSES.filter((c) => c.category === 'Day').length} Day and ${CAMPUSES.filter((c) => c.category === 'Residential').length} Residential`);
      return;
    }
    if (qr === '🏠 Hostels & Facilities' || qr === 'Hostel & Facilities' || qr === 'Ask Facilities') {
      if (onNavigateToPath) {
        onNavigateToPath('/facilities');
      } else {
        scrollToSection('facilities');
      }
      handleSend("What hostel, AC rooms, dining mess, labs, and transport facilities are listed on the website?");
      return;
    }
    if (qr === '⭐ Why Choose KCJC' || qr === 'Why Choose KCJC') {
      if (onNavigateToPath) {
        onNavigateToPath('/why-choose-kcjc');
      }
      handleSend("Why should I choose Krishna Chaitanya Junior College? Show verified advantages from the website.");
      return;
    }
    if (qr === '🎓 Life at KCJC' || qr === 'Life at KCJC') {
      if (onNavigateToPath) {
        onNavigateToPath('/life-at-kcjc');
      } else {
        scrollToSection('life-at-kc');
      }
      handleSend('Tell me about student life, clubs, sports, NCC/NSS, and cultural activities at KCJC');
      return;
    }
    if (qr === '🖼️ Gallery' || qr === 'Gallery') {
      if (onNavigateToPath) {
        onNavigateToPath('/gallery');
      } else {
        scrollToSection('gallery');
      }
      handleSend('What photos and events are in the KCJC gallery?');
      return;
    }

    handleSend(qr);
  };

  const appendAiReply = (replyText: string) => {
    const navTarget = processNavigation(replyText);
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: replyText.replace(/\[NAV:.*?\]/g, '').trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: MAIN_MENU_OPTIONS,
      navTarget,
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsTyping(true);

    // Quick direct trigger for WhatsApp option
    if (query.toLowerCase().includes('whatsapp')) {
      setIsTyping(false);
      const waMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Connecting you directly with our senior admission counselor on WhatsApp...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: MAIN_MENU_OPTIONS
      };
      setMessages((prev) => [...prev, waMsg]);
      window.open(`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya! I am chatting with Campus Guide AI and want to connect with a counselor.')}`, '_blank');
      return;
    }

    try {
      const response = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: messages })
      });

      const data = await response.json();
      const replyText =
        data.reply ||
        generateFallbackReply(query) ||
        'Thank you for asking! For personalized guidance, connect on WhatsApp.';

      appendAiReply(replyText);
    } catch (error) {
      console.error('AI Chat Error:', error);
      appendAiReply(generateFallbackReply(query));
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Meta AI-themed Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#0866FF]/20 backdrop-blur-xs sm:bg-black/25 z-[55] transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      <AnimatePresence>
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-[60] flex flex-col justify-end sm:block pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-full sm:w-[400px] h-[85vh] sm:h-[580px] rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden font-sans pointer-events-auto"
          >
            {/* Header with Meta AI Blue Gradient */}
            <div className="bg-gradient-to-r from-[#0866FF] via-[#0064E0] to-[#0052CC] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/15 p-1 flex items-center justify-center shadow-md shrink-0 border border-white/30 backdrop-blur-md">
                  <CuteRobotIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    Campus Guide AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </h3>
                  <p className="text-[10px] text-blue-100 font-medium">English • తెలుగు • हिंदी Supported</p>
                </div>
              </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={showMainMenuInChat}
                className="text-[11px] bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold px-2.5 py-1.5 rounded-lg border border-white/20 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Show Main Menu options"
              >
                <span>📋 Menu</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Campus Guide AI"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0B3C91] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-blue-100 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.navTarget && (
                    <button
                      onClick={() => {
                        if (msg.navTarget!.startsWith('page:')) {
                          navigateToPage(msg.navTarget!.replace('page:', ''), true);
                        } else {
                          scrollToSection(msg.navTarget!, true);
                        }
                      }}
                      className="mt-2.5 w-full bg-[#0B3C91] hover:bg-[#072B6B] active:bg-[#04122B] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-xs transition-all cursor-pointer border border-blue-400/30 flex items-center justify-center gap-1.5"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-[#FBBF24] animate-bounce" />
                      <span>Jump to {getSectionTitle(msg.navTarget)} Section</span>
                    </button>
                  )}

                  <span
                    className={`text-[9px] mt-1 block text-right font-medium ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Quick replies Main Menu */}
                {msg.quickReplies && msg.sender === 'ai' && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 max-w-[98%]">
                    {msg.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReplyClick(qr)}
                        className="bg-blue-50 hover:bg-[#0B3C91] hover:text-white active:bg-blue-200 text-[#0B3C91] border border-blue-200/80 font-bold text-xs px-3 py-2 sm:px-3.5 sm:py-2.5 min-h-[38px] rounded-full cursor-pointer transition-all shadow-2xs flex items-center justify-center text-center"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs bg-white p-3 rounded-2xl border border-blue-100 max-w-[140px]">
                <CuteRobotIcon className="w-5 h-5 animate-bounce shrink-0" />
                <span className="font-medium text-[11px]">Searching AI...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom WhatsApp CTA prompt */}
          <div className="bg-emerald-50 px-3.5 py-2 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
            <span className="text-[11px] font-semibold">Need direct human assistance?</span>
            <a
              href={`https://wa.me/${COLLEGE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Krishna Chaitanya Counselor! I need help with Intermediate Admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-none" />
              <span>WhatsApp Counselor</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask in English, తెలుగు, or हिंदी..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2.5 sm:py-3 min-h-[44px] rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B3C91] bg-slate-50 focus:bg-white"
            />
            <button
              onClick={() => handleSend()}
              className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] bg-[#0B3C91] text-white rounded-xl flex items-center justify-center hover:bg-[#072B6B] active:scale-95 transition-all cursor-pointer shrink-0 shadow-md"
              aria-label="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  </>
  );
};
