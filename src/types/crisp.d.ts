// src/types/crisp.d.ts
export {};

declare global {
  // Pesan text
  type CrispTextMessage = ['text', string];

  // Perintah "do" yang kita pakai
  type CrispDoCommand =
    | ['do', 'chat:open']
    | ['do', 'chat:show']
    | ['do', 'message:send', CrispTextMessage];

  // Perintah "set" (opsional kalau nanti dipakai)
  type CrispSetCommand =
    | ['set', 'user:nickname', [string]]
    | ['set', 'user:email', [string]];

  // Listener event
  type CrispOnCommand = ['on', string, (...args: unknown[]) => void];

  // ➜ Perintah "config" untuk geser widget
  type CrispConfigCommand =
    | ['config', 'position:offset', [number, number]] // [x, y]
    | ['config', 'zindex', [number]];

  // Union semua command
  type CrispCommand =
    | CrispDoCommand
    | CrispSetCommand
    | CrispOnCommand
    | CrispConfigCommand;

  /**
   * $crisp adalah ARRAY queue. Supaya kompatibel, jadikan turunan Array
   * dan override signature push ke variadic.
   */
  type CrispQueue = Array<CrispCommand> & {
    push: (...cmd: CrispCommand[]) => number;
  };

  interface Window {
    $crisp?: CrispQueue;          // bisa undefined sebelum script siap
    CRISP_WEBSITE_ID?: string;
  }
}
