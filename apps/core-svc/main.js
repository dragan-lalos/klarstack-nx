/**
 * Docker/runtime entrypoint wrapper.
 *
 * Nx emits compiled sources to:
 *   dist/apps/core-svc/src/main.js
 *
 * This file is copied to:
 *   dist/apps/core-svc/main.js
 *
 * so Docker can run:
 *   node dist/apps/core-svc/main.js
 */
'use strict';

require('./src/main.js');
