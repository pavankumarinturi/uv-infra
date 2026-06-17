# UV Infra Chatbot — Complete Implementation Guide

> **Status:** Ready to implement · No backend needed · Works on static HTML  
> **Tech:** Pure JavaScript + Claude AI API (optional) + EmailJS  
> **Time to implement:** 30–45 minutes

---

## 📁 Files You Need

| File | Purpose |
|------|---------|
| `index.html` | Your main website — chatbot is injected here |
| `CHATBOT.md` | This guide |

---

## 🏗️ Architecture Overview

```
Customer opens website
        │
        ▼
Blue chat bubble (bottom-right corner)
        │
  Customer clicks
        │
        ▼
┌─────────────────────────────────┐
│   UV Infra Chat Window          │
│                                 │
│  🏠 Welcome message             │
│                                 │
│  Option chips (always shown):   │
│  🏢 Our Projects                │
│  📐 Flat Dimensions             │
│  🔨 Specifications              │
│  📅 Book a Site Visit           │
│  📞 Contact Details             │
│                                 │
│  [Customer selects or types]    │
│         │                       │
│    ┌────┴────────────┐          │
│    ▼                ▼          │
│  Chip selected   Free text      │
│    │                │           │
│    ▼                ▼           │
│  Instant        Keyword match   │
│  response       (offline)       │
│                    │            │
│              No match found?    │
│                    │            │
│                    ▼            │
│             Claude AI API       │
│             (relevant check)    │
│                    │            │
│            ┌───────┴──────┐    │
│            ▼              ▼    │
│        Relevant        Irrelevant│
│        → Answer        → 🚫 msg │
│                                 │
│  [End Chat → Thank You banner]  │
└─────────────────────────────────┘
```

---

## 📋 Section 1 — Chatbot Features Specification

### 1.1 Visual Design

```
Position:    Fixed, bottom-right corner (bottom: 28px, right: 28px)
Launcher:    60px circle, blue gradient (#2563EB → #1E3A8A)
Window:      370px wide, max 580px tall
             White background, blue border (#BFDBFE)
             Rounded corners (border-radius: 20px)
             Smooth slide-up animation on open
Header:      Blue gradient bar with 🏠 avatar, name, online status, close button
Messages:    Light blue (#F8FAFF) scrollable area
Chips:       White buttons with blue border, hover fills blue
Input:       Pill-shaped text input + send button
End banner:  Green thank-you card with restart option
```

### 1.2 Conversation Flow

```
OPEN CHAT
    │
    ▼
Welcome message (auto)
    │
    ▼
5 Main Menu chips shown
    │
    ├── 🏢 Our Projects
    │       ├── ✅ Sunshine Sapphire  → full project details + sub-chips
    │       ├── 🔨 UV's Pearl         → ongoing project info + contact chips
    │       └── 🔮 New Launch 2025    → register interest + contact
    │
    ├── 📐 Flat Dimensions
    │       ├── Flat 1 – East Facing  → all room dimensions
    │       ├── Flat 2 – East Facing  → all room dimensions
    │       ├── Flat 3 – West Facing  → all room dimensions
    │       └── Flat 4 – West Facing  → all room dimensions
    │
    ├── 🔨 Specifications
    │       ├── Structure & Walls     → RCC, M25, brick details
    │       ├── Doors & Windows       → Teak, UPVC details
    │       ├── Flooring & Kitchen    → Vitrified, granite details
    │       └── Electrical & Extras   → Copper wiring, amenities
    │
    ├── 📅 Book a Site Visit
    │       ├── 📞 Call Now           → opens phone dialler
    │       ├── 💬 WhatsApp Us        → opens WhatsApp with pre-filled message
    │       └── 📝 Fill Enquiry Form  → scrolls page to contact form
    │
    └── 📞 Contact Details
            ├── 📞 Call Now
            ├── 💬 WhatsApp Us
            └── 📅 Book Site Visit

AT ANY POINT:
    Type "bye" / "thanks" / "done" → End chat → Thank You banner
    Type irrelevant question        → 🚫 Not relevant message + Main Menu
```

