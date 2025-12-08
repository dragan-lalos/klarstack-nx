import { tailwindPreset } from '@klastack-nx/shared-tailwind';

import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [tailwindPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    '@klastack-nx/web/**/*.{ts,tsx,js,jsx}',
    '@klastack-nx/shared/**/*.{ts,tsx,js,jsx}',
  ],
};

export default config;
