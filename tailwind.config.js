module.exports = {
  purge: {
    content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    options: {
      whitelist: ['bg-blue-600', 'bg-blue-800', 'bg-red-200', 'bg-red-600', 'bg-red-800', 'bg-green-200', 'bg-green-800'],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