---

## 📋 Section 2 — Knowledge Base (All Data the Bot Knows)

### 2.1 Projects

```
PROJECT 1: Sunshine Sapphire
├── Location:  Ameenpur, Hyderabad – 502032
├── Status:    Completed ✅
├── Config:    2 BHK + Puja Room
├── Area:      1150 Sq.ft per flat
├── Flats:     4 per floor
├── Road:      40'0" Wide Road
├── Facing:    East (Flats 1 & 2) · West (Flats 3 & 4)
└── Balcony:   4'3" Wide (Flats 1&2) · 3'9" Wide (Flats 3&4)

PROJECT 2: UV's Pearl
├── Location:  2Gether Heights (Ekam Block & Dviyam Block), Ameenpur
├── Status:    Ongoing 🔨
└── Config:    Premium Apartments (contact for details)

PROJECT 3: New Launch 2025
├── Status:    Upcoming 🔮
└── Details:   Contact to register interest
```

### 2.2 Flat Dimensions — Sunshine Sapphire

```
FLAT 1 — East Facing (1150 Sq.ft)
├── Master Bedroom:  13'0" × 9'9"
├── Child Bedroom:   13'0" × 9'0"
├── Family Living:   14'6" × 10'6"
├── Dining:          9'0"  × 16'0"
├── Kitchen:         10'6" × 8'3"
├── Master Toilet:   4'0"  × 5'9"
├── Att. Toilet:     4'6"  × 7'0"
├── Puja Room:       Dedicated
└── Balcony:         4'3"  Wide

FLAT 2 — East Facing (1150 Sq.ft)
├── Master Bedroom:  13'0" × 9'3"
├── Child Bedroom:   13'0" × 9'0"
├── Family Living:   14'6" × 10'6"
├── Dining:          9'0"  × 16'0"
├── Kitchen:         10'6" × 8'3"
├── C. Toilet:       7'0"  × 4'0"
├── Att. Toilet:     4'6"  × 6'6"
├── Puja Room:       Dedicated
└── Balcony:         4'3"  Wide

FLAT 3 — West Facing (1150 Sq.ft)
├── Master Bedroom:  15'0" × 9'3"
├── Child Bedroom:   13'0" × 9'0"
├── Family Living:   15'0" × 9'6"
├── Dining:          14'6" × 9'6"
├── Kitchen:         11'6" × 8'6"
├── A. Toilet:       6'0"  × 9'6"
├── C. Toilet:       5'6"  × 5'6"
└── Balcony:         3'9"  Wide

FLAT 4 — West Facing (1150 Sq.ft)
├── Master Bedroom:  13'0" × 9'3"
├── Child Bedroom:   11'9" × 10'3"
├── Family Living:   14'6" × 9'6"
├── Dining:          12'0" × 13'3"
├── Kitchen:         11'6" × 8'6"
├── A. Toilet:       6'0"  × 9'6"
├── C. Toilet:       5'6"  × 5'6"
├── Puja Room:       Dedicated
└── Balcony:         3'9"  Wide
```

### 2.3 Building Specifications

```
STRUCTURE & WALLS
├── Foundation:   RCC Framed Structure, M25 grade concrete, seismic resistant
├── Outer Walls:  9" thick country red brick with cement mortar
├── Inner Walls:  4½" thick country red brick with cement mortar
└── Plastering:   Cement mortar, two coats, sponge finish inside & outside

DOORS & WINDOWS
├── Main Door:    Teak wood frames, teak paneled shutter, brass fittings
├── Other Doors:  Teak wood frames, flush shutters, SS fittings
└── Windows:      UPVC with glass, mosquito mesh, safety grills

FLOORING & KITCHEN
├── Flooring:     2×4 ft Vitrified tiles throughout all rooms
├── Kitchen:      Polished black granite platform, SS sink,
│                 2ft digital tile dadoing, bore & municipal water taps,
│                 provision for cabinets, exhaust fan & chimney
├── Toilets:      EWC, anti-skid ceramic flooring, digital tile dadoing to 8'0"
│                 CERA or equivalent sanitary fittings
└── Painting:     Internal: Asian Paints Premium Emulsion over primer
                  External: Asian Apex Texture finish over primer

ELECTRICAL & AMENITIES
├── Plumbing:     CPVC pipes, CERA washbasins, EWC with flush tanks
├── Electrical:   Concealed copper wiring, TV/fridge/geyser/AC provisions
│                 Inverter-ready Finolex wiring throughout
└── Amenities:    T-TRANSCO power connection, Generator backup, Lift,
                  Car parking, Solar fencing, CCTV cameras
```

