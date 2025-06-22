'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Next.js 15 - Performance Analytics
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    console.log('📊 Page view:', pathname);
    
    // Measure performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfEntries = performance.getEntriesByType('navigation');
      if (perfEntries.length > 0) {
        const navEntry = perfEntries[0] as PerformanceNavigationTiming;
        console.log('⚡ Performance metrics:', {
          'DNS Lookup': navEntry.domainLookupEnd - navEntry.domainLookupStart,
          'TCP Connection': navEntry.connectEnd - navEntry.connectStart,
          'TLS Handshake': navEntry.secureConnectionStart > 0 ? navEntry.connectEnd - navEntry.secureConnectionStart : 0,
          'Request Time': navEntry.responseStart - navEntry.requestStart,
          'Response Time': navEntry.responseEnd - navEntry.responseStart,
          'DOM Processing': navEntry.domContentLoadedEventEnd - navEntry.responseEnd,
          'Total Load Time': navEntry.loadEventEnd - navEntry.fetchStart,
        });
      }
    }
  }, [pathname]);

  // Report Web Vitals (simplified version)
  useEffect(() => {
    // Using basic performance metrics instead of web-vitals for compatibility
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Simple performance logging
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('Performance Metrics:', {
            'FCP': navigation.responseStart - navigation.fetchStart,
            'LCP': navigation.loadEventEnd - navigation.fetchStart,
            'Total Load Time': navigation.loadEventEnd - navigation.fetchStart,
          });
        }
      }, 0);
    }
  }, []);

  return null;
}
