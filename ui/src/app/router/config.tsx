import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '~/app/layouts/base-layout';
import { Pages } from './pages';

export const appRouter = () =>
    createBrowserRouter([
        {
            element: <BaseLayout />,
            children: [
                {
                    path: '/',
                    element: <Pages.Board />,
                },

                {
                    path: '/access-denied',
                    element: <Pages.AccessDenied />,
                },
            ],
        },
        {},
    ]);
