import { Layout } from '~/shared/ui/layout';
import { AppMenu } from '~/widgets/app-menu';

export const BaseLayout = () => {
    return <Layout isAppLoading={false} appMenuButtonSlot={<AppMenu />} />;
};
