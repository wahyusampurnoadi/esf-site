// src/types/crisp.d.ts
export {};

declare global {
  interface Window {
    $crisp: any[];             // TANPA tanda tanya
    CRISP_WEBSITE_ID?: string; // opsional, kalau dipakai
  }
}
