/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"]  
    },
    screens: {
      '2.5xl': { 'max': '1700px'},  
      '2xl': { 'max': '1536px'},
      'xl': { 'max': '1280px'},
      'lg': { 'max': '1024px'},
      'md2': {'max': '900px'},
      'md': { 'max': '768px'},
      'sm': { 'max': '640px'},
      'xsm': {'max': '450px'},
    },
    extend: {
      minWidth: {
        '76': '300px'
      },
      invert: {
        14: '.14'
      },
      minHeight: {
        'screen-minus-80': 'calc(100dvh - 80px)',
      },
    },
  },
  plugins: [],
}