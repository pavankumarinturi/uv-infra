const amenities = [
  {
    id: 'car-parking',
    title: 'Covered Car Parking',
    description: 'Dedicated covered parking spaces for every unit with CCTV surveillance.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="28" width="56" height="24" rx="4" fill="white" fillOpacity="0.2"/>
        <path d="M10 28L16 14h32l6 14" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
        <rect x="4" y="28" width="56" height="24" rx="4" stroke="white" strokeWidth="2.5"/>
        <circle cx="18" cy="52" r="5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <circle cx="46" cy="52" r="5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <path d="M23 52h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <rect x="26" y="18" width="12" height="10" rx="1.5" fill="white" fillOpacity="0.4"/>
        <path d="M10 38h6M48 38h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="29" y="36" fontSize="9" fontWeight="bold" fill="white" fontFamily="Arial">P</text>
      </svg>
    ),
  },
  {
    id: 'generator',
    title: 'Power Generator',
    description: '100% power backup with silent diesel generators for uninterrupted supply.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="20" width="48" height="30" rx="5" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5"/>
        <path d="M20 20V14a2 2 0 012-2h20a2 2 0 012 2v6" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <polygon points="32,10 26,26 31,26 29,38 38,22 32,22" fill="white"/>
        <circle cx="16" cy="46" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <circle cx="48" cy="46" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <path d="M24 46h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 35h6M50 35h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'ev-charging',
    title: 'EV Charging Points',
    description: 'Dedicated electric vehicle & e-bike charging stations in the parking area.',
    color: 'from-green-500 to-emerald-700',
    bg: 'bg-green-50',
    border: 'border-green-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 34L14 20h28l6 14v12H8V34Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="18" cy="48" r="5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <circle cx="38" cy="48" r="5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <path d="M23 48h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 36h36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M48 26h6a2 2 0 012 2v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M56 30l-3-4-3 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polygon points="31,10 25,26 30,26 28,36 37,20 31,20" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'community-hall',
    title: 'Community Hall',
    description: 'Spacious multipurpose hall for celebrations, meetings, and social gatherings.',
    color: 'from-purple-500 to-violet-700',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 52V28L32 10l24 18v24H8Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M4 30l28-20 28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="24" y="36" width="16" height="16" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <rect x="13" y="34" width="9" height="8" rx="1.5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
        <rect x="42" y="34" width="9" height="8" rx="1.5" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
        <line x1="32" y1="36" x2="32" y2="52" stroke="white" strokeWidth="1.5"/>
        <path d="M20 16l4-4 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'gymnasium',
    title: 'Fully Equipped Gym',
    description: 'Modern gymnasium with cardio machines, weights and trained staff.',
    color: 'from-red-500 to-rose-700',
    bg: 'bg-red-50',
    border: 'border-red-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="27" width="10" height="10" rx="3" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="2.5"/>
        <rect x="50" y="27" width="10" height="10" rx="3" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="2.5"/>
        <rect x="14" y="23" width="8" height="18" rx="3" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <rect x="42" y="23" width="8" height="18" rx="3" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <line x1="22" y1="32" x2="42" y2="32" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="5" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
        <circle cx="32" cy="16" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <path d="M28 20l-4 6h16l-4-6" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'gardens',
    title: 'Landscaped Gardens',
    description: 'Beautifully maintained green spaces, walking paths and sit-out areas.',
    color: 'from-teal-500 to-green-700',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <ellipse cx="24" cy="24" rx="14" ry="14" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
        <ellipse cx="40" cy="20" rx="12" ry="12" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
        <ellipse cx="32" cy="28" rx="10" ry="10" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
        <line x1="32" y1="36" x2="32" y2="54" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 54h24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M26 46l6 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 44l-6 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'kids-play',
    title: "Children's Play Area",
    description: 'Safe, shaded playground with modern equipment for kids of all ages.',
    color: 'from-pink-500 to-fuchsia-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <line x1="12" y1="8" x2="12" y2="56" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="8" x2="52" y2="56" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <path d="M12 14l40-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 14L20 32h24L40 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="20" y="32" width="24" height="8" rx="2" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <circle cx="32" cy="10" r="4" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="2"/>
        <path d="M16 52q16-8 32 0" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'cctv',
    title: '24/7 CCTV Security',
    description: 'Round-the-clock surveillance with trained security personnel at entry points.',
    color: 'from-slate-500 to-gray-700',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="32" cy="28" r="14" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2.5"/>
        <circle cx="32" cy="28" r="8" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
        <circle cx="32" cy="28" r="3" fill="white"/>
        <path d="M12 10l8 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <rect x="4" y="6" width="16" height="10" rx="3" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
        <line x1="32" y1="42" x2="32" y2="54" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 54h24" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M44 18c3 3 5 7 5 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M49 13c5 5 8 11 8 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
            World-Class Facilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair">
            Premium Amenities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Every detail designed to elevate your daily living experience at UV Infra.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className={`group relative bg-white rounded-2xl p-6 border ${amenity.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Subtle background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${amenity.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${amenity.color} mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {amenity.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-dark mb-2 leading-snug">
                {amenity.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {amenity.description}
              </p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${amenity.color} transition-all duration-500 rounded-b-2xl`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 bg-gradient-to-r from-primary to-dark rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-playfair mb-1">
              Experience it in person
            </h3>
            <p className="text-blue-200 text-sm">
              Book a site visit and walk through all amenities with our team.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            Schedule a Visit →
          </a>
        </div>
      </div>
    </section>
  );
}
