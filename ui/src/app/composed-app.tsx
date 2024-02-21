import { withProviders } from './providers/compose';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/config';

export const ComposedApp = withProviders(() => <RouterProvider router={appRouter()} />);
