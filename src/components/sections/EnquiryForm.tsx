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
    console.log('EmailJS Config:', {
      publicKey: EMAILJS_CONFIG.publicKey ? '✓ Loaded' : '✗ Missing',
      serviceId: EMAILJS_CONFIG.serviceId ? '✓ Loaded' : '✗ Missing',
      ownerTemplate: EMAILJS_CONFIG.templateIds.ownerNotification ? '✓ Loaded' : '✗ Missing',
      replyTemplate: EMAILJS_CONFIG.templateIds.customerReply ? '✓ Loaded' : '✗ Missing',
    });
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.warn('EmailJS Public Key is missing!');
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

  const generateCustomerEmailHTML = (name: string, project: string, phone: string, message: string, submittedAt: string): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%); padding: 40px 20px; text-align: center; color: white; }
          .content { padding: 40px; }
          .section { margin: 25px 0; }
          .details { background: #f9f9f9; border-left: 4px solid #0066CC; padding: 20px; border-radius: 4px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-size: 14px; }
          .detail-row:last-child { border-bottom: none; }
          .label { color: #666; font-weight: 600; }
          .value { color: #333; text-align: right; }
          .next-steps { background: #e8f4fd; border-radius: 6px; padding: 20px; }
          .step { padding: 10px 0; font-size: 14px; color: #333; }
          .contact { background: #f0f7ff; border-radius: 6px; padding: 20px; }
          .contact-item { padding: 8px 0; font-size: 14px; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
          .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
          a { color: #0066CC; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Thank You! 🏠</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Your enquiry has been received</p>
          </div>
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p style="margin-top: 15px;">Thank you for reaching out to UV Infra! We truly appreciate your interest in our premium residential properties. Your enquiry is important to us, and we're excited to help you find your perfect home.</p>

            <div class="section details">
              <h3 style="color: #0066CC; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;">📋 Your Enquiry Details</h3>
              <div class="detail-row"><span class="label">Project Interested:</span><span class="value">${project}</span></div>
              <div class="detail-row"><span class="label">Your Phone:</span><span class="value">${phone}</span></div>
              <div class="detail-row"><span class="label">Submitted On:</span><span class="value">${submittedAt}</span></div>
              <div class="detail-row"><span class="label">Your Message:</span><span class="value">${message}</span></div>
            </div>

            <div class="section next-steps">
              <h3 style="color: #0066CC; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;">⏭️ What Happens Next?</h3>
              <div class="step">✓ Our team reviews your enquiry carefully</div>
              <div class="step">✓ We'll call you within 24 hours with personalized information</div>
              <div class="step">✓ Schedule a convenient site visit at your preferred time</div>
            </div>

            <div class="section contact">
              <h3 style="color: #0066CC; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;">📞 Get In Touch</h3>
              <p style="margin: 0 0 15px 0; font-size: 14px;">For urgent queries or to speak with us immediately:</p>
              <div class="contact-item"><strong>📞 +91 73860 86043</strong> (Pavan Kumar Inturi)</div>
              <div class="contact-item"><strong>📞 +91 95059 44456</strong></div>
              <div class="contact-item"><strong>📍</strong> 2Gether Heights, Ameenpur, Hyderabad – 502032</div>
              <div class="contact-item" style="margin-top: 15px;"><strong>💬 WhatsApp: +91 73860 86043</strong></div>
            </div>

            <p style="text-align: center; margin: 25px 0; font-size: 14px; color: #666;">
              Visit our website: <a href="https://uv-infra.com">www.uv-infra.com</a>
            </p>

            <div class="signature">
              <p style="margin-bottom: 15px;">Warm regards,</p>
              <p style="margin: 0; font-weight: 600; color: #0066CC;">Pavan Kumar Inturi</p>
              <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Promoter & Developer – UV Infra</p>
            </div>
          </div>
          <div class="footer">
            <p>UV Infra - Premium Residential Properties</p>
            <p style="margin-top: 10px; font-size: 11px; color: #999;">This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const generateOwnerEmailHTML = (name: string, email: string, project: string, phone: string, message: string, submittedAt: string): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%); padding: 30px 20px; text-align: center; color: white; }
          .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px 20px; margin: 20px; color: #856404; font-size: 13px; }
          .content { padding: 30px 20px; }
          .section { margin-bottom: 25px; }
          .title { color: #0066CC; font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px; }
          .card { background: #f9f9f9; border-left: 4px solid #0066CC; padding: 15px; border-radius: 4px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-size: 13px; }
          .info-row:last-child { border-bottom: none; }
          .label { color: #666; font-weight: 600; }
          .value { color: #333; text-align: right; }
          .message-box { background: #f0f7ff; border-radius: 4px; padding: 15px; margin-top: 10px; border-left: 4px solid #0066CC; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; }
          .btn { display: inline-block; background: #0066CC; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; font-weight: 600; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">📬 New Enquiry Received</h1>
            <p style="margin: 5px 0 0 0; font-size: 13px;">Action Required - Follow up within 24 hours</p>
          </div>
          <div class="alert">⚡ New enquiry from ${name} - Please follow up within 24 hours</div>
          <div class="content">
            <div class="section">
              <h3 class="title">👤 Client Information</h3>
              <div class="card">
                <div class="info-row"><span class="label">Name:</span><span class="value">${name}</span></div>
                <div class="info-row"><span class="label">Email:</span><span class="value">${email}</span></div>
                <div class="info-row"><span class="label">Phone:</span><span class="value">${phone}</span></div>
              </div>
            </div>

            <div class="section">
              <h3 class="title">📋 Enquiry Details</h3>
              <div class="card">
                <div class="info-row"><span class="label">Project Interest:</span><span class="value">${project}</span></div>
                <div class="info-row"><span class="label">Submitted On:</span><span class="value">${submittedAt}</span></div>
              </div>
              <div class="message-box">
                <strong>Client's Message:</strong>
                <p style="margin-top: 10px;">${message}</p>
              </div>
            </div>

            <div class="section">
              <h3 class="title">⚡ Recommended Actions</h3>
              <p style="font-size: 13px; line-height: 1.8;">
                ✓ Call ${name} at ${phone} to confirm the enquiry<br>
                ✓ Share relevant project brochures and floor plans<br>
                ✓ Schedule a site visit at their convenience<br>
                ✓ Log the enquiry in your CRM system
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" class="btn">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <p>UV Infra - Premium Residential Properties</p>
            <p style="margin-top: 10px; font-size: 11px; color: #999;">This is an automated notification from your enquiry management system.</p>
          </div>
        </div>
      </body>
      </html>
    `;
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

      // Send ONLY owner notification email (no customer auto-reply to save quota)
      let emailSent = false;

      if (EMAILJS_CONFIG.templateIds.ownerNotification && EMAILJS_CONFIG.serviceId) {
        try {
          console.log('Sending owner notification...');
          const ownerResponse = await emailjs.send(
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
          console.log('Owner notification sent:', ownerResponse);
          emailSent = true;
        } catch (emailError) {
          console.error('EmailJS Error:', emailError);
          emailSent = false;
        }
      }

      // Optionally save to database via API (non-blocking)
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (apiError) {
        console.warn('API save failed (non-blocking):', apiError);
      }

      // Show success if email was sent
      if (emailSent) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', project: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setEmailError('Failed to send enquiry. Please try again or contact us directly.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error submitting form:', errorMessage);
      console.error('Full error:', error);
      setEmailError('Failed to send enquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 px-6 bg-gradient-to-br from-background to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Placeholder for left side - in main layout this will be handled by GetInTouch section */}
          <div className="hidden lg:block" />

          <div className="max-w-2xl">
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
        </div>
      </div>
    </section>
  );
}
