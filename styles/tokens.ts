/**
 * Design tokens — Hepburn Advisory Ledger (dark) surface.
 * Mirrors enterprise-ai-ledger design system.
 */

export const palette = {
  paper: "#0A0E1A",
  surface: "#111827",
  surfaceMuted: "#1A2332",
  navBg: "#0F172A",
  ink: "#F1F5F9",
  inkMuted: "#9CA8BA",
  inkFaint: "#8A95A6",
  border: "#1F2937",
  borderStrong: "#374151",
  accent: "#3B82F6",
  accentHover: "#60A5FA",
  accentSoft: "#16243C",
  accentText: "#93C5FD",
} as const;

export const status = {
  green: { fg: "#4ADE80", soft: "#10271B", solid: "#22C55E", label: "Green" },
  amber: { fg: "#FBBF24", soft: "#2C2310", solid: "#F59E0B", label: "Amber" },
  red: { fg: "#F87171", soft: "#2C1718", solid: "#EF4444", label: "Red" },
  grey: { fg: "#94A3B8", soft: "#1C2430", solid: "#64748B", label: "Grey" },
} as const;

export const decisionColor = {
  scale: status.green,
  fix: status.amber,
  pause: status.amber,
  stop: status.red,
  discover: status.grey,
} as const;

export const costTypeColor = {
  licences: "#3B82F6",
  tokens: "#22D3EE",
  cloud: "#818CF8",
  integration: "#38BDF8",
  people: "#64748B",
} as const;

export const typography = {
  sans: 'var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif)',
  numericFeatures: '"tnum" 1, "lnum" 1',
  eyebrowTracking: "0.08em",
} as const;
