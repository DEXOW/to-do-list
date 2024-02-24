/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'gray-1000': '#3D3D3D',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

