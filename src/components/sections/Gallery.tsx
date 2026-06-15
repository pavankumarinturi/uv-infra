'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Residential Complex Overview',
    category: 'exterior',
    image: '🏘️',
    description: 'Panoramic view of our flagship residential complex',
  },
  {
    id: '2',
    title: 'Modern Architecture',
    category: 'exterior',
    image: '🏢',
    description: 'Contemporary architectural design with premium finishes',
  },
  {
    id: '3',
    title: 'Community Gardens',
    category: 'amenities',
    image: '🌳',
    description: 'Lush green spaces and landscaped gardens for residents',
  },
  {
    id: '4',
    title: 'Swimming Pool',
    category: 'amenities',
    image: '🏊',
    description: 'Olympic-size swimming pool with modern facilities',
  },
  {
    id: '5',
    title: 'Fitness Center',
    category: 'amenities',
    image: '💪',
    description: 'State-of-the-art gymnasium with latest equipment',
  },
  {
    id: '6',
    title: 'Modern Kitchen',
    category: 'interior',
    image: '🍳',
    description: 'Premium modular kitchen with high-end appliances',
  },
  {
    id: '7',
    title: 'Living Room',
    category: 'interior',
    image: '🛋️',
    description: 'Spacious and elegant living areas with natural light',
  },
  {
    id: '8',
    title: 'Master Bedroom',
    category: 'interior',
    image: '🛏️',
    description: 'Luxurious bedrooms with modern amenities',
  },
  {
    id: '9',
    title: 'Kids Play Area',
    category: 'amenities',
    image: '🎪',
    description: 'Safe and fun recreational space for children',
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
          Explore our residential projects and amenities
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
              className="h-64 bg-gradient-to-br from-blue-300 to-primary rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer flex items-center justify-center group relative"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">{image.image}</div>
                  <p className="font-semibold text-white text-sm md:text-base">{image.title}</p>
                </div>
              </div>
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
            {/* Image Display */}
            <div className="bg-gradient-to-br from-blue-200 to-primary rounded-xl p-12 flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-9xl mb-4">{selectedImage.image}</div>
                <p className="text-dark font-semibold">{selectedImage.title}</p>
              </div>
            </div>

            {/* Image Information */}
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2">Category</p>
              <p className="text-dark font-semibold mb-4">
                {categoryLabels[selectedImage.category]}
              </p>

              <p className="text-gray-500 text-sm font-semibold mb-2">Description</p>
              <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(
                    (img) => img.id === selectedImage.id
                  );
                  if (currentIndex > 0) {
                    setSelectedImage(filteredImages[currentIndex - 1]);
                  }
                }}
                disabled={
                  filteredImages.findIndex((img) => img.id === selectedImage.id) === 0
                }
                className="bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const currentIndex = filteredImages.findIndex(
                    (img) => img.id === selectedImage.id
                  );
                  if (currentIndex < filteredImages.length - 1) {
                    setSelectedImage(filteredImages[currentIndex + 1]);
                  }
                }}
                disabled={
                  filteredImages.findIndex((img) => img.id === selectedImage.id) ===
                  filteredImages.length - 1
                }
                className="bg-primary text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>

            {/* Counter */}
            <p className="text-center text-gray-500 text-sm">
              {filteredImages.findIndex((img) => img.id === selectedImage.id) + 1} of{' '}
              {filteredImages.length}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}
