import compose from 'compose-function';
import { withStore } from './with-store';
import { withAntdConfig } from './with-antd';

export const withProviders = compose(withAntdConfig, withStore);
