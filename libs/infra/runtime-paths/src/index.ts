/**
 * Runtime TypeScript path alias registration for Node.js apps.
 *
 * This package provides a pre-generated, build-time solution for resolving
 * TypeScript path aliases in compiled Node.js applications without needing
 * to read tsconfig.json at runtime.
 *
 * Usage:
 *   Import at the top of your main.ts (using relative path):
 *
 *   import '../../../libs/infra/runtime-paths/src/index';
 *
 *   Or use as Node.js preload:
 *
 *   node -r ./dist/libs/infra/runtime-paths/src/index.js ./dist/apps/your-app/main.js
 *
 * The paths are automatically registered when the module is loaded (side effect).
 * The registerRuntimeTsPaths function is also exported for explicit control if needed.
 */

// Side effect: auto-register paths on module load
import './lib/register-paths';

// Export for explicit control (optional)
export { registerRuntimeTsPaths } from './lib/register-paths';
