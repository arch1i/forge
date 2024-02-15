import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export const withAntdConfig = (component: () => ReactNode) => () => {
    return (
        <ConfigProvider
            wave={{ disabled: true }}
            theme={{
                token: {
                    fontFamily: 'Exo',
                    motion: false,
                },
            }}
        >
            {component()}
        </ConfigProvider>
    );
};
