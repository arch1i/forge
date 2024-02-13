import compose from 'compose-function';
import { withStore } from './with-store';
import { withMantine } from './with-mantine';

export const withProviders = compose(withMantine, withStore);
