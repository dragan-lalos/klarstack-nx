/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/web',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4200,
      host: 'localhost',
    },
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    css: {
      postcss: './postcss.config.cjs',
    },
    optimizeDeps: {
      exclude: [
        '@nx/devkit',
        '@nx/nx-darwin-arm64',
        '@nx/nx-darwin-x64',
        '@nx/nx-linux-x64-gnu',
        '@nx/nx-linux-x64-musl',
        '@nx/nx-win32-x64-msvc',
        '@swc/core',
        '@swc/core-darwin-arm64',
        '@swc-node/register',
        '@angular-devkit/architect',
        '@angular-devkit/architect/node',
        '@nx/powerpack-license',
        '@nx/key',
        '@swc/wasm',
        'nx',
      ],
    },
    // Uncomment this if you are using workers.
    // worker: {
    //   plugins: () => [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/apps/web',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      name: 'web',
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/web',
        provider: 'v8' as const,
      },
    },
  };
});
