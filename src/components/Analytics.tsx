'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (measurementId) {
      analytics.initGoogleAnalytics(measurementId);
    }
  }, []);

  useEffect(() => {
    // Track page view on route change
    if (pathname) {
      analytics.trackPageView(pathname, document.title);
    }
  }, [pathname]);

  return null;
}
