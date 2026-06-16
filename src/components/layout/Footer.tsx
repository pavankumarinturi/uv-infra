'use client';

import { CONTACT_INFO } from '@/lib/emailjs-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-100">
      {/* Main Footer Content - Blue Section */}
      <div className="bg-[#1a3a7a] py-12 px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            {/* Column 1: Promoters & Developers */}
            <div>
              <p className="text-xs text-primary uppercase font-semibold tracking-wider mb-2">Promoters & Developers</p>
              <h3 className="text-sm font-bold text-white mb-2">UV Infra — Builders & Developers</h3>
              <div className="space-y-0.5 text-xs text-gray-300">
                <p>{CONTACT_INFO.phones[0]}</p>
                <p>{CONTACT_INFO.phones[1]}</p>
              </div>
            </div>

            {/* Column 2: Logo & Brand */}
            <div className="flex flex-col items-center justify-start">
              <div className="flex items-center gap-2.5">
                <img src="/footer-logo.png" alt="UV INFRA Logo" className="w-12 h-12 flex-shrink-0" />
                <div>
                  <div className="text-base font-bold text-white font-playfair leading-tight">UV INFRA</div>
                  <div className="text-xs text-primary font-inter tracking-wider">BUILDERS & DEVELOPERS</div>
                </div>
              </div>
            </div>

            {/* Column 3: Contact Us */}
            <div>
              <p className="text-xs text-primary uppercase font-semibold tracking-wider mb-2">Contact Us</p>
              <div className="space-y-1.5">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-0.5">Phone</p>
                  <a
                    href={`tel:${CONTACT_INFO.phones[0].replace(/\s/g, '')}`}
                    className="text-xs text-gray-300 hover:text-primary transition-colors"
                  >
                    {CONTACT_INFO.phones[0]}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-0.5">Email</p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-xs text-gray-300 hover:text-primary transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Site Address */}
            <div>
              <p className="text-xs text-primary uppercase font-semibold tracking-wider mb-2">Site Address</p>
              <div className="text-xs text-gray-300 space-y-0.5">
                <p>2Gether Heights, Ameenpur</p>
                <p>Hyderabad – 502032</p>
                <p>Telangana, India</p>
              </div>
            </div>
          </div>
        </div>

      {/* Bottom Bar - Dark Blue/Black Section */}
      <div className="bg-[#0f1a2e] border-t border-gray-700 px-12">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {currentYear} UV Infra – Builders & Developers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs">
                Projects
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs">
                Specifications
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors text-xs">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
