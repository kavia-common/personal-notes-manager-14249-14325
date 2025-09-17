import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-600': '#1d4ed8',
        secondary: '#F59E0B',
        'secondary-600': '#d97706',
        error: '#EF4444',
      }
    },
  },
  plugins: [forms],
}
