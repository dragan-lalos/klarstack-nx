// Core utilities
export * from './cn';
export * from './tokens';

// Tailwind preset
export { tailwindPreset } from './tailwind.preset';

// Note: Global CSS should be imported directly in your app's main entry point
// import it via relative path, e.g.:
// import '../../../libs/shared/tailwind/src/global.css';

// Note: buildConfig is for build-time use only (Tailwind config files)
// Import it directly: require('../../libs/web/ui-utils/src/tailwind.config.js')
