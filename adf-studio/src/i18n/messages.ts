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

  "nav.dashboard": "Dashboard",
  "nav.workspace": "Workspace",
  "nav.projects": "Projects",
  "nav.sessions": "Sessions",
  "nav.identity": "Identity",
  "nav.collaboration": "Collaboration",
  "nav.orchestration": "Orchestration",
  "nav.enterprise": "Enterprise",
  "nav.visual": "Visual",
  "nav.runtime": "Runtime",
  "nav.marketplace": "Marketplace",
  "nav.knowledge": "Knowledge",
  "nav.packages": "Packages",
  "nav.templates": "Templates",
  "nav.settings": "Settings",
  "nav.search": "Search",
  "nav.release": "Release",
  "nav.help": "Help",

  "shell.product": "ADF Studio",
  "shell.controlCenter": "Control Center",
  "shell.searchPlaceholder": "Search projects, packages, knowledge…",
  "shell.searchAria": "Global search",
  "shell.toggleSidebar": "Toggle sidebar",
  "shell.welcome": "Welcome",
  "shell.command": "Command",
  "shell.notifications": "Notifications",
  "shell.liveCore": "Live Core",
  "shell.demoFixtures": "Demo fixtures",
  "shell.bridgeTitle": "Studio → Core transport",
  "shell.language": "Language",
  "shell.runtimeHealthy": "healthy",
  "shell.runtimeUnknown": "unknown",
  "shell.runtimeLabel": "Runtime {status} · plugins {plugins}",

  "common.loading": "Loading…",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.create": "Create",
  "common.delete": "Delete",
  "common.refresh": "Refresh",
  "common.signOut": "Sign out",
  "common.login": "Login",
  "common.profile": "Profile",
  "common.security": "Security",
  "common.select": "Select",
  "common.empty": "Empty",
  "common.none": "None",

  "dashboard.title": "Dashboard",
  "dashboard.subtitle": "Workspace health overview for the ADF control center.",

  "projects.title": "Projects",
  "projects.subtitle":
    "Project Explorer — tree, cards, recent, favorites, pinned, archived, status.",

  "runtime.title": "AI Runtime Dashboard",
  "runtime.subtitle":
    "Read-only observability — prompts, context, plugins, packages, health, tokens, jobs.",

  "identity.title": "Identity",
  "identity.subtitle":
    "Enterprise Identity Platform — Better Auth · Organization · RBAC · Sessions · Audit",
  "identity.signedIn": "Signed in",
  "identity.demoSession": "Demo session",
  "identity.liveSession": "Live Better Auth session",
  "identity.health": "Identity health",
  "identity.healthUnavailable": "Identity layer unavailable",
  "identity.quickLinks": "Quick links",
  "identity.organizations": "Organizations",
  "identity.workspaces": "Workspaces",
  "identity.roles": "Roles",
  "identity.rbac": "RBAC",
  "identity.rbacMeta": "{roles} roles · {permissions} permissions",
  "identity.sessions": "Sessions",
  "identity.tokens": "API tokens",
  "identity.audit": "Immutable audit",
  "identity.devices": "Devices / sessions",
  "identity.invitations": "Invitations",
  "identity.pat": "Personal access tokens",
  "identity.mint": "Mint",
  "identity.noOrganizations": "No organizations yet",
  "identity.selectOrg": "Select or create an organization",
  "identity.noEvents": "No audit events",
  "identity.active": "active",
  "identity.hub": "Identity hub",
} as const;

export type MessageKey = keyof typeof en;

