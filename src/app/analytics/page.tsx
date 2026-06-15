'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalViews: number;
  totalUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: { page: string; views: number }[];
  topEvents: { event: string; count: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
}

// Mock data for demonstration
const mockAnalyticsData: AnalyticsData = {
  totalViews: 1250,
  totalUsers: 342,
  bounceRate: 35.2,
  avgSessionDuration: 245,
  topPages: [
    { page: '/', views: 450 },
    { page: '/projects', views: 320 },
    { page: '/floor-plans', views: 280 },
    { page: '/gallery', views: 200 },
  ],
  topEvents: [
    { event: 'enquiry_start', count: 85 },
    { event: 'whatsapp_click', count: 120 },
    { event: 'project_view', count: 95 },
    { event: 'floor_plan_view', count: 70 },
  ],
  deviceBreakdown: [
    { device: 'Mobile', percentage: 65 },
    { device: 'Desktop', percentage: 30 },
    { device: 'Tablet', percentage: 5 },
  ],
};

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    const timer = setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Unable to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-2 font-playfair">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">Track website performance and user engagement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Views */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 font-semibold text-sm">Total Page Views</p>
              <div className="text-2xl">📊</div>
            </div>
            <p className="text-3xl font-bold text-dark">{analyticsData.totalViews.toLocaleString()}</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last week</p>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 font-semibold text-sm">Total Users</p>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-3xl font-bold text-dark">{analyticsData.totalUsers.toLocaleString()}</p>
            <p className="text-green-600 text-sm mt-2">↑ 8% from last week</p>
          </div>

          {/* Bounce Rate */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 font-semibold text-sm">Bounce Rate</p>
              <div className="text-2xl">📉</div>
            </div>
            <p className="text-3xl font-bold text-dark">{analyticsData.bounceRate.toFixed(1)}%</p>
            <p className="text-green-600 text-sm mt-2">↓ 2.3% improvement</p>
          </div>

          {/* Avg Session Duration */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600 font-semibold text-sm">Avg Session Duration</p>
              <div className="text-2xl">⏱️</div>
            </div>
            <p className="text-3xl font-bold text-dark">{analyticsData.avgSessionDuration}s</p>
            <p className="text-green-600 text-sm mt-2">↑ 45s increase</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-dark mb-6 font-playfair">Top Pages</h2>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-sm">{page.page}</span>
                    <span className="text-dark font-bold">{page.views}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-dark h-2 rounded-full transition-all"
                      style={{
                        width: `${(page.views / analyticsData.topPages[0].views) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Events */}
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-dark mb-6 font-playfair">Top Events</h2>
            <div className="space-y-4">
              {analyticsData.topEvents.map((event, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-sm">{event.event.replace(/_/g, ' ')}</span>
                    <span className="text-dark font-bold">{event.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(event.count / analyticsData.topEvents[0].count) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-dark mb-6 font-playfair">Device Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsData.deviceBreakdown.map((device, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <svg
                    className="transform -rotate-90"
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(device.percentage / 100) * 339.3} 339.3`}
                      className="text-primary transition-all"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-dark">
                    {device.percentage}%
                  </span>
                </div>
                <p className="text-gray-700 font-semibold">{device.device}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-gray-700 text-sm">
            <strong>Note:</strong> This is a demonstration dashboard with mock data. To enable real analytics,
            integrate with Google Analytics using the{' '}
            <code className="bg-white px-2 py-1 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> environment variable.
          </p>
        </div>
      </div>
    </div>
  );
}
