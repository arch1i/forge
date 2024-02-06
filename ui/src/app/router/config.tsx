import { createBrowserRouter } from 'react-router-dom';
import { WithAuthLayout } from '~/app/layouts/with-auth.layout';
import { Pages } from './pages';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <WithAuthLayout />,
      children: [
        {
          path: '/sign-in',
          element: <Pages.SignIn />,
        },
        {
          path: '/access-denied',
          element: <Pages.AccessDenied />,
        },
      ],
    },
    {},
  ]);
