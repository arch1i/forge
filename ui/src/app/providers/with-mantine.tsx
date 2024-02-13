import { MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

export const withMantine = (component: () => ReactNode) => () => {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Exo',
      }}
    >
      {component()}
    </MantineProvider>
  );
};