/** All catalog keys (EN is source of truth; ID is typed as Record<MessageKey, string>). */
export const messageKeys = Object.keys(en) as MessageKey[];

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
  "help.path.4": "Kembali ke Studio → Proyek / Runtime / Visual / Marketplace.",
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

  "nav.dashboard": "Dasbor",
  "nav.workspace": "Workspace",
  "nav.projects": "Proyek",
  "nav.sessions": "Sesi",
  "nav.identity": "Identitas",
  "nav.collaboration": "Kolaborasi",
  "nav.orchestration": "Orkestrasi",
  "nav.enterprise": "Enterprise",
  "nav.visual": "Visual",
  "nav.runtime": "Runtime",
  "nav.marketplace": "Marketplace",
  "nav.knowledge": "Pengetahuan",
  "nav.packages": "Paket",
  "nav.templates": "Template",
  "nav.settings": "Pengaturan",
  "nav.search": "Cari",
  "nav.release": "Rilis",
  "nav.help": "Bantuan",

  "shell.product": "ADF Studio",
  "shell.controlCenter": "Pusat Kendali",
  "shell.searchPlaceholder": "Cari proyek, paket, pengetahuan…",
  "shell.searchAria": "Pencarian global",
  "shell.toggleSidebar": "Lipat bilah sisi",
  "shell.welcome": "Selamat datang",
  "shell.command": "Perintah",
  "shell.notifications": "Notifikasi",
  "shell.liveCore": "Core Live",
  "shell.demoFixtures": "Fixture Demo",
  "shell.bridgeTitle": "Transport Studio → Core",
  "shell.language": "Bahasa",
  "shell.runtimeHealthy": "sehat",
  "shell.runtimeUnknown": "tidak diketahui",
  "shell.runtimeLabel": "Runtime {status} · plugin {plugins}",

  "common.loading": "Memuat…",
  "common.save": "Simpan",
  "common.cancel": "Batal",
  "common.create": "Buat",
  "common.delete": "Hapus",
  "common.refresh": "Muat ulang",
  "common.signOut": "Keluar",
  "common.login": "Masuk",
  "common.profile": "Profil",
  "common.security": "Keamanan",
  "common.select": "Pilih",
  "common.empty": "Kosong",
  "common.none": "Tidak ada",

  "dashboard.title": "Dasbor",
  "dashboard.subtitle": "Ringkasan kesehatan workspace untuk pusat kendali ADF.",

  "projects.title": "Proyek",
  "projects.subtitle":
    "Penjelajah Proyek — pohon, kartu, terkini, favorit, pin, arsip, status.",

  "runtime.title": "Dasbor Runtime AI",
  "runtime.subtitle":
    "Observabilitas baca-saja — prompt, konteks, plugin, paket, kesehatan, token, job.",

  "identity.title": "Identitas",
  "identity.subtitle":
    "Platform Identitas Enterprise — Better Auth · Organisasi · RBAC · Sesi · Audit",
  "identity.signedIn": "Masuk sebagai",
  "identity.demoSession": "Sesi demo",
  "identity.liveSession": "Sesi Better Auth live",
  "identity.health": "Kesehatan identitas",
  "identity.healthUnavailable": "Lapisan identitas tidak tersedia",
  "identity.quickLinks": "Tautan cepat",
  "identity.organizations": "Organisasi",
  "identity.workspaces": "Workspace",
  "identity.roles": "Peran",
  "identity.rbac": "RBAC",
  "identity.rbacMeta": "{roles} peran · {permissions} izin",
  "identity.sessions": "Sesi",
  "identity.tokens": "Token API",
  "identity.audit": "Audit immutable",
  "identity.devices": "Perangkat / sesi",
  "identity.invitations": "Undangan",
  "identity.pat": "Personal access token",
  "identity.mint": "Buat",
  "identity.noOrganizations": "Belum ada organisasi",
  "identity.selectOrg": "Pilih atau buat organisasi",
  "identity.noEvents": "Tidak ada peristiwa audit",
  "identity.active": "aktif",
  "identity.hub": "Pusat Identitas",
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

/** Nav id → message key helper */
export function navKey(id: string): MessageKey | null {
  const key = `nav.${id}` as MessageKey;
  return key in en ? key : null;
}
