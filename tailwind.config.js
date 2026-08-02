/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Dubai-Regular'],
        light: ['Dubai-Light'],
        medium: ['Dubai-Medium'],
        semibold: ['Dubai-Bold'],
        bold: ['Dubai-Bold'],
      },
      colors: {
        primary: 'var(--color-primary)',
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
