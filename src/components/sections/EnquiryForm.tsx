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

export default function EnquiryForm() {
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
      const submittedAt = new Date().toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
      });

      // Check if EmailJS is configured
      if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId) {
        // Fallback to API endpoint if EmailJS not configured
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

      // Send owner notification email
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

      // Send customer auto-reply email
      if (EMAILJS_CONFIG.templateIds.customerReply) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIds.customerReply,
          {
            to_email: formData.email,
            from_name: formData.name,
            project: projectName,
            from_phone: formData.phone,
            message: formData.message,
            submitted_at: submittedAt,
          }
        );
      }

      // Also save to database via API
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', project: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setEmailError('Failed to send enquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 px-6 bg-gradient-to-br from-background to-blue-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair">
            Send us an Enquiry
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions about our projects? Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        {submitted && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">✓ Thank you! Your enquiry has been submitted successfully.</p>
            <p className="text-green-700 text-sm">We will contact you shortly. Check your email for confirmation.</p>
          </div>
        )}

        {emailError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">✗ {emailError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-200">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Project Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-dark mb-2">
              Project Interest <span className="text-red-500">*</span>
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.project ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            >
              <option value="">Select a project</option>
              <option value="project1">Premium Residences - 2BHK</option>
              <option value="project2">Luxury Apartments - 3BHK</option>
              <option value="project3">Grand Villas - 4BHK</option>
              <option value="general">General Enquiry</option>
            </select>
            {errors.project && <p className="text-red-500 text-sm mt-1">{errors.project}</p>}
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-dark mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements and interests..."
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-dark text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Send Enquiry'}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            We'll get back to you within 24 hours
          </p>
        </form>
      </div>
    </section>
  );
}
