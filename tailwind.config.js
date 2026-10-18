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
        tone: {
          violet: 'rgb(var(--tone-violet) / <alpha-value>)',
          teal: 'rgb(var(--tone-teal) / <alpha-value>)',
          amber: 'rgb(var(--tone-amber) / <alpha-value>)',
          rose: 'rgb(var(--tone-rose) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)'
        },
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
        'soft-sm': '0 1px 2px rgb(var(--foreground) / 0.06)',
        'soft': '0 2px 8px rgb(var(--foreground) / 0.08)',
        'soft-lg': '0 8px 24px rgb(var(--foreground) / 0.10)',
        'soft-xl': '0 16px 40px rgb(var(--foreground) / 0.12)',
        'soft-primary': '0 2px 8px rgb(var(--primary) / 0.25)',
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
