/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: '#030816',
          secondary: '#070F26',
          tertiary: '#0B1736',
        },
        surface: {
          DEFAULT: '#0B1736',
          elevated: '#10224D',
          card: 'rgba(11, 23, 54, 0.8)',
        },
        accent: {
          blue: '#0066FF',
          'blue-light': '#3395FF',
          'blue-vibrant': '#0C83FF',
          navy: '#02042B',
          teal: '#00D2B4',
          amber: '#0066FF', // remap primary amber to electric blue
          'amber-light': '#3395FF',
          purple: '#528FF0',
          rose: '#FF5D5D',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 102, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(51, 149, 255, 0.7))' },
        }
      }
    },
  },
  plugins: [],
}
