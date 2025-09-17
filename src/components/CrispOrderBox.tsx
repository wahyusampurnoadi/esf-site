"use client";

import * as React from "react";

export default function CrispOrderBox() {
  const [msg, setMsg] = React.useState(
    ""
  );
  const [sending, setSending] = React.useState(false);

  const sendToCrisp = () => {
    if (!window.$crisp) {
      alert("Chat belum siap. Coba lagi dalam 1–2 detik.");
      return;
    }
    setSending(true);
    // buka widget
    window.$crisp.push(["do", "chat:open"]);
    // kirim pesan awal sebagai user
    window.$crisp.push(["do", "message:send", ["text", msg]]);
    // fokus ke widget
    window.$crisp.push(["do", "chat:show"]);
    setTimeout(() => setSending(false), 600);
  };

  return (
    <div className="mx-auto max-w-xl text-left">
      <label className="block text-sm font-medium text-purple-700">
        Pesan awal
      </label>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={3}
        className="mt-2 w-full rounded-2xl border border-purple-200 bg-white/80 p-3 outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Tulis kebutuhanmu di sini..."
      />
      <p className="mt-2 text-xs text-neutral-600">
        Setelah tombol ditekan, jendela chat akan terbuka. Kamu bisa
        <strong> melampirkan foto langsung di chat</strong>.
      </p>
      <button
        onClick={sendToCrisp}
        disabled={sending}
        className="mt-4 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-60 shadow-lg shadow-purple-600/30 transition"
      >
        {sending ? "Membuka chat..." : "Kirim ke Live Chat"}
      </button>
    </div>
  );
}
