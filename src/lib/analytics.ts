// Analytics utility for tracking user interactions and events

type EventData = {
  [key: string]: string | number | boolean;
};

class Analytics {
  private debug = process.env.NODE_ENV === 'development';

  // Initialize Google Analytics
  initGoogleAnalytics(measurementId: string) {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', measurementId);

    if (this.debug) {
      console.log('[Analytics] Google Analytics initialized:', measurementId);
    }
  }

  // Track page view
  trackPageView(pagePath: string, pageTitle: string) {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: pagePath,
      page_title: pageTitle,
    });

    if (this.debug) {
      console.log('[Analytics] Page view tracked:', { pagePath, pageTitle });
    }
  }

  // Track custom event
  trackEvent(eventName: string, eventData?: EventData) {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', eventName, eventData || {});

    if (this.debug) {
      console.log('[Analytics] Event tracked:', eventName, eventData);
    }
  }

  // Track form submission
  trackFormSubmission(formName: string, formData?: EventData) {
    this.trackEvent('form_submission', {
      form_name: formName,
      ...formData,
    });
  }

  // Track button click
  trackButtonClick(buttonName: string, additionalData?: EventData) {
    this.trackEvent('button_click', {
      button_name: buttonName,
      ...additionalData,
    });
  }

  // Track section view
  trackSectionView(sectionName: string) {
    this.trackEvent('section_view', {
      section_name: sectionName,
    });
  }

  // Track project view
  trackProjectView(projectId: string, projectName: string) {
    this.trackEvent('project_view', {
      project_id: projectId,
      project_name: projectName,
    });
  }

  // Track enquiry start
  trackEnquiryStart() {
    this.trackEvent('enquiry_start');
  }

  // Track enquiry completion
  trackEnquiryCompletion(projectId?: string) {
    this.trackEvent('enquiry_complete', {
      project_id: projectId || 'general',
    });
  }

  // Track WhatsApp click
  trackWhatsAppClick() {
    this.trackEvent('whatsapp_click');
  }

  // Track phone call
  trackPhoneCall(phoneNumber: string) {
    this.trackEvent('phone_call', {
      phone_number: phoneNumber,
    });
  }

  // Track gallery image view
  trackGalleryImageView(imageId: string, category: string) {
    this.trackEvent('gallery_image_view', {
      image_id: imageId,
      category: category,
    });
  }

  // Track floor plan view
  trackFloorPlanView(planId: string, planName: string) {
    this.trackEvent('floor_plan_view', {
      plan_id: planId,
      plan_name: planName,
    });
  }
}

export const analytics = new Analytics();
