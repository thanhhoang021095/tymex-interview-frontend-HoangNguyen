/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        ranger: ['var(--font-ranger)']
      },
      colors: {
        primary: 'linear-gradient(91.47deg, #da458f -6%, #da34dd 113.05%)',
        header: '#17161ab2',
        footer: '#17161a',
        'gray-1': '#D6D6D6',
        'gray-2': '#89888B',
        'gray-3': '#3a384199',
        'gray-4': '#3A3841',
        purple: ' #d85697'
      },
      backgroundImage: {
        button: 'var(--primary)',
        'button-hover': 'var(--primary-hover)',
        category: 'var(--primary-category)'
      },
      boxShadow: {
        button: '0 0 3.125rem 0 #bb4bff52'
      }
    }
  },
  variants: {
    extend: {}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwind-scrollbar')]
};
