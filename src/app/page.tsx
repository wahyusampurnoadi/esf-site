"use client";

import React from "react";
import Image from "next/image";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";

const WA_NUMBER = "6285747804795";
const IG_HANDLE = "editseputarfoto";
const BRAND = "ESF — Edit Seputar Foto";

const SERVICES = [
  { title: "Pasfoto & Background", desc: "Pasfoto semua ukuran, ganti warna background (biru/merah/putih/seragam)" },
  { title: "Ganti Pakaian", desc: "Ubah ke kemeja putih, jas, almamater, hijab rapi, dll." },
  { title: "Retouch & Perapihan", desc: "Hilangkan jerawat, glare kacamata, rambut berantakan, koreksi warna." },
  { title: "Restorasi Foto Lama", desc: "Perbaiki foto robek/pudar jadi bersih dan tajam kembali." },
  { title: "Produk & UMKM", desc: "Edit foto menu/produk, cut-out, mockup katalog siap jual." },
  { title: "Template & Paket Aset", desc: "PSD pasfoto otomatis, preset, dan 1000+ aset bahan edit." },
];

const PORTFOLIO = [
  { src: "/portfolio/pasfoto.jpg",           title: "Pasfoto — Background Biru" },
  { src: "/portfolio/wisuda.jpg",            title: "Foto Wisuda" },
  { src: "/portfolio/ganti-background.jpg",  title: "Ganti Background" },
  { src: "/portfolio/restorasi.jpg",         title: "Restorasi — Foto Lama" },
  { src: "/portfolio/newborn.jpg",           title: "Foto Newborn" },
  { src: "/portfolio/pernikahan.jpg",        title: "Foto Pernikahan" },
];

const TESTIMONIALS = [
  { name: "Dina — Lamaran Kerja", text: "Hasil pasfoto rapi banget, background biru pas standar serta respon admin cepat dan ramah." },
  { name: "Rizky — Buku Nikah",  text: "Ganti pakaian ke jas + hijab rapi, sangat natural. Harga oke, prosesnya cepat." },
  { name: "Bu Sari — UMKM",      text: "Foto menu jadi bersih dan menarik, penjualan ikut naik. Recommended!" },
  { name: "Andi — CPNS",         text: "Pasfoto 3x4 sesuai ketentuan CPNS, rapi dan tajam. Prosesnya kilat." },
  { name: "Maya — Visa & Paspor",text: "Ukuran dan background pas, diterima tanpa revisi di kantor imigrasi. Mantap!" },
  { name: "Fajar — Wisuda",      text: "Retouch wajah halus tapi tetap natural. Cocok untuk cetak dan upload." },
  { name: "Nisa — Ganti Background", text: "Background merah jadi putih mulus, pinggiran rambut rapi sekali." },
  { name: "Rudi — Ganti Pakaian",text: "Ubah ke jas hitam + dasi tampak nyata, tidak kelihatan hasil edit." },
  { name: "Vina — Retouch Wajah",text: "Jerawat dan bekas hitam hilang, kulit tetap realistis." },
  { name: "Pak Budi — Restorasi",text: "Foto lama robek dipulihkan jadi jernih. Keluarga saya terharu lihat hasilnya." },
  { name: "Sinta — KTP & KK",    text: "Pasfoto sesuai persyaratan, ukuran file dan warna sudah diatur rapi." },
  { name: "Kevin — Katalog Produk", text: "Cut-out bersih, bayangan produk halus. Katalog terlihat profesional." },
  { name: "Alifa — Newborn",     text: "Tone warna hangat, kulit bayi lembut dan cerah. Hasilnya cantik sekali." },
  { name: "Arif — Foto Ijazah",  text: "Penyesuaian seragam dan background sesuai kampus. Siap print besar." },
  { name: "Tania — LinkedIn & CV", text: "Headshot profesional, pencahayaan diperbaiki. Profil saya jadi lebih meyakinkan." },
];

const FAQS = [
  { q: "Berapa lama proses edit foto?", a: "Umumnya 20–40 menit per foto, tergantung tingkat kesulitan." },
  { q: "Apakah hasil bisa direvisi?", a: "Ya, revisi ringan gratis 2x untuk memastikan kepuasan pelanggan." },
  { q: "Format file apa saja yang bisa dikirim?", a: "JPG, PNG, atau PDF. Disarankan resolusi jelas agar hasil maksimal." },
  { q: "Bagaimana cara pembayaran?", a: "Transfer bank/e-wallet. Detail akan dikirim setelah order via WhatsApp." },
];

