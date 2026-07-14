/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",

        surface: "var(--surface)",
        "surface-secondary": "var(--surface-secondary)",

        border: "var(--border)",

        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",

        sidebar: "var(--sidebar)",
      },

      borderRadius: {
        xs: "calc(var(--radius-sm) - 2px)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "calc(var(--radius-lg) + 4px)",
        "2xl": "calc(var(--radius-lg) + 8px)",
        full: "9999px",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",

        glow: `
          0 0 24px rgba(120, 119, 255, 0.15),
          0 0 64px rgba(59, 130, 246, 0.12)
        `,

        card: `
          0 4px 20px rgba(0, 0, 0, 0.35)
        `,

        purple: `
          0 0 30px rgba(168, 85, 247, 0.25)
        `,

        blue: `
          0 0 30px rgba(59, 130, 246, 0.2)
        `,
      },

      backgroundImage: {
        "hero-gradient": `
          radial-gradient(
            circle at top,
            rgba(139, 92, 246, 0.16),
            transparent 35%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(59, 130, 246, 0.14),
            transparent 35%
          )
        `,

        "card-gradient": `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.04),
            rgba(255,255,255,0.01)
          )
        `,
      },

      backdropBlur: {
        xs: "2px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
};