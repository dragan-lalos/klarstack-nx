/**
 * Klastack-nx Security Platform - Theme Tokens
 * "Hard Truth" Color Palette
 *
 * Primary Charcoal (#121212) - Gravity, Sophistication, Finality
 * Signal Navy (#000033) - Institutional Trust, Depth, Oceanic Security
 * Tactical Gray (#64748B) - Professional Neutrality, Technical Rigor
 * Absolute White (#FFFFFF) - Total Transparency, Clarity, Precision
 *
 * Typography:
 * - Inter: Primary sans-serif (Bold 700 for headings, Regular 400 for body)
 * - JetBrains Mono: Technical monospace for metadata and code
 */

export const themeTokens = {
  colors: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    // Direct "Hard Truth" palette references
    charcoal: '#121212',
    navy: '#000033',
    tactical: '#64748B',
    white: '#FFFFFF',
  },
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Courier New', 'monospace'],
  },
} as const;

/**
 * Light theme CSS variable values (HSL format without hsl())
 * Uses "Absolute White" base with "Hard Truth" dark accents
 */
export const lightTheme = {
  background: '0 0% 100%', // Absolute White #FFFFFF
  foreground: '0 0% 7.1%', // Primary Charcoal #121212
  card: '0 0% 100%',
  cardForeground: '0 0% 7.1%',
  popover: '0 0% 100%',
  popoverForeground: '0 0% 7.1%',
  primary: '240 100% 10%', // Signal Navy #000033
  primaryForeground: '0 0% 100%',
  secondary: '215 20% 96%',
  secondaryForeground: '0 0% 7.1%',
  muted: '215 20% 97%',
  mutedForeground: '215 16.3% 46.9%', // Tactical Gray #64748B
  accent: '240 100% 97%',
  accentForeground: '240 100% 10%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '0 0% 100%',
  border: '215 20% 88%',
  input: '215 20% 88%',
  ring: '240 100% 10%', // Signal Navy
  radius: '0.5rem',
} as const;

/**
 * Dark theme CSS variable values (HSL format without hsl())
 * Uses "Primary Charcoal" base with navy depth
 */
export const darkTheme = {
  background: '0 0% 7.1%', // Primary Charcoal #121212
  foreground: '0 0% 100%', // Absolute White #FFFFFF
  card: '0 0% 10%',
  cardForeground: '0 0% 100%',
  popover: '0 0% 10%',
  popoverForeground: '0 0% 100%',
  primary: '240 100% 10%', // Signal Navy #000033
  primaryForeground: '0 0% 100%',
  secondary: '215 16% 20%',
  secondaryForeground: '0 0% 100%',
  muted: '215 16% 18%',
  mutedForeground: '215 16.3% 46.9%', // Tactical Gray #64748B
  accent: '240 100% 12%',
  accentForeground: '0 0% 100%',
  destructive: '0 62.8% 50%',
  destructiveForeground: '0 0% 100%',
  border: '215 16% 22%',
  input: '215 16% 22%',
  ring: '215 16.3% 46.9%', // Tactical Gray
} as const;

/**
 * Type-safe theme token keys
 */
export type ThemeToken = keyof typeof lightTheme;
