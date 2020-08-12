module.exports = {
  purge: {
    content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    options: {
      whitelist: ['bg-blue-800', 'bg-red-200', 'bg-red-800', 'bg-green-200', 'bg-green-800'],
    },
  },
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
      },
    },
  },
  variants: {},
  plugins: [],
};
