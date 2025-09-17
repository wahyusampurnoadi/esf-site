'use client';
import { useEffect } from 'react';

const SITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '';

export default function CrispChat() {
  useEffect(() => {
    if (typeof window === 'undefined' || !SITE_ID) return;

    if (!window.$crisp) {
      window.$crisp = [] as unknown as CrispQueue; // queue awal
    }
    window.CRISP_WEBSITE_ID = SITE_ID;

    if (!document.getElementById('crisp-widget')) {
      const s = document.createElement('script');
      s.id = 'crisp-widget';
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return null;
}
