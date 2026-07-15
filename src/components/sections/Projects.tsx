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
    price: '₹56 - 66 Lakhs',
    bhk: '2 BHK',
    area: '1,150 sq.ft.',
    amenities: ['Car Parking', 'Power Generator', 'EV Charging Points', 'Security Features'],
    description: 'Modern 2 BHK apartments designed with contemporary architecture and premium amenities. Perfect for young families and professionals.',
    image: '/prem_01.png',
  },
  {
    id: 'project2',
    title: 'Luxury Apartments',
    type: '3 BHK Apartments',
    location: 'Hyderabad, Telangana',
    price: '₹75 - 85 Lakhs',
    bhk: '3 BHK',
    area: '1,650 sq.ft.',
    amenities: ['Private Terrace', 'Modular Kitchen', 'Smart Home Features', 'Concierge Service'],
    description: 'Spacious 3 BHK luxury apartments with state-of-the-art facilities. Designed for the discerning homebuyer.',
    image: '/luxy_01.png',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-3 font-playfair text-center">
          Ongoing Projects
        </h2>
        <p className="text-center text-gray-600 mb-3 max-w-2xl mx-auto">
          Discover our flagship residential projects in Ameenpur, Hyderabad
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-300">
            ✅ Available for Booking
          </span>
          <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full border border-amber-300">
            🏗️ Handover by April 2027
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-40 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                {project.image.startsWith('/') ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary to-dark flex items-center justify-center">
                    <span className="text-6xl">{project.image}</span>
                  </div>
                )}
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
            <div className="rounded-xl overflow-hidden h-56">
              {selectedProject.image.startsWith('/') ? (
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary to-dark flex items-center justify-center">
                  <span className="text-8xl">{selectedProject.image}</span>
                </div>
              )}
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