### 2.4 Contact Information

```
CONTACT DETAILS
├── Person:    Pavan Kumar Inturi
├── Role:      Promoter & Developer, UV Infra
├── Phone 1:   +91 73860 86043
├── Phone 2:   +91 95059 44456
├── WhatsApp:  https://wa.me/917386086043
├── Email:     Pavankumarinturi@uv-infra.com
├── Website:   https://uv-infra.com
└── Address:   2Gether Heights, Ameenpur, Hyderabad – 502032, Telangana

SITE VISIT TIMINGS
├── Weekdays:  10:00 AM – 6:00 PM
├── Weekends:  9:00 AM – 7:00 PM
└── Note:      Call Pavan Kumar Inturi before visiting for personal guidance
```

---

## 📋 Section 3 — All Chatbot Messages (Exact Text)

### 3.1 Welcome Message
```
👋 Welcome to UV Infra!

I'm your virtual assistant. I can help you with:
• Flat details & dimensions
• Project specifications
• Site visit booking
• Contact information

How can I assist you today?
```

### 3.2 Irrelevant Question Response
```
🚫 Not relevant to UV Infra

I can only answer questions about our apartments,
projects, specifications, and contact details.

Please ask something like:
• "What is the size of Flat 1?"
• "What are your project specifications?"
• "How do I book a site visit?"

[Shows Main Menu chips]
```

### 3.3 End / Thank You Message
```
🙏 Thank you for contacting UV Infra!

We'll be in touch soon. For urgent queries:
📞 +91 73860 86043 (Pavan Kumar Inturi)

[Start New Chat button]
```

### 3.4 Pricing Response (never reveal price, always direct to contact)
```
💰 Pricing Information

For current pricing and payment plans, please
contact us directly:

📞 +91 73860 86043
📞 +91 95059 44456
📧 Pavankumarinturi@uv-infra.com

Pavan Kumar Inturi will personally discuss
the best options for you!
```

---

## 📋 Section 4 — Claude Code Prompt

### PROMPT: Build Complete UV Infra Chatbot

Copy and paste this entire prompt into Claude Code:

---

