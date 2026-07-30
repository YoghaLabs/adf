/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "hsl(var(--canvas))",
          elevated: "hsl(var(--canvas-elevated))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted: "hsl(var(--ink-muted))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        line: "hsl(var(--line))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
      },
      fontFamily: {
        display: ["\"Segoe UI Variable\"", "\"Segoe UI\"", "system-ui", "sans-serif"],
        sans: ["\"Segoe UI\"", "system-ui", "sans-serif"],
        mono: ["\"Cascadia Code\"", "Consolas", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 0 hsl(var(--line) / 0.8), 0 12px 32px hsl(220 40% 4% / 0.18)",
      },
    },
  },
  plugins: [],
};
