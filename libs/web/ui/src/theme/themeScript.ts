import type { Attribute, ThemeOption } from './ThemeProvider';

export interface ThemeScriptOptions {
  /**
   * The HTML attribute to use for applying the theme.
   * @default 'class'
   */
  attribute?: Attribute;
  
  /**
   * The default theme to use when no stored theme is found.
   * @default 'system'
   */
  defaultTheme?: ThemeOption;
  
  /**
   * Whether to enable system theme preference detection.
   * @default true
   */
  enableSystem?: boolean;
  
  /**
   * The localStorage key to use for reading the theme.
   * Must match the storageKey used in ThemeProvider.
   * @required
   */
  storageKey: string;
}

/**
 * Generates an inline script that sets the initial theme BEFORE React hydration.
 * This prevents the flash of incorrect theme on page load.
 * 
 * The script must be injected in the <head> or early in <body> using dangerouslySetInnerHTML.
 * 
 * @param options - Configuration matching ThemeProvider options
 * @returns String containing the inline script
 * 
 * @example
 * ```tsx
 * // In app/layout.tsx (Next.js)
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <head>
 *         <script
 *           dangerouslySetInnerHTML={{
 *             __html: getThemeScript({
 *               storageKey: 'my-app-theme',
 *               attribute: 'class',
 *               defaultTheme: 'system',
 *               enableSystem: true,
 *             }),
 *           }}
 *         />
 *       </head>
 *       <body>
 *         <ThemeProvider storageKey="my-app-theme">
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function getThemeScript(options: ThemeScriptOptions): string {
  const {
    attribute = 'class',
    defaultTheme = 'system',
    enableSystem = true,
    storageKey,
  } = options;

  // We need to serialize these values into the script
  const params = JSON.stringify({
    attribute,
    defaultTheme,
    enableSystem,
    storageKey,
  });

  // Return an IIFE that executes immediately
  return `(function(){try{var p=${params};var stored=localStorage.getItem(p.storageKey);var theme=stored||p.defaultTheme;var resolved=theme;if(theme==='system'&&p.enableSystem){resolved=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var root=document.documentElement;if(p.attribute==='class'){if(resolved==='dark'){root.classList.add('dark');}else{root.classList.remove('dark');}}else if(p.attribute==='data-theme'){root.dataset.theme=resolved;}}catch(e){}})();`;
}
