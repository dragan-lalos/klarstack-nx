import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// Import global styles (includes theme tokens and Tailwind)
import '@klastack-nx/shared/tailwind/global.css';

import { AppMain } from './app/main';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <AppMain />
  </StrictMode>,
);