/* ===== Buttons with icons ===== */
function WhatsAppButton({ text = "Halo, saya ingin order edit foto di ESF." }) {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 transition"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.1 1.52 5.82L0 24l6.29-1.54A11.9 11.9 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.26-6.21-3.48-8.52zM12 22.1c-1.9 0-3.68-.5-5.26-1.45l-.38-.22-3.72.91.99-3.64-.24-.37A10.08 10.08 0 1 1 22.1 12c0 5.58-4.52 10.1-10.1 10.1zm5.47-7.62c-.3-.15-1.75-.87-2.02-.97-.27-.1-.45-.15-.64.14-.19.29-.73.96-.9 1.16-.17.2-.33.22-.61.08-.29-.15-1.24-.45-2.37-1.46-.88-.79-1.47-1.76-1.65-2.04-.17-.29-.02-.46.13-.61.13-.13.29-.35.44-.52.15-.18.19-.29.29-.48.1-.19.05-.35-.02-.49-.07-.15-.65-1.52-.89-2.07-.24-.61-.49-.52-.66-.53l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.89 1.26 3.09c.19.2 2.1 3.24 5.09 4.54.71.31 1.26.49 1.68.63.72.24 1.37.21 1.96.13.6-.09 1.84-.75 2.1-1.43.26-.68.26-1.26.18-1.4-.07-.13-.27-.2-.57-.35z" />
      </svg>
      Order via WhatsApp
    </a>
  );
}

