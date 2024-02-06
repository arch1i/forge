import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { withProviders } from './providers/compose';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/config';

import './styles/index.css';

const ComposedApp = withProviders(() => <RouterProvider router={appRouter()} />);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ComposedApp />
  </StrictMode>,
);
