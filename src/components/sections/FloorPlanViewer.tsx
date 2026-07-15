'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import BookVisitModal from './BookVisitModal';

interface FloorPlan {
  id: string;
  name: string;
  bhk: string;
  area: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  facing: string;
  features: string[];
}

const floorPlans: FloorPlan[] = [
  {
    id: '2bhk',
    name: '2 BHK Floor Plan',
    bhk: '2 BHK',
    area: '1,150 sq.ft.',
    price: '₹56 - 66 Lakhs',
    bedrooms: 2,
    bathrooms: 2,
    facing: 'East & West',
    features: [
      'Master bedroom with attached bathroom',
      'Spacious living & dining area',
      'Modular kitchen',
      'Utility room',
      'Balcony with city view',
      'Parking space',
    ],
  },
  {
    id: '3bhk',
    name: '3 BHK Floor Plan',
    bhk: '3 BHK',
    area: '1,650 sq.ft.',
    price: '₹75 - 85 Lakhs',
    bedrooms: 3,
    bathrooms: 2,
    facing: 'North & South',
    features: [
      'Master bedroom with attached bathroom & balcony',
      'Two spacious guest bedrooms',
      'Large living & dining area',
      'Premium modular kitchen',
      'Separate utility & laundry area',
      'Two parking spaces',
    ],
  },
];

function downloadPDF(plan: FloorPlan) {
  const win = window.open('', '_blank');
  if (!win) return;

  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${plan.name} – UV Infra</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; color: #1a1a2e; padding: 40px; max-width: 720px; margin: auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1d4ed8; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-size: 22px; font-weight: bold; color: #1d4ed8; letter-spacing: 1px; }
    .brand-sub { font-size: 11px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; }
    .date { font-size: 11px; color: #64748b; text-align: right; }
    h1 { font-size: 28px; color: #1a1a2e; margin-bottom: 4px; }
    .price { font-size: 18px; color: #1d4ed8; font-weight: bold; margin-bottom: 20px; }
    .specs { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .spec-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 14px; }
    .spec-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-family: Arial, sans-serif; margin-bottom: 4px; }
    .spec-value { font-size: 15px; font-weight: bold; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-family: Arial, sans-serif; margin-bottom: 12px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    .features { list-style: none; }
    .features li { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .features li::before { content: "✓"; color: #1d4ed8; font-weight: bold; flex-shrink: 0; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 2px solid #1d4ed8; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; font-family: Arial, sans-serif; }
    .footer strong { color: #1a1a2e; }
    @media print {
      body { padding: 20px; }
      @page { margin: 1cm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">UV INFRA</div>
      <div class="brand-sub">Builders &amp; Developers</div>
    </div>
    <div class="date">Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
  </div>

  <h1>${plan.name}</h1>
  <p class="price">${plan.price}</p>

  <div class="specs">
    <div class="spec-box"><div class="spec-label">Area</div><div class="spec-value">${plan.area}</div></div>
    <div class="spec-box"><div class="spec-label">Facing</div><div class="spec-value">${plan.facing}</div></div>
    <div class="spec-box"><div class="spec-label">Bedrooms</div><div class="spec-value">${plan.bedrooms}</div></div>
    <div class="spec-box"><div class="spec-label">Bathrooms</div><div class="spec-value">${plan.bathrooms}</div></div>
  </div>

  <h2>Complete Features</h2>
  <ul class="features">
    ${plan.features.map(f => `<li>${f}</li>`).join('')}
  </ul>

  <div class="footer">
    <div><strong>📍 Site Address</strong><br/>2Gether Heights, UV's Pearl, Ameenpur, Hyderabad – 502032</div>
    <div style="text-align:right"><strong>📞 Contact Us</strong><br/>+91-73860 86043<br/>+91-9505944456</div>
  </div>
</body>
</html>`);

  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 400);
}

export default function FloorPlanViewer() {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);
  const [activeTab, setActiveTab] = useState<string>('2bhk');
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingPlan, setBookingPlan] = useState<string>('');

  return (
    <section id="floor-plans" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
          Floor Plans
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Thoughtfully designed layouts for modern living
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {floorPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                setActiveTab(plan.id);
                setSelectedPlan(plan);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === plan.id
                  ? 'bg-gradient-to-r from-primary to-dark text-white shadow-lg'
                  : 'bg-white text-dark border border-gray-300 hover:border-primary'
              }`}
            >
              {plan.bhk}
            </button>
          ))}
        </div>

        {/* Floor Plan Display */}
        <div className="bg-white rounded-2xl p-8 border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Floor Plan Image */}
            <div className="flex flex-col items-center justify-center">
              <div className="h-96 w-full bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">📐</div>
                  <p className="text-dark font-semibold">Interactive Floor Plan</p>
                  <p className="text-gray-600 text-sm mt-2">Click "View Details" to explore</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlan(floorPlans.find((p) => p.id === activeTab) || null)}
                className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-shadow"
              >
                View Details & 3D Model
              </button>
            </div>

            {/* Floor Plan Details */}
            <div>
              {activeTab &&
                floorPlans
                  .filter((p) => p.id === activeTab)
                  .map((plan) => (
                    <div key={plan.id} className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-dark mb-2 font-playfair">{plan.name}</h3>
                        <p className="text-primary font-semibold text-lg">{plan.price}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-gray-500 text-xs font-semibold">AREA</p>
                          <p className="text-dark font-bold text-lg">{plan.area}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-gray-500 text-xs font-semibold">FACING</p>
                          <p className="text-dark font-bold text-lg">{plan.facing}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-gray-500 text-xs font-semibold">BEDROOMS</p>
                          <p className="text-dark font-bold text-lg">{plan.bedrooms}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-gray-500 text-xs font-semibold">BATHROOMS</p>
                          <p className="text-dark font-bold text-lg">{plan.bathrooms}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-dark mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-primary font-bold mt-1">✓</span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => { setBookingPlan(plan.name); setShowBookModal(true); }}
                        className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        Schedule a Site Visit
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {showBookModal && (
        <BookVisitModal
          initialProject={bookingPlan}
          onClose={() => setShowBookModal(false)}
        />
      )}

      {/* Floor Plan Modal */}
      <Modal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        title={selectedPlan?.name || ''}
      >
        {selectedPlan && (
          <div className="space-y-6">
            {/* 3D Model Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-12 flex items-center justify-center h-80">
              <div className="text-center">
                <div className="text-7xl mb-4">🏗️</div>
                <p className="text-dark font-semibold text-xl mb-2">Interactive 3D Floor Plan</p>
                <p className="text-gray-600">High-quality 3D visualization model here</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Area</p>
                <p className="text-dark font-bold text-lg">{selectedPlan.area}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Price Range</p>
                <p className="text-primary font-bold text-lg">{selectedPlan.price}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Bedrooms</p>
                <p className="text-dark font-bold text-lg">{selectedPlan.bedrooms}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold">Bathrooms</p>
                <p className="text-dark font-bold text-lg">{selectedPlan.bathrooms}</p>
              </div>
            </div>

            {/* Full Feature List */}
            <div>
              <h4 className="font-semibold text-dark mb-3">Complete Features:</h4>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {selectedPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => downloadPDF(selectedPlan)}
                className="bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow"
              >
                Download PDF
              </button>
              <button
                onClick={() => { setBookingPlan(selectedPlan.name); setSelectedPlan(null); setShowBookModal(true); }}
                className="bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition-colors"
              >
                Schedule Visit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