```
Build a complete floating chatbot widget for the UV Infra real estate
website (index.html). The chatbot must be injected as a self-contained
block just before the closing </body> tag. No external libraries or
frameworks — pure HTML, CSS, and vanilla JavaScript only.

═══════════════════════════════════════════════
VISUAL DESIGN REQUIREMENTS
═══════════════════════════════════════════════

Launcher button:
- Fixed position: bottom-right (bottom: 28px, right: 28px)
- z-index: 9999
- 60px circle, blue gradient (#2563EB → #1E3A8A)
- Box shadow: 0 6px 24px rgba(37,99,235,0.45)
- SVG chat icon (white, 28px)
- Red notification badge (top-right of button, shows "1")
- Scale 1.08 on hover
- aria-label: "Open UV Infra Chat"

Chat window:
- Fixed position: bottom: 100px, right: 28px
- z-index: 9998
- Width: 370px, max-height: 580px
- White background, border: 1px solid #BFDBFE
- border-radius: 20px
- box-shadow: 0 20px 60px rgba(37,99,235,0.18)
- display: none by default; flex-column when open
- Slide-up + fade animation on open (translateY 16px → 0, opacity 0→1)
- Mobile: full width minus 24px padding when viewport < 420px

Header strip:
- Background: linear-gradient(135deg, #2563EB, #1E3A8A)
- 40px circle avatar showing 🏠 emoji, white border
- Bot name: "UV Infra Assistant" (white, 14px, bold)
- Status line: green dot (6px, #4ADE80) + "Online · Replies instantly"
- Close button: ✕, 30px×30px, rgba white background, top-right

Messages area (#bot-messages):
- Background: #F8FAFF
- Flex column, gap 10px, padding 16px 14px
- Overflow-y: auto, smooth scroll
- Custom scrollbar: 4px width, #BFDBFE thumb

Bot message bubble (.bubble.bot):
- White background, border: 1px solid #BFDBFE
- border-radius: 4px 16px 16px 16px (sharp top-left = bot indicator)
- Font size: 13.5px, line-height: 1.55
- Preceded by 28px circle avatar showing 🏠

User message bubble (.bubble.user):
- Background: linear-gradient(135deg, #2563EB, #1D4ED8)
- White text
- border-radius: 16px 16px 4px 16px (sharp bottom-right = user indicator)
- Right-aligned, no avatar

Typing indicator:
- 3 dots, each 7px circle, #60A5FA color
- Bounce animation staggered 0.2s delays
- Same layout as bot bubble

Option chips (.chip-btn):
- Indented (padding-left: 46px to align with messages)
- White background, border: 1.5px solid #2563EB
- color: #2563EB, border-radius: 100px
- Font: 12px bold Inter
- Hover: fills blue, text white
- Disabled state: opacity 0.4 when another option selected
- Flex-wrap so multiple chips wrap to new lines

End-chat banner:
- Background: linear-gradient(135deg, #EFF6FF, #DBEAFE)
- Border-top: 1px solid #BFDBFE
- Centred text with thank-you message and phone number
- "Start New Chat" button (blue, rounded)

Input row:
- White background, border-top: 1px solid #BFDBFE
- Pill-shaped input (#bot-input): placeholder "Type a question..."
- 38px circle send button (#bot-send): blue, white arrow SVG icon
- Enter key triggers send

═══════════════════════════════════════════════
KNOWLEDGE BASE (hardcode this data in JS)
═══════════════════════════════════════════════

PROJECTS:
- Sunshine Sapphire: Completed, Ameenpur Hyderabad 502032,
  2BHK + Puja Room, 1150 sqft, 4 flats/floor, 40ft road,
  East (Flats 1&2), West (Flats 3&4)
- UV's Pearl: Ongoing, 2Gether Heights Ekam & Dviyam Block, Ameenpur
- New Launch 2025: Upcoming, contact for details

FLAT DIMENSIONS (Sunshine Sapphire, all 1150 sqft):
Flat 1 East: MBed 13'0"x9'9", CBed 13'0"x9'0", Living 14'6"x10'6",
             Dining 9'0"x16'0", Kit 10'6"x8'3", MTlot 4'0"x5'9",
             ATlot 4'6"x7'0", Puja, Balcony 4'3"
Flat 2 East: MBed 13'0"x9'3", CBed 13'0"x9'0", Living 14'6"x10'6",
             Dining 9'0"x16'0", Kit 10'6"x8'3", CTlot 7'0"x4'0",
             ATlot 4'6"x6'6", Puja, Balcony 4'3"
Flat 3 West: MBed 15'0"x9'3", CBed 13'0"x9'0", Living 15'0"x9'6",
             Dining 14'6"x9'6", Kit 11'6"x8'6", ATlot 6'0"x9'6",
             CTlot 5'6"x5'6", Balcony 3'9"
Flat 4 West: MBed 13'0"x9'3", CBed 11'9"x10'3", Living 14'6"x9'6",
             Dining 12'0"x13'3", Kit 11'6"x8'6", ATlot 6'0"x9'6",
             CTlot 5'6"x5'6", Puja, Balcony 3'9"

SPECIFICATIONS:
Structure: RCC M25 grade concrete, seismic resistant
Walls: Outer 9" thick, Inner 4.5" thick red brick with CM
Plastering: Cement mortar, two coats, sponge finish
Doors: Main=Teak+brass; Others=Teak+SS flush shutters
Windows: UPVC with glass, mosquito mesh, safety grills
Flooring: 2x4ft Vitrified tiles
Kitchen: Black granite, SS sink, digital tile dadoing, exhaust/chimney
Toilets: EWC, anti-skid ceramic, CERA fittings, dadoing to 8'0"
Painting: Asian Paints Emulsion (interior), Asian Apex Texture (exterior)
Plumbing: CPVC pipes, CERA washbasins, flush tanks
Electrical: Concealed copper, Finolex inverter-ready, AC/TV/geyser provisions
Amenities: T-TRANSCO, Generator, Lift, Car parking, Solar fencing, CCTV

CONTACT:
Name: Pavan Kumar Inturi
Role: Promoter & Developer, UV Infra
Phone1: +91 73860 86043
Phone2: +91 95059 44456
WhatsApp: https://wa.me/917386086043
Email: Pavankumarinturi@uv-infra.com
Website: https://uv-infra.com
Address: 2Gether Heights, Ameenpur, Hyderabad 502032

VISIT TIMINGS:
Weekdays: 10:00 AM – 6:00 PM
Weekends: 9:00 AM – 7:00 PM
Note: Call before visiting for personal guidance

═══════════════════════════════════════════════
MENU STRUCTURE (option chips to show)
═══════════════════════════════════════════════

MAIN MENU (5 options, always show after bot message):
  🏢 Our Projects       → key: projects
  📐 Flat Dimensions    → key: flatdims
  🔨 Specifications     → key: specs
  📅 Book a Site Visit  → key: visit
  📞 Contact Details    → key: contact

SUB-MENU: projects (4 options):
  ✅ Sunshine Sapphire  → key: proj_sapphire
  🔨 UV's Pearl         → key: proj_pearl
  🔮 New Launch 2025    → key: proj_new
  🏠 Back to Main Menu  → key: main

SUB-MENU: flatdims (5 options):
  🔵 Flat 1 – East Facing  → key: flat1
  🔵 Flat 2 – East Facing  → key: flat2
  🟢 Flat 3 – West Facing  → key: flat3
  🟢 Flat 4 – West Facing  → key: flat4
  🏠 Back to Main Menu     → key: main

SUB-MENU: specs (5 options):
  🏛️ Structure & Walls   → key: spec_struct
  🚪 Doors & Windows     → key: spec_doors
  ⬛ Flooring & Kitchen  → key: spec_floor
  ⚡ Electrical & Extra  → key: spec_elec
  🏠 Back to Main Menu   → key: main

AFTER VISIT (4 options):
  📞 Call Now           → opens tel:+917386086043
  💬 WhatsApp Us        → opens wa.me link with pre-filled message
  📝 Fill Enquiry Form  → scrolls page to #contact section
  🏠 Main Menu          → key: main

AFTER CONTACT (4 options):
  📞 Call Now
  💬 WhatsApp Us
  📅 Book Site Visit    → key: visit
  🏠 Main Menu          → key: main

═══════════════════════════════════════════════
EXACT MESSAGES FOR EACH KEY
═══════════════════════════════════════════════

key: welcome
"👋 Welcome to UV Infra!\n\nI'm your virtual assistant. I can help you with:\n• Flat details & dimensions\n• Project specifications\n• Site visit booking\n• Contact information\n\nHow can I assist you today?"
→ show: MAIN MENU chips

key: main
"🏠 Main Menu\n\nWhat would you like to know?"
→ show: MAIN MENU chips

key: projects
"🏢 UV Infra Projects\n\nWe have premium residential projects in Ameenpur, Hyderabad. Which project would you like to know about?"
→ show: projects sub-menu chips

key: proj_sapphire
Show all Sunshine Sapphire details in a clear formatted message
→ show: [View Flat Dimensions, View Specifications, Book Site Visit, Main Menu]

key: proj_pearl
Show UV Pearl ongoing status and contact CTA
→ show: [Contact Details, Book Site Visit, Main Menu]

key: proj_new
Exciting 2025 launch message, register interest CTA
→ show: [Contact Details, Main Menu]

key: flatdims
"📐 Flat Dimensions – Sunshine Sapphire\n\nAll 4 flats are 1150 Sq.ft · 2 BHK + Puja Room\n\nSelect a flat to see room-wise dimensions:"
→ show: flatdims sub-menu chips

key: flat1 / flat2 / flat3 / flat4
Show all room dimensions in emoji-prefixed list format
→ show: [View next flat, Specifications, Book Site Visit, Main Menu]

key: specs
"🔨 Building Specifications\n\nUV Infra uses only premium-grade materials. What would you like to know?"
→ show: specs sub-menu chips

key: spec_struct / spec_doors / spec_floor / spec_elec
Show relevant spec details
→ show: other 3 spec options + Main Menu

key: visit
Show visit timings (weekdays + weekends) and Pavan's phone number
→ show: [Call Now, WhatsApp Us, Fill Enquiry Form, Main Menu]

key: contact
Show full contact card: name, role, both phones, email, address
→ show: [Call Now, WhatsApp Us, Book Site Visit, Main Menu]

key: call
window.open('tel:+917386086043')
Show call confirmation message with both phone numbers
→ show: [WhatsApp Instead, Main Menu]

key: whatsapp
window.open('https://wa.me/917386086043?text=Hi%2C%20I%20am%20interested%20in%20UV%20Infra%20apartments.%20Please%20share%20details.', '_blank')
Show WhatsApp confirmation message
→ show: [Book Site Visit, Main Menu]

key: form
document.getElementById('contact').scrollIntoView({behavior:'smooth'})
"📝 Enquiry Form\n\nI've scrolled the page to our Enquiry Form! ⬇️\n\nFill in your details and we'll contact you within 24 hours."
→ show: [Visit Timings, Contact Details, Main Menu]

key: price
NEVER reveal price. Always say:
"💰 For current pricing and payment plans, please contact:\n\n📞 +91 73860 86043\n📞 +91 95059 44456\n📧 Pavankumarinturi@uv-infra.com\n\nPavan Kumar Inturi will personally discuss the best options for you!"
→ show: [Call Now, WhatsApp Us, Book Site Visit, Main Menu]

key: bye
Show end-chat banner (no message bubble):
Banner text: "🙏 Thank you for contacting UV Infra!\nWe'll be in touch soon.\n📞 +91 73860 86043 (Pavan Kumar Inturi)"
With "💬 Start New Chat" button that resets the conversation

═══════════════════════════════════════════════
FREE TEXT HANDLING (when user types instead of clicking chips)
═══════════════════════════════════════════════

LAYER 1 — Keyword matching (instant, no API call):
  "sunshine" | "sapphire"               → proj_sapphire
  "pearl" | "uv.*pearl"                 → proj_pearl
  "new launch" | "2025" | "upcoming"    → proj_new
  "flat 1" | "flat one" | "east flat"   → flat1
  "flat 2"                              → flat2
  "flat 3" | "west flat"               → flat3
  "flat 4"                              → flat4
  "dimension" | "size" | "bedroom" | "kitchen" | "dining" | "room" → flatdims
  "spec" | "material" | "floor" | "tile" | "paint" | "door" | "window" → specs
  "visit" | "site visit" | "schedule" | "timing" | "when open"          → visit
  "contact" | "phone" | "call" | "whatsapp" | "email" | "pavan"         → contact
  "project" | "apartment" | "flat" | "home" | "house" | "buy"           → projects
  "price" | "cost" | "rate" | "budget" | "payment" | "emi"              → price
  "bye" | "thank" | "exit" | "quit" | "done" | "goodbye"               → bye

LAYER 2 — Claude AI API (only if no keyword matched):
  POST to https://api.anthropic.com/v1/messages
  Model: claude-sonnet-4-6
  Max tokens: 300
  System prompt: (see Section 5 below)
  If response === "IRRELEVANT" → show irrelevant message
  If API errors → show irrelevant message (graceful fallback)

IRRELEVANT MESSAGE (show when question is off-topic):
"🚫 Not relevant to UV Infra\n\nI can only answer questions about our apartments, projects, specifications, and contact details.\n\nPlease ask something like:\n• 'What is the size of Flat 1?'\n• 'What are your project specifications?'\n• 'How do I book a site visit?'"
→ show: MAIN MENU chips

═══════════════════════════════════════════════
BEHAVIOUR RULES
═══════════════════════════════════════════════

1. On open: auto-show welcome message after 300ms delay
2. On chip click: disable ALL chips immediately → add user bubble → 400ms delay → respond
3. Bot response delay: 600–900ms (with typing indicator showing)
4. Typing indicator: 3-dot bounce animation, same layout as bot bubble
5. After end-chat: disable input field and send button
6. Restart: clears all messages, re-shows welcome
7. Badge: hide red notification badge when chat opens
8. Auto-scroll: scroll to bottom after every new message or chip render
9. Every message has a timestamp (HH:MM format, IST)
10. Mobile: window fills most of screen width, chips wrap naturally

═══════════════════════════════════════════════
JAVASCRIPT STRUCTURE
═══════════════════════════════════════════════

Wrap everything in an IIFE:
const uvBot = (() => {
  const KB = { ... }         // knowledge base object
  const MAIN_MENU = [ ... ]  // 5 main options
  const SUB_MENUS = { ... }  // sub-menus by key
  function getResponse(key)  // returns { text, chips } or { end: true }
  async function askClaude(text)  // Claude API call, returns string or null
  function matchKeyword(text)     // regex matching, returns key or null
  // DOM helpers: addMsg, showTyping, removeTyping, renderChips, etc.
  function handleChip(opt)        // chip click handler
  function respond(key)           // show typing → remove → show response
  async function handleFreeText(text)  // keyword → Claude → irrelevant
  return { toggle, start, restart, send }  // public API
})();

═══════════════════════════════════════════════
SECTION 5 — CLAUDE AI SYSTEM PROMPT
(use this exact text as the system prompt in API calls)
═══════════════════════════════════════════════

You are a helpful chatbot assistant for UV Infra, a real estate company
in Hyderabad, India. You ONLY answer questions related to UV Infra's
business.

KNOWLEDGE:
[paste all KB data from Section 2 here in the system prompt]

STRICT RULES:
1. ONLY answer questions about UV Infra projects, flats, specs,
   contact, pricing or site visits.
2. If someone asks ANYTHING not related to UV Infra (e.g. "What is
   Java?", "Who won the cricket match?", "Stock prices?", "Tell me a
   joke"), respond with exactly the word: IRRELEVANT
3. Keep answers concise, friendly and professional.
4. Always mention contact details (+91 73860 86043) when relevant.
5. NEVER reveal pricing — say to contact us for current pricing.
6. Respond in plain text only. No markdown, no asterisks.
7. Maximum 4 sentences per response.

═══════════════════════════════════════════════
SECTION 6 — CSS VARIABLES TO USE
═══════════════════════════════════════════════

/* These match the existing website palette */
--bot-primary:    #2563EB;
--bot-dark:       #1E3A8A;
--bot-light:      #EFF6FF;
--bot-border:     #BFDBFE;
--bot-bg:         #F8FAFF;
--bot-text:       #0F172A;
--bot-muted:      #64748B;
--bot-success:    #4ADE80;
--bot-white:      #FFFFFF;

═══════════════════════════════════════════════
SECTION 7 — WHAT NOT TO DO
═══════════════════════════════════════════════

❌ Do NOT use any external libraries (no jQuery, no Bootstrap)
❌ Do NOT use React, Vue, or any framework
❌ Do NOT create a separate JS file — inject everything in index.html
❌ Do NOT reveal pricing — always direct to Pavan's phone number
❌ Do NOT answer non-UV Infra questions
❌ Do NOT use localStorage or sessionStorage
❌ Do NOT add more than 5 chips at once (max 5 options per response)
❌ Do NOT show main menu chips AND sub-menu chips simultaneously
❌ Do NOT call Claude API for keyword-matched questions (wasted tokens)
```

