'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  bhk: string;
  area: string;
  amenities: string[];
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'project1',
    title: 'Premium Residences',
    type: '2 BHK Apartments',
    location: 'Hyderabad, Telangana',
    price: '₹45 - 55 Lakhs',
    bhk: '2 BHK',
    area: '1,150 sq.ft.',
    amenities: ['Swimming Pool', 'Gymnasium', 'Community Hall', 'Children\'s Play Area', 'Landscaped Gardens'],
    description: 'Modern 2 BHK apartments designed with contemporary architecture and premium amenities. Perfect for young families and professionals.',
    image: '🏢',
  },
  {
    id: 'project2',
    title: 'Luxury Apartments',
    type: '3 BHK Apartments',
    location: 'Hyderabad, Telangana',
    price: '₹65 - 80 Lakhs',
    bhk: '3 BHK',
    area: '1,650 sq.ft.',
    amenities: ['Private Terrace', 'Modular Kitchen', 'Smart Home Features', 'Concierge Service', 'Rooftop Garden'],
    description: 'Spacious 3 BHK luxury apartments with state-of-the-art facilities. Designed for the discerning homebuyer.',
    image: '🏰',
  },
  {
    id: 'project3',
    title: 'Grand Villas',
    type: '4 BHK Villas',
    location: 'Hyderabad, Telangana',
    price: '₹1.2 - 1.5 Cr',
    bhk: '4 BHK',
    area: '3,500 sq.ft.',
    amenities: ['Private Swimming Pool', 'Dedicated Parking', 'Home Theater', 'Landscaped Gardens', 'Security Features'],
    description: 'Magnificent 4 BHK villas offering unparalleled luxury and exclusivity. Every detail crafted to perfection.',
    image: '🏛️',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
          Our Projects
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our flagship residential projects across Hyderabad
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-40 bg-gradient-to-r from-primary to-dark rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-6xl">{project.image}</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2 font-playfair">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{project.type}</p>
              <p className="text-primary font-semibold text-sm mb-4">{project.price}</p>
              <div className="text-sm text-gray-700 mb-4">
                <p>📍 {project.location}</p>
                <p>📐 {project.area}</p>
              </div>
              <button className="text-sm text-primary font-semibold hover:text-dark transition">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Image */}
            <div className="bg-gradient-to-r from-primary to-dark rounded-xl p-12 flex items-center justify-center">
              <span className="text-8xl">{selectedProject.image}</span>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Type</p>
                <p className="text-dark font-semibold text-lg">{selectedProject.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Price</p>
                <p className="text-primary font-semibold text-lg">{selectedProject.price}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Area</p>
                <p className="text-dark font-semibold text-lg">{selectedProject.area}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Configuration</p>
                <p className="text-dark font-semibold text-lg">{selectedProject.bhk}</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2">Location</p>
              <p className="text-dark">{selectedProject.location}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2">About This Project</p>
              <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-3">Amenities</p>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow">
              Schedule a Visit
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
