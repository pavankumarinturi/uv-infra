'use client';

import { useState, useEffect } from 'react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Specifications', href: '#specifications' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll event for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active section tracking
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection('#' + entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* SVG House Icon */}
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            {/* Logo Text */}
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-dark font-playfair">UV INFRA</div>
              <div className="text-xs text-primary font-inter">Builders & Developers</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Enquire Now Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-dark transition-colors duration-200 font-medium text-sm"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div
              className={`h-0.5 w-6 bg-dark transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <div
              className={`h-0.5 w-6 bg-dark transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <div
              className={`h-0.5 w-6 bg-dark transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4 space-y-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href
                    ? 'text-primary font-semibold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-dark transition-colors duration-200 font-medium text-center text-sm mt-4"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
