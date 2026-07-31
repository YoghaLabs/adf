export type Locale = "en" | "id";

const en = {
  "welcome.title": "Welcome to ADF",
  "welcome.lead":
    "Studio is a control center, not an IDE or chatbot. Pick a starting path. You can reopen this anytime from Help.",
  "welcome.skip": "Skip for now",
  "welcome.opt.create.title": "Create Workspace",
  "welcome.opt.create.body":
    "Start with the default ADF workspace and learn the control-center layout.",
  "welcome.opt.open.title": "Open Existing Workspace",
  "welcome.opt.open.body": "Switch to a workspace already listed in Studio (SDK-backed list).",
  "welcome.opt.learn.title": "Learn ADF",
  "welcome.opt.learn.body":
    "Read how Studio relates to CLI, Core, and Quick Start — without hype.",
  "welcome.opt.demo.title": "Demo Project",
  "welcome.opt.demo.body":
    "Guided 4-step tour: Dashboard → Runtime → Visual → Marketplace (~5 minutes).",
  "welcome.notify.demo.title": "Demo Project ready",
  "welcome.notify.demo.body":
    "Follow the guided tour. RC1 screens may still use fixture data.",
  "welcome.notify.workspaceReady.title": "Workspace ready",
  "welcome.notify.workspaceReady.body":
    "Using the default Studio workspace. Create real projects with: python -m adf init <name>",
  "welcome.notify.workspaceOpened.title": "Workspace opened",
  "welcome.notify.workspaceOpened.body":
    "Active: {name}. Use the top-bar selector to switch.",
  "welcome.notify.workspaceEmpty.body":
    "No workspaces returned yet — check SDK fixtures / doctor.",

  "demo.badge": "Demo Project · {name}",
  "demo.end": "End",
  "demo.back": "Back",
  "demo.next": "Next",
  "demo.finish": "Finish",
  "demo.stepOf": "Step {n} of {total}",
  "demo.dashboard.title": "1 · Dashboard",
  "demo.dashboard.body":
    "Home overview of workspace health. RC1 may show fixture/demo numbers — that is expected.",
  "demo.runtime.title": "2 · Runtime",
  "demo.runtime.body":
    "Runtime monitor panels. For live CLI health use: python -m adf doctor / boot.",
  "demo.visual.title": "3 · Visual",
  "demo.visual.body":
    "Graphs and visual intelligence views. Explore knowledge/dependency graphs from the sidebar.",
  "demo.marketplace.title": "4 · Marketplace",
  "demo.marketplace.body":
    "Package/registry browsing UI. Install real packages via CLI when needed.",

  "banner.title": "How to operate ADF Studio",
  "banner.body":
    "Studio is a control center over services — not an IDE. Many panels in RC1 still show fixture/demo data so you can explore navigation. Real project creation is done with the CLI",
  "banner.demoActive": " Active demo: {name}.",
  "banner.openWelcome": "Open welcome",
  "banner.replayWelcome": "Replay welcome",
  "banner.help": "Help & Quick Start",

  "help.title": "Help",
  "help.subtitle": "ADF Studio is a control center, not an IDE.",
  "help.intro":
    "Studio communicates only through UI → SDK → Service Layer → ADF Core. Business logic stays in engines and services. Many RC1 panels use fixture data so navigation can be explored before live backends are fully wired for every screen.",
  "help.openWelcome": "Open Welcome Wizard",
  "help.startDemo": "Start Demo Project tour",
  "help.pathTitle": "First-time operating path",
  "help.path.1": "Run Welcome → choose Demo Project (guided tour).",
  "help.path.2": "CLI health:",
  "help.path.3": "Create a real project:",
  "help.path.4": "Return to Studio → Projects / Runtime / Visual / Marketplace.",
  "help.docs": "Docs:",

  "settings.title": "Settings",
  "settings.subtitle": "Theme, language, channels, registry, SDK, updates.",
  "settings.theme": "Theme",
  "settings.theme.dark": "Dark",
  "settings.theme.light": "Light",
  "settings.theme.system": "System",
  "settings.language": "Language",
  "settings.channels": "Channels",
  "settings.registry": "Registry",
  "settings.demoMode": "Force Demo fixtures",
  "settings.demoMode.help":
    "When enabled, Studio skips Live Core and uses fixture data (FO-5 Demo Mode).",
} as const;

export type MessageKey = keyof typeof en;

