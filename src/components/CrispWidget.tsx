'use client';

import { useEffect } from 'react';

/**
 * Tugas: geser posisi widget Crisp agar tidak nubruk tombol ScrollToTop.
 * Tombol ScrollToTop beri atribut: data-scrolltop pada elemen tombolnya.
 */
export default function CrispWidget() {
  useEffect(() => {
    const GAP = 12;     // jarak dari tombol ke widget
    const MIN_Y = 80;   // minimal offset vertikal

    const applyOffset = () => {
      const btn = document.querySelector<HTMLElement>('[data-scrolltop]');
      let y = MIN_Y;

      if (btn) {
        const rect = btn.getBoundingClientRect();
        // jarak dari atas tombol ke bawah viewport
        const distFromBottom = window.innerHeight - rect.top;
        y = Math.max(MIN_Y, distFromBottom + GAP);
      }

      // geser widget Crisp ke (x=16, y=perhitungan di atas)
      window.$crisp?.push(['config', 'position:offset', [16, y]]);
    };

    // Tunggu sampai script Crisp siap, lalu set offset + pasang listener
    const boot = window.setInterval(() => {
      if (window.$crisp) {
        applyOffset();
        window.$crisp.push(['on', 'chat:opened', applyOffset]);
        window.clearInterval(boot);
      }
    }, 400);

    // re-apply saat resize
    const onResize = () => applyOffset();
    window.addEventListener('resize', onResize);

    return () => {
      window.clearInterval(boot);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
