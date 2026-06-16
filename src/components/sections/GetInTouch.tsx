'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, CONTACT_INFO } from '@/lib/emailjs-config';

interface FormData {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  project?: string;
  message?: string;
}

export default function GetInTouch() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.project) {
      newErrors.project = 'Please select a project';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const projectMap: { [key: string]: string } = {
        project1: 'Premium Residences - 2BHK',
        project2: 'Luxury Apartments - 3BHK',
        project3: 'Grand Villas - 4BHK',
        general: 'General Enquiry',
      };

      const projectName = projectMap[formData.project] || formData.project;
      const now = new Date();
      const submittedAt = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN')}`;

      if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId) {
        const response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: '', email: '', phone: '', project: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        }
        return;
      }

      if (EMAILJS_CONFIG.templateIds.ownerNotification) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIds.ownerNotification,
          {
            to_email: CONTACT_INFO.email,
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            project: projectName,
            message: formData.message,
            submitted_at: submittedAt,
          }
        );
      }

      if (EMAILJS_CONFIG.templateIds.customerReply) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIds.customerReply,
          {
            from_email: formData.email,
            from_name: formData.name,
            project: projectName,
            from_phone: formData.phone,
            message: formData.message,
            submitted_at: submittedAt,
          }
        );
      }

      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setEmailError('Failed to send enquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-background to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info Blocks */}
          <div>
            {/* Section Header - Left Side Only */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">GET IN TOUCH</p>
              <h2 className="text-4xl md:text-5xl font-bold text-dark mt-2 font-playfair">
                Let's Build Your<br />Dream Together
              </h2>
              <p className="text-gray-600 text-lg mt-4">
                Reach out for site visits, pricing, or any questions. Our team responds within 24 hours.
              </p>
            </div>

            {/* Contact Blocks */}
            <div className="space-y-4">
            {/* Contact Person Block */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Contact Person</p>
                  <p className="text-lg font-bold text-dark mt-1">Pavan Kumar Inturi</p>
                  <p className="text-sm text-gray-600 mt-1">Promoter & Developer, UV Infra</p>
                </div>
              </div>
            </div>

            {/* Phone / WhatsApp Block */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Phone / WhatsApp</p>
                  <p className="text-lg font-bold text-dark mt-1">{CONTACT_INFO.phones[0]}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{CONTACT_INFO.phones[1]}</p>
                </div>
              </div>
            </div>

            {/* Site Address Block */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Site Address</p>
                  <p className="text-sm font-semibold text-dark mt-1">2Gether Heights (Ekam & Dviyam Block)</p>
                  <p className="text-sm text-gray-600 mt-0.5">UV's Pearl, Ameenpur</p>
                  <p className="text-sm text-gray-600">Hyderabad – 502032, Telangana</p>
                </div>
              </div>
            </div>

            {/* Website Block */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Website</p>
                  <a href="https://www.uv-infra.com" className="text-lg font-bold text-primary hover:underline mt-1">
                    uv-infra.com
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Right Side - Enquiry Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-dark mb-2 font-playfair">Book a Site Visit</h3>
              <p className="text-gray-600 mb-6">Leave your details and we'll arrange a personal tour of our project.</p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">✓ Thank you! Your enquiry has been submitted successfully.</p>
                  <p className="text-green-700 text-sm">We will contact you shortly. Check your email for confirmation.</p>
                </div>
              )}

              {emailError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-semibold">✗ {emailError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-sm ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-sm ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-sm ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Project Selection */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Project Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-sm ${
                      errors.project ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    }`}
                  >
                    <option value="">— Select a Project —</option>
                    <option value="project1">Premium Residences - 2BHK</option>
                    <option value="project2">Luxury Apartments - 3BHK</option>
                    <option value="project3">Grand Villas - 4BHK</option>
                    <option value="general">General Enquiry</option>
                  </select>
                  {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">
                    Message / Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your requirements, preferred visit time, or any questions..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition resize-none text-sm ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Send Enquiry →'}
                </button>

                <p className="text-center text-gray-500 text-xs">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