const id: Record<MessageKey, string> = {
  "welcome.title": "Selamat datang di ADF",
  "welcome.lead":
    "Studio adalah pusat kendali, bukan IDE atau chatbot. Pilih jalur mulai. Anda bisa membuka ulang kapan saja dari Bantuan.",
  "welcome.skip": "Lewati dulu",
  "welcome.opt.create.title": "Buat Workspace",
  "welcome.opt.create.body":
    "Mulai dengan workspace ADF default dan pelajari tata letak pusat kendali.",
  "welcome.opt.open.title": "Buka Workspace yang Ada",
  "welcome.opt.open.body":
    "Pindah ke workspace yang sudah terdaftar di Studio (daftar dari SDK).",
  "welcome.opt.learn.title": "Pelajari ADF",
  "welcome.opt.learn.body":
    "Baca hubungan Studio dengan CLI, Core, dan Quick Start — tanpa hype.",
  "welcome.opt.demo.title": "Proyek Demo",
  "welcome.opt.demo.body":
    "Tur terpandu 4 langkah: Dashboard → Runtime → Visual → Marketplace (~5 menit).",
  "welcome.notify.demo.title": "Proyek Demo siap",
  "welcome.notify.demo.body":
    "Ikuti tur terpandu. Layar RC1 mungkin masih memakai data fixture.",
  "welcome.notify.workspaceReady.title": "Workspace siap",
  "welcome.notify.workspaceReady.body":
    "Memakai workspace Studio default. Buat proyek nyata dengan: python -m adf init <nama>",
  "welcome.notify.workspaceOpened.title": "Workspace dibuka",
  "welcome.notify.workspaceOpened.body":
    "Aktif: {name}. Gunakan pemilih di bilah atas untuk beralih.",
  "welcome.notify.workspaceEmpty.body":
    "Belum ada workspace — periksa fixture SDK / doctor.",

  "demo.badge": "Proyek Demo · {name}",
  "demo.end": "Selesai",
  "demo.back": "Kembali",
  "demo.next": "Lanjut",
  "demo.finish": "Selesai tur",
  "demo.stepOf": "Langkah {n} dari {total}",
  "demo.dashboard.title": "1 · Dashboard",
  "demo.dashboard.body":
    "Ringkasan kesehatan workspace. RC1 boleh menampilkan angka fixture/demo — itu wajar.",
  "demo.runtime.title": "2 · Runtime",
  "demo.runtime.body":
    "Panel monitor runtime. Untuk kesehatan CLI langsung: python -m adf doctor / boot.",
  "demo.visual.title": "3 · Visual",
  "demo.visual.body":
    "Grafik dan tampilan visual intelligence. Jelajahi graf pengetahuan/dependensi dari sidebar.",
  "demo.marketplace.title": "4 · Marketplace",
  "demo.marketplace.body":
    "UI jelajah paket/registry. Instal paket nyata lewat CLI bila perlu.",

  "banner.title": "Cara mengoperasikan ADF Studio",
  "banner.body":
    "Studio adalah pusat kendali atas layanan — bukan IDE. Banyak panel RC1 masih menampilkan data fixture/demo agar navigasi bisa dijelajahi. Pembuatan proyek nyata dilakukan lewat CLI",
  "banner.demoActive": " Demo aktif: {name}.",
  "banner.openWelcome": "Buka selamat datang",
  "banner.replayWelcome": "Putar ulang selamat datang",
  "banner.help": "Bantuan & Quick Start",

  "help.title": "Bantuan",
  "help.subtitle": "ADF Studio adalah pusat kendali, bukan IDE.",
  "help.intro":
    "Studio berkomunikasi hanya lewat UI → SDK → Service Layer → ADF Core. Logika bisnis tetap di engine dan service. Banyak panel RC1 memakai data fixture agar navigasi bisa dijelajahi sebelum backend live siap untuk setiap layar.",
  "help.openWelcome": "Buka Wizard Selamat Datang",
  "help.startDemo": "Mulai tur Proyek Demo",
  "help.pathTitle": "Jalur operasi pertama kali",
  "help.path.1": "Jalankan Selamat Datang → pilih Proyek Demo (tur terpandu).",
  "help.path.2": "Kesehatan CLI:",
  "help.path.3": "Buat proyek nyata:",
  "help.path.4": "Kembali ke Studio → Projects / Runtime / Visual / Marketplace.",
  "help.docs": "Docs:",

  "settings.title": "Pengaturan",
  "settings.subtitle": "Tema, bahasa, channel, registry, SDK, pembaruan.",
  "settings.theme": "Tema",
  "settings.theme.dark": "Gelap",
  "settings.theme.light": "Terang",
  "settings.theme.system": "Sistem",
  "settings.language": "Bahasa",
  "settings.channels": "Channel",
  "settings.registry": "Registry",
  "settings.demoMode": "Paksa Demo fixtures",
  "settings.demoMode.help":
    "Jika aktif, Studio melewati Live Core dan memakai data fixture (FO-5 Demo Mode).",
};

const catalogs: Record<Locale, Record<MessageKey, string>> = { en, id };

export function resolveLocale(language: string): Locale {
  return language === "id" ? "id" : "en";
}

export function t(
  language: string,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const locale = resolveLocale(language);
  let text = catalogs[locale][key] ?? en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
