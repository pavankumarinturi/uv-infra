'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const phoneNumber = '917386086043'; // Replace with your WhatsApp number
  const message = encodeURIComponent(
    'Hi! I am interested in learning more about UV Infra projects. Please provide more details.'
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl border border-green-200 max-w-xs animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg">Chat with us!</h3>
            <p className="text-sm text-green-100">We typically reply within minutes</p>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Hours:</strong> Mon-Sat 9AM - 6PM, Sun 10AM - 4PM
              </p>
              <p className="text-xs text-gray-600">
                For urgent matters, call us directly at <strong>+91-73860 86043</strong>
              </p>
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.771.966-.944 1.165-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006c-1.052 0-2.082.402-2.847 1.12-.735.71-1.14 1.656-1.14 2.676 0 1.052.405 2.07 1.12 2.84.745.8 1.774 1.24 2.877 1.24h.005c1.048 0 2.074-.403 2.845-1.12.745-.81 1.148-1.656 1.148-2.676 0-1.052-.405-2.07-1.12-2.84-.743-.795-1.772-1.24-2.878-1.24Z" />
              </svg>
              Start Chat
            </button>

            <p className="text-xs text-gray-500 text-center">
              Or call us: <a href="tel:+917386086043" className="text-green-600 font-semibold hover:underline">
                +91-73860 86043
              </a>
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full border-t border-gray-200 text-gray-600 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
        title="Chat with us on WhatsApp"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.771.966-.944 1.165-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006c-1.052 0-2.082.402-2.847 1.12-.735.71-1.14 1.656-1.14 2.676 0 1.052.405 2.07 1.12 2.84.745.8 1.774 1.24 2.877 1.24h.005c1.048 0 2.074-.403 2.845-1.12.745-.81 1.148-1.656 1.148-2.676 0-1.052-.405-2.07-1.12-2.84-.743-.795-1.772-1.24-2.878-1.24Z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs rounded px-3 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>

        {/* Pulse Animation */}
        <span className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></span>
      </button>
    </div>
  );
}
