/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Static brand navy — safe as a background in both modes
        primary: '#1A1A2E',
        // Adaptive semantic tokens (see global.css)
        ink: 'var(--color-ink)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        'success-soft': 'var(--color-success-soft)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        background: 'var(--color-background)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
      },
    },
  },
  plugins: [],
};
