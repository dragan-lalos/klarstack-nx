import { tailwindPreset } from './libs/shared/tailwind/src/tailwind.preset';

import type { Config } from 'tailwindcss';

/**
 * Monorepo Tailwind configuration.
 *
 * Tailwind v4 resolves the nearest `tailwind.config.*` by walking up from the
 * CSS file currently being processed. Since our global stylesheet lives in
 * `libs/shared/tailwind/src/global.css`, we need a repo-root config so Tailwind
 * can consistently discover theme tokens (e.g. `border-border`) from anywhere
 * in the workspace.
 */
const config: Config = {
  presets: [tailwindPreset],
  content: ['./index.html', './apps/**/*.{html,js,jsx,ts,tsx}', './libs/**/*.{js,jsx,ts,tsx}'],
};

export default config;
