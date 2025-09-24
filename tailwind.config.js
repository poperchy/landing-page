/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'text-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #DEE6FF 100%)',
      },
      colors: {
        main: '#52098B',
        checkbox: {
          text: '#BBC6F2',
          bg: '#F1F3F6',
          border: '#E8EAF0',
          checked: '#5AB828',
        },
        input: {
          text: '#000000',
          placeholder: '#777B8B',
          label: '#BBC6F2',
          bg: '#F1F3F6',
        },
        border: {
          input: '#E8EAF0',
        },
        btn: {
          default: '#5AB828',
          hover: '#4BD700',
          active: '#4DA41E',
          shadowHover: '0px 0px 15px 0px rgba(75, 215, 0, 0.5)',
        }
      },
      boxShadow: {
        'btn-shadow-hover': '0px 0px 15px 0px rgba(75, 215, 0, 0.5)',
      },
      dropShadow: {
        'custom': '0px 3px  0px rgba(0, 0, 0, 1)',
        'customLarge': '0px 18px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill-stroke')
  ],
};
