/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
        headline: 'rgb(var(--foreground) / <alpha-value>)',
        paragraph: 'rgb(var(--secondary) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        popover: 'rgb(var(--popover) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        'brutal': '4px 4px 0px rgb(var(--shadow-color, 10 10 10) / 1)',
        'brutal-sm': '2px 2px 0px rgb(var(--shadow-color, 10 10 10) / 1)',
        'brutal-lg': '6px 6px 0px rgb(var(--shadow-color, 10 10 10) / 1)',
        'brutal-xl': '8px 8px 0px rgb(var(--shadow-color, 10 10 10) / 1)',
        'brutal-primary': '4px 4px 0px rgb(var(--primary) / 1)',
        'none': 'none',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'brutalist-reveal': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' }
        },
        'brutalist-slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'brutal-reveal': 'brutalist-reveal 0.4s ease-out forwards',
        'brutal-slide-up': 'brutalist-slide-up 0.3s ease-out forwards',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
