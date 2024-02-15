import { Layout } from '~/shared/ui/layout';

export const WithAuthLayout = () => {
    return <Layout showSidebar={false} isGlobalLoading={false} sidebarSlot={<div></div>} />;
};
