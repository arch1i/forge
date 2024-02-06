import compose from 'compose-function';
import { withAntdConfig } from '~/app/providers/with-antd-config';
import { withStore } from '~/app/providers/with-store';

export const withProviders = compose(withAntdConfig, withStore);
