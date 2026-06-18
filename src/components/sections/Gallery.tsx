'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  icon?: React.ReactNode;
  gradient: string;
  description: string;
}

// SVG icons for amenity cards
const CarParkingIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <rect x="6" y="38" width="68" height="28" rx="6" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3"/>
    <path d="M14 38L22 18h36l8 20" stroke="white" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
    <circle cx="22" cy="66" r="7" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="3"/>
    <circle cx="58" cy="66" r="7" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="3"/>
    <path d="M29 66h22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="30" y="22" width="20" height="14" rx="3" fill="white" fillOpacity="0.3"/>
    <path d="M10 50h8M62 50h8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="62" cy="12" r="10" fill="white" fillOpacity="0.9"/>
    <text x="58" y="16" fontSize="11" fontWeight="900" fill="#1d4ed8" fontFamily="Arial">P</text>
  </svg>
);

const GeneratorIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <rect x="8" y="26" width="64" height="36" rx="7" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3"/>
    <path d="M24 26V18a3 3 0 013-3h26a3 3 0 013 3v8" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
    <polygon points="40,12 30,34 39,34 36,52 52,30 42,30" fill="white" stroke="white" strokeLinejoin="round"/>
    <circle cx="18" cy="58" r="6" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <circle cx="62" cy="58" r="6" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <path d="M24 58h32" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M8 42h10M62 42h10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const EVChargingIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <path d="M10 42L18 24h36l8 18v16H10V42Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="22" cy="60" r="6" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5"/>
    <circle cx="50" cy="60" r="6" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5"/>
    <path d="M28 60h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 44h48" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <polygon points="36,10 26,32 35,32 32,48 46,26 37,26" fill="white"/>
    <path d="M60 32h8a3 3 0 013 3v8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M71 39l-4-5-4 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="67" cy="48" r="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2"/>
  </svg>
);

const CommunityHallIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <path d="M10 66V34L40 12l30 22v32H10Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M4 36l36-26 36 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="28" y="44" width="24" height="22" rx="3" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <rect x="14" y="42" width="12" height="12" rx="2" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2"/>
    <rect x="54" y="42" width="12" height="12" rx="2" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2"/>
    <line x1="40" y1="44" x2="40" y2="66" stroke="white" strokeWidth="1.5" strokeDasharray="3,2"/>
    <path d="M32 20l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GardenIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <ellipse cx="30" cy="28" rx="18" ry="18" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5"/>
    <ellipse cx="50" cy="24" rx="16" ry="16" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5"/>
    <ellipse cx="40" cy="34" rx="14" ry="14" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <line x1="40" y1="46" x2="40" y2="66" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M24 66h32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M32 56l8 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M48 54l-8 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="60" r="4" fill="white" fillOpacity="0.3"/>
    <circle cx="60" cy="58" r="3" fill="white" fillOpacity="0.3"/>
  </svg>
);

const GymIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <rect x="4" y="32" width="14" height="16" rx="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
    <rect x="62" y="32" width="14" height="16" rx="4" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
    <rect x="18" y="26" width="12" height="28" rx="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <rect x="50" y="26" width="12" height="28" rx="4" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2.5"/>
    <line x1="30" y1="40" x2="50" y2="40" stroke="white" strokeWidth="5" strokeLinecap="round"/>
    <circle cx="40" cy="40" r="6" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
    <circle cx="40" cy="18" r="6" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
    <path d="M34 24l-4 8h20l-4-8" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const KidsPlayIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 drop-shadow-lg">
    <line x1="14" y1="8" x2="14" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="66" y1="8" x2="66" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <path d="M14 16l52-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 16L22 42h36L50 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="42" width="36" height="10" rx="3" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5"/>
    <circle cx="40" cy="12" r="5" fill="white" fillOpacity="0.35" stroke="white" strokeWidth="2.5"/>
    <path d="M18 64q22-12 44 0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Residential Complex Overview',
    category: 'exterior',
    image: '🏘️',
    gradient: 'from-blue-400 to-blue-700',
    description: 'Panoramic view of our flagship residential complex',
  },
  {
    id: '2',
    title: 'Modern Architecture',
    category: 'exterior',
    image: '🏢',
    gradient: 'from-indigo-400 to-indigo-700',
    description: 'Contemporary architectural design with premium finishes',
  },
  {
    id: '6',
    title: 'Modern Kitchen',
    category: 'interior',
    image: '🍳',
    gradient: 'from-orange-400 to-orange-700',
    description: 'Premium modular kitchen with high-end appliances',
  },
  {
    id: '7',
    title: 'Living Room',
    category: 'interior',
    image: '🛋️',
    gradient: 'from-amber-400 to-amber-700',
    description: 'Spacious and elegant living areas with natural light',
  },
  {
    id: '8',
    title: 'Master Bedroom',
    category: 'interior',
    image: '🛏️',
    gradient: 'from-violet-400 to-violet-700',
    description: 'Luxurious bedrooms with modern amenities',
  },
  // ── Amenities ──────────────────────────────────────────
  {
    id: 'a1',
    title: 'Covered Car Parking',
    category: 'amenities',
    image: '',
    icon: <CarParkingIcon />,
    gradient: 'from-blue-500 to-blue-800',
    description: 'Dedicated covered parking for every unit with CCTV surveillance',
  },
  {
    id: 'a2',
    title: 'Power Generator',
    category: 'amenities',
    image: '',
    icon: <GeneratorIcon />,
    gradient: 'from-amber-500 to-orange-700',
    description: '100% power backup with silent diesel generators for uninterrupted supply',
  },
  {
    id: 'a3',
    title: 'EV Charging Points',
    category: 'amenities',
    image: '',
    icon: <EVChargingIcon />,
    gradient: 'from-emerald-500 to-green-800',
    description: 'Electric vehicle & e-bike charging stations in the parking area',
  },
  {
    id: 'a4',
    title: 'Community Hall',
    category: 'amenities',
    image: '',
    icon: <CommunityHallIcon />,
    gradient: 'from-purple-500 to-violet-800',
    description: 'Spacious multipurpose hall for celebrations, meetings and social events',
  },
  {
    id: 'a5',
    title: 'Landscaped Gardens',
    category: 'amenities',
    image: '',
    icon: <GardenIcon />,
    gradient: 'from-teal-500 to-green-700',
    description: 'Beautifully maintained green spaces, walking paths and sit-out areas',
  },
  {
    id: 'a6',
    title: 'Fully Equipped Gym',
    category: 'amenities',
    image: '',
    icon: <GymIcon />,
    gradient: 'from-rose-500 to-red-700',
    description: 'Modern gymnasium with cardio machines, weights and trained staff',
  },
  {
    id: 'a7',
    title: "Children's Play Area",
    category: 'amenities',
    image: '',
    icon: <KidsPlayIcon />,
    gradient: 'from-pink-500 to-fuchsia-700',
    description: 'Safe, shaded playground with modern equipment for all ages',
  },
];

const categories = ['all', 'exterior', 'interior', 'amenities'];
const categoryLabels: Record<string, string> = {
  all: 'All Projects',
  exterior: 'Exterior Views',
  interior: 'Interior Designs',
  amenities: 'Amenities',
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
          Gallery
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our residential projects and world-class amenities
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-dark text-white shadow-lg'
                  : 'bg-white text-dark border border-gray-300 hover:border-primary'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`h-64 bg-gradient-to-br ${image.gradient} rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center group relative shadow-md hover:shadow-xl`}
            >
              {image.category === 'amenities' && image.icon ? (
                /* Amenity card — icon + label + description */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="group-hover:scale-110 transition-transform duration-300 mb-3">
                    {image.icon}
                  </div>
                  <p className="font-bold text-white text-base text-center leading-tight">
                    {image.title}
                  </p>
                  <p className="text-white/70 text-xs text-center mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description}
                  </p>
                </div>
              ) : (
                /* Exterior / Interior card — emoji placeholder */
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">{image.image}</div>
                    <p className="font-semibold text-white text-sm md:text-base">{image.title}</p>
                  </div>
                </div>
              )}

              {/* Amenity label badge */}
              {image.category === 'amenities' && (
                <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  Amenity
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title || ''}
      >
        {selectedImage && (
          <div className="space-y-6">
            {/* Image / Icon Display */}
            <div className={`bg-gradient-to-br ${selectedImage.gradient} rounded-xl flex items-center justify-center h-72`}>
              {selectedImage.category === 'amenities' && selectedImage.icon ? (
                <div className="scale-150">{selectedImage.icon}</div>
              ) : (
                <div className="text-center">
                  <div className="text-9xl mb-4">{selectedImage.image}</div>
                  <p className="text-white font-semibold">{selectedImage.title}</p>
                </div>
              )}
            </div>

            {/* Information */}
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">Category</p>
              <p className="text-dark font-semibold mb-4">
                {categoryLabels[selectedImage.category]}
              </p>
              <p className="text-gray-500 text-sm font-semibold mb-1">Description</p>
              <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  const idx = filteredImages.findIndex((img) => img.id === selectedImage.id);
                  if (idx > 0) setSelectedImage(filteredImages[idx - 1]);
                }}
                disabled={filteredImages.findIndex((img) => img.id === selectedImage.id) === 0}
                className="bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const idx = filteredImages.findIndex((img) => img.id === selectedImage.id);
                  if (idx < filteredImages.length - 1) setSelectedImage(filteredImages[idx + 1]);
                }}
                disabled={filteredImages.findIndex((img) => img.id === selectedImage.id) === filteredImages.length - 1}
                className="bg-primary text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm">
              {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} of {filteredImages.length}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}
