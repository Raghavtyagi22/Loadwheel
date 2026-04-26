/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', 50: '#EFF6FF', 100: '#DBEAFE', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 900: '#1E3A8A' },
        navy: { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#334155', 600: '#475569', 400: '#94A3B8', 300: '#CBD5E1', 200: '#E2E8F0', 100: '#F1F5F9' },
        success: { DEFAULT: '#22C55E', 50: '#F0FDF4', 500: '#22C55E', 600: '#16A34A' },
        warning: { DEFAULT: '#F59E0B', 50: '#FFFBEB', 500: '#F59E0B' },
        danger: { DEFAULT: '#EF4444', 50: '#FEF2F2', 500: '#EF4444' },
        surface: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px'
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        elevated: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.07)',
        modal: '0 20px 60px -10px rgba(0,0,0,0.18)',
        glow: '0 0 0 3px rgba(37,99,235,0.15)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        shimmer: 'shimmer 1.5s infinite'
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } }
      }
    }
  },
  plugins: []
}
