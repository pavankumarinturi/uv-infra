'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, CONTACT_INFO } from '@/lib/emailjs-config';

interface Props {
  onClose: () => void;
  initialProject?: string;
}

interface FormData {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  project: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  timeSlot?: string;
}

const TIME_SLOTS = ['Morning (9am – 12pm)', 'Afternoon (12pm – 4pm)', 'Evening (4pm – 7pm)'];

export default function BookVisitModal({ onClose, initialProject = '' }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    project: initialProject,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Get today's date as min value for date picker
  const today = new Date().toISOString().split('T')[0];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit number';
    }
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setLoading(true);
    const now = new Date();
    const submittedAt = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN')}`;
    const projectLabel = formData.project || 'Not specified';
    const visitDetails = `Site Visit Request\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.timeSlot}\nProject Interest: ${projectLabel}`;

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateIds.ownerNotification,
        {
          to_email: CONTACT_INFO.email,
          from_name: formData.name,
          from_email: '',
          from_phone: formData.phone,
          project: projectLabel,
          message: visitDetails,
          submitted_at: submittedAt,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      );
      setSubmitted(true);
    } catch (err: any) {
      console.error('Book visit failed:', err?.status, err?.text);
      setSubmitError('Failed to send request. Please call us directly at +91 73860 86043.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-dark p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-white font-playfair">Book a Site Visit</h2>
          <p className="text-blue-100 text-sm mt-1">We'll confirm your visit within 2 hours</p>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-dark mb-2">Visit Booked!</h3>
              <p className="text-gray-600 mb-1">
                Thank you, <strong>{formData.name}</strong>. Your visit request has been sent.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Our team will call you at <strong>{formData.phone}</strong> to confirm.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-dark transition-colors font-semibold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-sm ${
                    errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-sm ${
                    errors.phone ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-sm ${
                    errors.date ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-sm ${
                    errors.timeSlot ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select time slot</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>

              {/* Project (optional) */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1">
                  Project Interest <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
                >
                  <option value="">Select a project</option>
                  <option value="Sunshine Sapphire – 2BHK">Sunshine Sapphire – 2BHK</option>
                  <option value="2 BHK Floor Plan">2 BHK Floor Plan</option>
                  <option value="3 BHK Floor Plan">3 BHK Floor Plan</option>
                  <option value="UV's Pearl – Ongoing">UV's Pearl – Ongoing</option>
                  <option value="General Visit">General Visit</option>
                </select>
              </div>

              {/* Site address */}
              <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
                <p className="font-semibold text-dark mb-0.5">📍 Site Location</p>
                <p>2Gether Heights, UV's Pearl, Ameenpur, Hyderabad – 502032</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Request...' : 'Confirm Visit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