---

## 📋 Section 5 — Step-by-Step Implementation

### Step 1: Open your project

```bash
cd D:\Learning\uv-infra
code .          # opens VS Code
```

### Step 2: Open Claude Code in the project folder

```bash
claude
```

### Step 3: Paste the prompt from Section 4

Copy the entire prompt block from Section 4 above and paste it at the
Claude Code `>` prompt. Press Enter.

Claude Code will:
- Generate all CSS styles for the chatbot
- Generate the full JavaScript engine
- Inject everything before `</body>` in your `index.html`

### Step 4: Test locally

```bash
# In a new terminal window:
npm run dev      # if Next.js
# OR just open index.html in browser directly
```

Test these scenarios:
- [ ] Click launcher → welcome message appears
- [ ] Click "Our Projects" chip → sub-menu shows
- [ ] Click "Sunshine Sapphire" → full project details shown
- [ ] Click "Flat 1" → all dimensions shown
- [ ] Type "what is the size of flat 3?" → correct answer
- [ ] Type "What is Java?" → irrelevant message shown
- [ ] Type "bye" → thank you banner appears
- [ ] Click "Start New Chat" → resets to welcome
- [ ] Click "Call Now" → phone dialler opens
- [ ] Click "WhatsApp Us" → WhatsApp opens with message
- [ ] Click "Fill Enquiry Form" → page scrolls to form

