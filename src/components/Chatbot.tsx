'use client';

import { useState, useRef } from 'react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface ChatOption {
  label: string;
  key: string;
  emoji?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChips, setCurrentChips] = useState<ChatOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const KB = {
    projects: {
      sapphire: {
        name: 'Sunshine Sapphire',
        location: 'Ameenpur, Hyderabad – 502032',
        status: 'Completed ✅',
        config: '2 BHK + Puja Room',
        area: '1150 Sq.ft per flat',
        flats: '4 per floor',
        road: "40'0\" Wide Road",
        facing: 'East (Flats 1 & 2) · West (Flats 3 & 4)',
      },
      pearl: {
        name: "UV's Pearl",
        location: '2Gether Heights (Ekam Block & Dviyam Block), Ameenpur',
        status: 'Ongoing 🔨',
      },
      new: {
        name: 'New Launch 2025',
        status: 'Upcoming 🔮',
      },
    },
    contact: {
      name: 'Pavan Kumar Inturi',
      phone1: '+91 73860 86043',
      phone2: '+91 95059 44456',
      email: 'Pavankumarinturi@uv-infra.com',
      address: '2Gether Heights, Ameenpur, Hyderabad – 502032',
      visitHours: {
        weekdays: '10:00 AM – 6:00 PM',
        weekends: '9:00 AM – 7:00 PM',
      },
    },
  };

  const MAIN_MENU: ChatOption[] = [
    { emoji: '🏢', label: 'Our Projects', key: 'projects' },
    { emoji: '📐', label: 'Flat Dimensions', key: 'flatdims' },
    { emoji: '🔨', label: 'Specifications', key: 'specs' },
    { emoji: '📅', label: 'Book a Site Visit', key: 'visit' },
    { emoji: '📞', label: 'Contact Details', key: 'contact' },
  ];

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (text: string, type: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const showChips = (chips: ChatOption[]) => {
    setCurrentChips(chips);
  };

  const matchKeyword = (text: string): string | null => {
    const lower = text.toLowerCase();

    if (/sunshine|sapphire/.test(lower)) return 'proj_sapphire';
    if (/pearl|uv.*pearl/.test(lower)) return 'proj_pearl';
    if (/new launch|2025|upcoming/.test(lower)) return 'proj_new';
    if (/flat 1|flat one|east flat/.test(lower)) return 'flat1';
    if (/flat 2/.test(lower)) return 'flat2';
    if (/flat 3|west flat/.test(lower)) return 'flat3';
    if (/flat 4/.test(lower)) return 'flat4';
    if (/dimension|size|bedroom|kitchen|dining|room/.test(lower)) return 'flatdims';
    if (/spec|material|floor|tile|paint|door|window/.test(lower)) return 'specs';
    if (/visit|site visit|schedule|timing|when open/.test(lower)) return 'visit';
    if (/contact|phone|call|whatsapp|email|pavan/.test(lower)) return 'contact';
    if (/project|apartment|flat|home|house|buy/.test(lower)) return 'projects';
    if (/price|cost|rate|budget|payment|emi/.test(lower)) return 'price';
    if (/bye|thank|exit|quit|done|goodbye/.test(lower)) return 'bye';

    return null;
  };

  const getResponse = (key: string) => {
    const responses: Record<string, { text: string; chips: ChatOption[] }> = {
      welcome: {
        text: '👋 Welcome to UV Infra!\n\nI\'m your virtual assistant. I can help you with:\n• Flat details & dimensions\n• Project specifications\n• Site visit booking\n• Contact information\n\nHow can I assist you today?',
        chips: MAIN_MENU,
      },
      main: {
        text: '🏠 Main Menu\n\nWhat would you like to know?',
        chips: MAIN_MENU,
      },
      projects: {
        text: '🏢 UV Infra Projects\n\nWe have premium residential projects in Ameenpur, Hyderabad. Which project would you like to know about?',
        chips: [
          { emoji: '✅', label: 'Sunshine Sapphire', key: 'proj_sapphire' },
          { emoji: '🔨', label: "UV's Pearl", key: 'proj_pearl' },
          { emoji: '🔮', label: 'New Launch 2025', key: 'proj_new' },
          { emoji: '🏠', label: 'Back to Main Menu', key: 'main' },
        ],
      },
      proj_sapphire: {
        text: `✅ Sunshine Sapphire\n\n📍 ${KB.projects.sapphire.location}\n🏠 ${KB.projects.sapphire.config}\n📏 ${KB.projects.sapphire.area}\n🏗️ ${KB.projects.sapphire.flats}\n🛣️ ${KB.projects.sapphire.road}\n🧭 ${KB.projects.sapphire.facing}\n\nThis is a premium residential project with excellent specifications and amenities.`,
        chips: [
          { emoji: '📐', label: 'View Flat Dimensions', key: 'flatdims' },
          { emoji: '🔨', label: 'View Specifications', key: 'specs' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      proj_pearl: {
        text: `🔨 UV's Pearl\n\n📍 ${KB.projects.pearl.location}\n📊 Status: ${KB.projects.pearl.status}\n\nOur ongoing premium apartment project. For detailed information about configurations and availability, please contact Pavan Kumar directly.`,
        chips: [
          { emoji: '📞', label: 'Contact Details', key: 'contact' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      proj_new: {
        text: `🔮 New Launch 2025\n\n🎉 Exciting new residential project coming soon!\n\nRegister your interest to be among the first to know about this exclusive launch. Contact us for early booking opportunities and special launch offers!`,
        chips: [
          { emoji: '📞', label: 'Contact Details', key: 'contact' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      flatdims: {
        text: '📐 Flat Dimensions – Sunshine Sapphire\n\nAll 4 flats are 1150 Sq.ft · 2 BHK + Puja Room\n\nSelect a flat to see room-wise dimensions:',
        chips: [
          { emoji: '🔵', label: 'Flat 1 – East Facing', key: 'flat1' },
          { emoji: '🔵', label: 'Flat 2 – East Facing', key: 'flat2' },
          { emoji: '🟢', label: 'Flat 3 – West Facing', key: 'flat3' },
          { emoji: '🟢', label: 'Flat 4 – West Facing', key: 'flat4' },
          { emoji: '🏠', label: 'Back to Main Menu', key: 'main' },
        ],
      },
      flat1: {
        text: `🔵 Flat 1 – East Facing (1150 Sq.ft)\n\n🛏️ Master Bedroom: 13'0" × 9'9"\n🛏️ Child Bedroom: 13'0" × 9'0"\n🏠 Family Living: 14'6" × 10'6"\n🍽️ Dining: 9'0" × 16'0"\n🍳 Kitchen: 10'6" × 8'3"\n🚿 Master Toilet: 4'0" × 5'9"\n🚿 Att. Toilet: 4'6" × 7'0"\n🙏 Puja Room: Dedicated\n🌳 Balcony: 4'3" Wide`,
        chips: [
          { emoji: '📐', label: 'View Other Flats', key: 'flatdims' },
          { emoji: '🔨', label: 'Specifications', key: 'specs' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      flat2: {
        text: `🔵 Flat 2 – East Facing (1150 Sq.ft)\n\n🛏️ Master Bedroom: 13'0" × 9'3"\n🛏️ Child Bedroom: 13'0" × 9'0"\n🏠 Family Living: 14'6" × 10'6"\n🍽️ Dining: 9'0" × 16'0"\n🍳 Kitchen: 10'6" × 8'3"\n🚿 C. Toilet: 7'0" × 4'0"\n🚿 Att. Toilet: 4'6" × 6'6"\n🙏 Puja Room: Dedicated\n🌳 Balcony: 4'3" Wide`,
        chips: [
          { emoji: '📐', label: 'View Other Flats', key: 'flatdims' },
          { emoji: '🔨', label: 'Specifications', key: 'specs' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      flat3: {
        text: `🟢 Flat 3 – West Facing (1150 Sq.ft)\n\n🛏️ Master Bedroom: 15'0" × 9'3"\n🛏️ Child Bedroom: 13'0" × 9'0"\n🏠 Family Living: 15'0" × 9'6"\n🍽️ Dining: 14'6" × 9'6"\n🍳 Kitchen: 11'6" × 8'6"\n🚿 A. Toilet: 6'0" × 9'6"\n🚿 C. Toilet: 5'6" × 5'6"\n🌳 Balcony: 3'9" Wide`,
        chips: [
          { emoji: '📐', label: 'View Other Flats', key: 'flatdims' },
          { emoji: '🔨', label: 'Specifications', key: 'specs' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      flat4: {
        text: `🟢 Flat 4 – West Facing (1150 Sq.ft)\n\n🛏️ Master Bedroom: 13'0" × 9'3"\n🛏️ Child Bedroom: 11'9" × 10'3"\n🏠 Family Living: 14'6" × 9'6"\n🍽️ Dining: 12'0" × 13'3"\n🍳 Kitchen: 11'6" × 8'6"\n🚿 A. Toilet: 6'0" × 9'6"\n🚿 C. Toilet: 5'6" × 5'6"\n🙏 Puja Room: Dedicated\n🌳 Balcony: 3'9" Wide`,
        chips: [
          { emoji: '📐', label: 'View Other Flats', key: 'flatdims' },
          { emoji: '🔨', label: 'Specifications', key: 'specs' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      specs: {
        text: '🔨 Building Specifications\n\nUV Infra uses only premium-grade materials. What would you like to know?',
        chips: [
          { emoji: '🏛️', label: 'Structure & Walls', key: 'spec_struct' },
          { emoji: '🚪', label: 'Doors & Windows', key: 'spec_doors' },
          { emoji: '⬛', label: 'Flooring & Kitchen', key: 'spec_floor' },
          { emoji: '⚡', label: 'Electrical & Extra', key: 'spec_elec' },
          { emoji: '🏠', label: 'Back to Main Menu', key: 'main' },
        ],
      },
      spec_struct: {
        text: `🏛️ Structure & Walls\n\n✓ Foundation: RCC Framed Structure, M25 grade concrete, seismic resistant\n✓ Outer Walls: 9" thick country red brick with cement mortar\n✓ Inner Walls: 4½" thick country red brick with cement mortar\n✓ Plastering: Cement mortar, two coats, sponge finish inside & outside`,
        chips: [
          { emoji: '🚪', label: 'Doors & Windows', key: 'spec_doors' },
          { emoji: '⬛', label: 'Flooring & Kitchen', key: 'spec_floor' },
          { emoji: '⚡', label: 'Electrical & Extra', key: 'spec_elec' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      spec_doors: {
        text: `🚪 Doors & Windows\n\n✓ Main Door: Teak wood frames, teak paneled shutter, brass fittings\n✓ Other Doors: Teak wood frames, flush shutters, SS fittings\n✓ Windows: UPVC with glass, mosquito mesh, safety grills`,
        chips: [
          { emoji: '🏛️', label: 'Structure & Walls', key: 'spec_struct' },
          { emoji: '⬛', label: 'Flooring & Kitchen', key: 'spec_floor' },
          { emoji: '⚡', label: 'Electrical & Extra', key: 'spec_elec' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      spec_floor: {
        text: `⬛ Flooring & Kitchen\n\n✓ Flooring: 2×4 ft Vitrified tiles throughout all rooms\n✓ Kitchen: Polished black granite platform, SS sink, 2ft digital tile dadoing\n✓ Toilets: EWC, anti-skid ceramic flooring, digital tile dadoing to 8'0"\n✓ Painting: Asian Paints Premium Emulsion (interior), Asian Apex Texture (exterior)`,
        chips: [
          { emoji: '🏛️', label: 'Structure & Walls', key: 'spec_struct' },
          { emoji: '🚪', label: 'Doors & Windows', key: 'spec_doors' },
          { emoji: '⚡', label: 'Electrical & Extra', key: 'spec_elec' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      spec_elec: {
        text: `⚡ Electrical & Amenities\n\n✓ Plumbing: CPVC pipes, CERA washbasins, EWC with flush tanks\n✓ Electrical: Concealed copper wiring, Finolex inverter-ready throughout\n✓ Provisions: TV, Fridge, Geyser, AC pre-wired\n✓ Amenities: T-TRANSCO power, Generator backup, Lift, Car parking, CCTV cameras`,
        chips: [
          { emoji: '🏛️', label: 'Structure & Walls', key: 'spec_struct' },
          { emoji: '🚪', label: 'Doors & Windows', key: 'spec_doors' },
          { emoji: '⬛', label: 'Flooring & Kitchen', key: 'spec_floor' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      visit: {
        text: `📅 Site Visit Timings\n\n🕙 Weekdays: ${KB.contact.visitHours.weekdays}\n🕘 Weekends: ${KB.contact.visitHours.weekends}\n\n📝 Please call Pavan Kumar Inturi before visiting for personal guidance and to schedule a convenient time.`,
        chips: [
          { emoji: '📞', label: 'Call Now', key: 'call' },
          { emoji: '💬', label: 'WhatsApp Us', key: 'whatsapp' },
          { emoji: '📝', label: 'Fill Enquiry Form', key: 'form' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      contact: {
        text: `📞 Contact Details\n\n👤 ${KB.contact.name}\n🏢 Promoter & Developer, UV Infra\n\n📱 ${KB.contact.phone1}\n📱 ${KB.contact.phone2}\n📧 ${KB.contact.email}\n📍 ${KB.contact.address}`,
        chips: [
          { emoji: '📞', label: 'Call Now', key: 'call' },
          { emoji: '💬', label: 'WhatsApp Us', key: 'whatsapp' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      call: {
        text: `📞 Calling now...\n\nIf the phone doesn't open, you can also reach us at:\n${KB.contact.phone1}\n${KB.contact.phone2}`,
        chips: [
          { emoji: '💬', label: 'WhatsApp Instead', key: 'whatsapp' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      whatsapp: {
        text: `💬 Opening WhatsApp...\n\nIf WhatsApp doesn't open, message us at:\n${KB.contact.phone1}`,
        chips: [
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      form: {
        text: `📝 Enquiry Form\n\nI've scrolled the page to our Enquiry Form! ⬇️\n\nFill in your details and we'll contact you within 24 hours.`,
        chips: [
          { emoji: '📅', label: 'Visit Timings', key: 'visit' },
          { emoji: '📞', label: 'Contact Details', key: 'contact' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      price: {
        text: `💰 Pricing Information\n\nFor current pricing and payment plans, please contact us directly:\n\n📞 ${KB.contact.phone1}\n📞 ${KB.contact.phone2}\n📧 ${KB.contact.email}\n\nPavan Kumar Inturi will personally discuss the best options for you!`,
        chips: [
          { emoji: '📞', label: 'Call Now', key: 'call' },
          { emoji: '💬', label: 'WhatsApp Us', key: 'whatsapp' },
          { emoji: '📅', label: 'Book Site Visit', key: 'visit' },
          { emoji: '🏠', label: 'Main Menu', key: 'main' },
        ],
      },
      irrelevant: {
        text: `🚫 Not relevant to UV Infra\n\nI can only answer questions about our apartments, projects, specifications, and contact details.\n\nPlease ask something like:\n• "What is the size of Flat 1?"\n• "What are your project specifications?"\n• "How do I book a site visit?"`,
        chips: MAIN_MENU,
      },
    };

    return responses[key] || responses.irrelevant;
  };

  const handleChipClick = (key: string) => {
    setCurrentChips([]);

    if (key === 'call') {
      addMessage('📞 Call Now', 'user');
      window.open('tel:+917386086043');
      setTimeout(() => {
        const response = getResponse('call');
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }, 600);
    } else if (key === 'whatsapp') {
      addMessage('💬 WhatsApp Us', 'user');
      window.open(
        'https://wa.me/917386086043?text=Hi%2C%20I%20am%20interested%20in%20UV%20Infra%20apartments.%20Please%20share%20details.',
        '_blank'
      );
      setTimeout(() => {
        const response = getResponse('whatsapp');
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }, 600);
    } else if (key === 'form') {
      addMessage('📝 Fill Enquiry Form', 'user');
      const element = document.getElementById('enquiry');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        const response = getResponse('form');
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }, 600);
    } else if (key === 'bye') {
      setIsChatEnded(true);
    } else {
      const chipLabel = currentChips.find(c => c.key === key)?.label || '';
      addMessage(chipLabel, 'user');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const response = getResponse(key);
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }, 600);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    setInputValue('');
    setCurrentChips([]);
    setIsLoading(true);

    setTimeout(() => {
      const keyword = matchKeyword(inputValue);

      if (keyword === 'bye') {
        setIsLoading(false);
        setIsChatEnded(true);
      } else if (keyword) {
        setIsLoading(false);
        const response = getResponse(keyword);
        addMessage(response.text, 'bot');
        showChips(response.chips);
      } else {
        setIsLoading(false);
        const response = getResponse('irrelevant');
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }
    }, 600);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        const response = getResponse('welcome');
        addMessage(response.text, 'bot');
        showChips(response.chips);
      }, 300);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentChips([]);
    setIsChatEnded(false);
    setInputValue('');
    setTimeout(() => {
      const response = getResponse('welcome');
      addMessage(response.text, 'bot');
      showChips(response.chips);
    }, 300);
  };

  return (
    <>
      {/* Chat Launcher Button */}
      <button
        onClick={handleOpen}
        className="fixed z-[9999] rounded-full bg-gradient-to-br from-blue-500 to-blue-900 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center
          w-14 h-14 bottom-4 right-4
          md:w-16 md:h-16 md:bottom-7 md:right-7"
        aria-label="Open UV Infra Chat"
      >
        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
        {!isOpen && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed z-[9998] bg-white rounded-2xl shadow-2xl flex flex-col border border-blue-200 overflow-hidden
          w-[calc(100vw-32px)] max-h-[calc(100vh-200px)] bottom-20 right-4 max-w-sm
          sm:w-[calc(100vw-32px)] sm:max-h-[calc(100vh-200px)] sm:bottom-20 sm:right-4
          md:w-96 md:max-h-[600px] md:bottom-28 md:right-8
          lg:w-[400px] lg:max-h-[680px] lg:bottom-28 lg:right-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg">🏠</div>
              <div>
                <p className="font-bold text-sm">UV Infra Assistant</p>
                <p className="text-xs text-blue-100">🟢 Online · Replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold hover:opacity-80 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-blue-50 p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-lg border border-blue-200">
                    🏠
                  </div>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.type === 'bot'
                      ? 'bg-white border border-blue-200 text-gray-800'
                      : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-br-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-lg border border-blue-200">
                  🏠
                </div>
                <div className="bg-white border border-blue-200 px-4 py-2 rounded-lg flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chips */}
          {currentChips.length > 0 && !isChatEnded && (
            <div className="flex flex-wrap gap-2 px-4 py-3 bg-blue-50 border-t border-blue-200">
              {currentChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => handleChipClick(chip.key)}
                  className="px-3 py-1 text-xs font-bold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition whitespace-nowrap"
                >
                  {chip.emoji && `${chip.emoji} `}
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* End Chat Banner */}
          {isChatEnded && (
            <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-t border-blue-200">
              <div className="text-center">
                <p className="font-bold text-gray-800 mb-2">🙏 Thank you for contacting UV Infra!</p>
                <p className="text-sm text-gray-600 mb-2">We'll be in touch soon.</p>
                <p className="text-sm font-semibold text-blue-600">📞 +91 73860 86043 (Pavan Kumar Inturi)</p>
              </div>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition"
              >
                💬 Start New Chat
              </button>
            </div>
          )}

          {/* Input Area */}
          {!isChatEnded && (
            <div className="flex gap-2 p-4 bg-white border-t border-blue-200">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a question..."
                className="flex-1 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center flex-shrink-0"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