function InstagramButton() {
  const igHref = `https://instagram.com/${IG_HANDLE}`;
  return (
    <a
      href={igHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-purple-200 text-purple-700 hover:bg-purple-50 transition"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.069 1.646.069 4.834s-.011 3.568-.069 4.834c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.069-4.834.069s-3.568-.011-4.834-.069c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.568 2.163 15.188 2.163 12s.012-3.568.07-4.834c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.432 2.175 8.812 2.163 12 2.163zm0 3.675a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162A3.999 3.999 0 1 1 16 12a4.005 4.005 0 0 1-4 4.999zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.439 1.44 1.44 0 0 0-1.44-1.439z"/>
      </svg>
      Lihat Instagram
    </a>
  );
}

// ==== HEADER (mobile hamburger) ====
function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      data-cursor="ignore"
      className="sticky top-0 z-50 border-b border-purple-100 bg-purple-50/80 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-3" aria-label="ESF — Edit Seputar Foto">
        <Image src="/logo-esf.png" alt="" width={36} height={36} className="h-9 w-9" priority />
        <span className="sr-only">ESF — Edit Seputar Foto</span>
      </Link>


        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#services" className="hover:opacity-70">Layanan</a>
          <a href="#portfolio" className="hover:opacity-70">Portofolio</a>
          <a href="#testi" className="hover:opacity-70">Testimoni</a>
          <a href="#faq" className="hover:opacity-70">FAQ</a>
          <a href="#order" className="hover:opacity-70">Order</a>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton />
        </div>

        <button
        data-cursor="ignore"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className={[
          "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
          "shadow-sm z-[60]", // pastikan di atas overlay
          open
            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-transparent"
            : "border border-purple-200 bg-white/80 text-purple-700"
        ].join(" ")}
      >
        {open ? (
          // ikon CLOSE (X) – putih & lebih tebal
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          // ikon HAMBURGER
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      </div>

      <div
        onClick={close}
        className={`md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity
          ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <div
        id="mobile-nav"
        className={`md:hidden fixed z-50 inset-x-0 top-[56px]
          origin-top bg-white/95 backdrop-blur border-b border-purple-100
          transition-all duration-200
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="px-4 py-4 grid gap-2">
          <a onClick={close} href="#services" className="py-2 text-[15px]">Layanan</a>
          <a onClick={close} href="#portfolio" className="py-2 text-[15px]">Portofolio</a>
          <a onClick={close} href="#testi" className="py-2 text-[15px]">Testimoni</a>
          <a onClick={close} href="#faq" className="py-2 text-[15px]">FAQ</a>
          <a onClick={close} href="#order" className="py-2 text-[15px]">Order</a>

          <div className="mt-2 pt-3 border-t border-purple-100">
            <div onClick={close} className="w-full">
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent text-inherit">
      {/* Navbar */}
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* background layers */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-70 mask-fade"></div>
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(221,139,252,.35) 0 6px, transparent 7px),' +
                'radial-gradient(circle at 80% 70%, rgba(196,181,253,.35) 0 6px, transparent 7px)',
              backgroundSize: "160px 160px, 180px 180px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-8 pb-12 md:pb-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* kolom teks */}
            <div className="md:translate-y-[-12px]">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-neutral-900">
                Jasa Edit Foto Cepat, Rapi, <span className="text-purple-600">Amanah</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-700">
                ESF membantu pasfoto, ganti pakaian, hilangkan glare kacamata, restorasi, hingga foto produk untuk UMKM.
              </p>
              <div className="mt-6 flex gap-3">
                <WhatsAppButton text="Halo ESF, saya minat edit foto. Boleh info paket & harga?" />
                <InstagramButton />
              </div>
            </div>

            {/* kolom gambar hero */}
            <div className="relative flex items-center justify-center">
              <ParallaxImage
                src="/model.png"
                alt="Contoh hasil edit foto ESF"
                width={420}
                height={520}
                strength={0.22}
                clamp={70}
                tiltMax={12}
                tiltScale={1.04}
                className="drop-shadow-xl"
                priority
              />

              {/* BADGE 1 */}
              <div aria-hidden className="pointer-events-none absolute top-12 right-4 md:top-52 md:right-24">
                <div
                  className="float-soft rounded-2xl px-4 py-3 md:px-5 md:py-4
                             bg-white/80 border border-purple-200 backdrop-blur-md
                             shadow-xl shadow-purple-300/30"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  <div className="text-purple-600 text-[26px] md:text-[34px] font-extrabold leading-none">
                    700+
                  </div>
                  <div className="mt-0.5 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-purple-700">
                    customer puas!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-purple-700">Layanan ESF</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-3xl border border-purple-200 bg-white p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-purple-700">{s.title}</h3>
              <p className="text-sm text-neutral-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portofolio */}
      <section id="portfolio" className="scroll-mt-24 max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-purple-700">Portofolio</h2>
          <a
            href={`https://instagram.com/${IG_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-700 hover:underline"
          >
            Lihat lebih banyak di Instagram →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-5">
          {PORTFOLIO.map((item) => (
            <figure key={item.src} className="group overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-sm">
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={750}
                  className="h-auto w-full object-cover aspect-[4/5] transition duration-300 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-purple-800 bg-gradient-to-t from-purple-100/95 via-purple-100/70 to-transparent font-medium">
                  {item.title}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Testimonials (Marquee) */}
      <section id="testi" className="scroll-mt-24 bg-purple-100/50">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-purple-700">Apa kata pelanggan?</h2>

          <div className="relative mt-8 overflow-hidden">
            <div className="marquee gap-5 pr-5">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <figure key={`r1-${i}`} className="min-w-[320px] max-w-[320px] rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
                  <blockquote className="text-neutral-700">“{t.text}”</blockquote>
                  <figcaption className="mt-3 text-sm text-neutral-500">— {t.name}</figcaption>
                </figure>
              ))}
            </div>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-purple-100/50 to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-purple-100/50 to-transparent"></div>
          </div>

          <div className="relative mt-4 overflow-hidden">
            <div className="marquee marquee-rev marquee-slow gap-5 pr-5">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <figure key={`r2-${i}`} className="min-w-[320px] max-w-[320px] rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
                  <blockquote className="text-neutral-700">“{t.text}”</blockquote>
                  <figcaption className="mt-3 text-sm text-neutral-500">— {t.name}</figcaption>
                </figure>
              ))}
            </div>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-purple-100/50 to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-purple-100/50 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-purple-700">Pertanyaan Umum (FAQ)</h2>
        <div className="mt-8 space-y-5">
          {FAQS.map((f, i) => (
            <details key={i} className="rounded-2xl border border-purple-200 bg-white p-5 hover:shadow-md transition">
              <summary className="font-medium cursor-pointer text-purple-700">{f.q}</summary>
              <p className="mt-2 text-sm text-neutral-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Order */}
      <section id="order" className="scroll-mt-24 max-w-6xl mx-auto px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-purple-700">Siap mulai? Kirim fotonya sekarang</h2>
        <p className="mt-2 text-neutral-700">Klik tombol di bawah untuk konsultasi gratis & cek kebutuhan Anda.</p>
        <div className="mt-6 flex justify-center gap-3">
          <WhatsAppButton text="Halo ESF, saya ingin konsultasi edit foto." />
          <InstagramButton />
        </div>
      </section>

      <footer className="border-t border-purple-200 py-6 text-center text-sm bg-purple-50">
        © {new Date().getFullYear()} {BRAND}. All rights reserved.
      </footer>

      <ScrollToTop />
    </main>
  );
}
