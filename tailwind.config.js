/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        primary: '#1f8fff',
        'primary-hover': '#4da3ff',
        'background-light': '#f5f7f8',
        'background-dark': '#0f1923',
        'card-dark': '#15202b',
        'surface-dark': '#172636',
        'sidebar-dark': '#0b1219',
        'border-dark': '#2e4d6b',
        success: '#0bda5b',
        warning: '#ffb020',
        danger: '#ef4444',
        'accent-blue': '#0B3C5D',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
