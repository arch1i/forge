import { WithProviders } from './providers/compose';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/config';

export const ComposedApp = WithProviders(() => <RouterProvider router={appRouter()} />);