### Step 5: Deploy

```bash
git add .
git commit -m "Add UV Infra chatbot with AI-powered Q&A"
git push
```

Vercel auto-deploys in ~60 seconds.

---

## 📋 Section 6 — Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Chatbot doesn't appear | CSS z-index conflict | Set `z-index: 9999` on launcher |
| Chips not showing | chips area empty | Check `renderChips()` is called |
| Claude API not working | No API key | Works fine — keyword matching is primary |
| Phone doesn't open on click | Browser blocking | User must allow tel: links |
| WhatsApp not opening | Popup blocked | Tell user to allow popups |
| Form doesn't scroll | Wrong ID | Verify `id="contact"` exists in HTML |
| Chat window off-screen on mobile | Width too wide | Check mobile CSS `max-width: calc(100vw - 24px)` |
| Typing animation doesn't show | Timing issue | Ensure `showTyping()` called before `setTimeout` |

---

## 📋 Section 7 — Future Enhancements (Phase 2)

| Feature | How to implement |
|---------|-----------------|
| Save chat history | `localStorage` — store messages array |
| Lead capture in chat | Ask name + phone in chat, send via EmailJS |
| Multi-language | Add Hindi/Telugu language toggle |
| Image in chat | Show floor plan image inside chat bubble |
| Sound notification | Play subtle chime on bot reply |
| Chat transcript email | Send full chat to Pavan via EmailJS on end |
| Analytics | Track which questions asked most via Vercel Analytics |

---

## 📋 Section 8 — Quick Reference Card

```
CHATBOT QUICK REFERENCE
═══════════════════════════════════
Launcher:   Bottom-right, 60px blue circle
Opens:      370px×580px chat window
Welcome:    Auto-shows on first open
Chips:      Max 5 options per response
Typing:     3-dot bounce, 600-900ms
Free text:  Keyword match → Claude AI → Irrelevant
End chat:   "bye/thanks/done" → thank you banner
Restart:    "Start New Chat" button resets all
═══════════════════════════════════
CONTACT SHORTCUTS
📞 Call Now    → opens tel:+917386086043
💬 WhatsApp    → wa.me/917386086043
📝 Form        → scrolls to #contact
═══════════════════════════════════
IRRELEVANT TRIGGER
Any question not about:
• UV Infra projects
• Flat dimensions
• Specifications
• Pricing (redirect only)
• Contact / visit
→ Shows 🚫 message + main menu
═══════════════════════════════════
```