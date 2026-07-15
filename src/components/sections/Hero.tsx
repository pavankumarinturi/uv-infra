'use client';

import { useState, useEffect, useRef } from 'react';
import BookVisitModal from './BookVisitModal';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-blue-100 to-background flex items-center justify-center"
    >
      {/* Decorative dot grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage:
            'radial-gradient(circle, #2563EB 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Soft radial glow circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Pill badge with pulsing dot */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Now Booking · Ameenpur, Hyderabad
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 font-playfair leading-tight">
              Build Your{' '}
              <span className="italic text-primary">Dream Home</span> With
              Confidence
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
              UV Infra delivers premium residential apartments across Hyderabad —
              quality construction, thoughtful design, and transparent dealings
              from foundation to key handover.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-dark transition-colors duration-200 font-semibold text-lg">
                Explore Projects
              </button>
              <button
                onClick={() => setShowBookModal(true)}
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold text-lg"
              >
                Schedule a Visit
              </button>
            </div>

            {/* Stats bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  10+
                </div>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  500+
                </div>
                <p className="text-sm text-gray-600">Happy Families</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  15+
                </div>
                <p className="text-sm text-gray-600">Projects Done</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  5★
                </div>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right column - Info panel */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Card header with gradient */}
              <div className="h-32 bg-gradient-to-r from-primary to-dark relative">
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-bold text-white font-playfair mb-1">
                    Sunshine Sapphire
                  </h3>
                  <p className="text-blue-100 text-sm">Ameenpur, Hyderabad</p>
                </div>
                {/* Available badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Available
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 space-y-4">
                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Configuration', value: '2BHK' },
                    { label: 'Super Built-up Area', value: '1150 sq.ft' },
                    { label: 'Facing Options', value: 'East & West' },
                    { label: 'Road Width', value: '33 feet' },
                    { label: 'Structure', value: 'RCC M25' },
                    { label: 'Flooring', value: 'Vitrified' },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200"
                    >
                      <p className="text-xs text-gray-600 mb-1 font-semibold">
                        {spec.label}
                      </p>
                      <p className="text-sm font-bold text-dark">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Card footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div>
                    <p className="text-sm text-gray-600">Call to Enquire</p>
                    <p className="text-lg font-bold text-primary">
                      +91 73860 86043
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBookModal(true)}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-semibold text-sm whitespace-nowrap"
                  >
                    Book Visit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {showBookModal && <BookVisitModal onClose={() => setShowBookModal(false)} />}
    </>
  );
}
