import compose from 'compose-function';
import { WithStore } from './with-store';
import { WithAntdConfig } from './with-antd';

export const WithProviders = compose(WithAntdConfig, WithStore);
