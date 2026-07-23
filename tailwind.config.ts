import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#0A0E1A',
        surface: '#111827',
        'surface-muted': '#1A2332',
        'nav-bg': '#0F172A',
        ink: '#F1F5F9',
        'ink-muted': '#9CA8BA',
        'ink-faint': '#8A95A6',
        border: '#1F2937',
        'border-strong': '#374151',
        accent: '#3B82F6',
        'accent-hover': '#60A5FA',
        'accent-soft': '#16243C',
        'accent-text': '#93C5FD',
      },
    },
  },
  plugins: [],
}
export default config
