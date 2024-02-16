import { Icon } from '~/shared/ui/icon';
import { Layout } from '~/shared/ui/layout';
import { MenuButton } from '~/shared/ui/menu-button';

export const BaseLayout = () => {
    return (
        <Layout
            showSidebar={false}
            isGlobalLoading={false}
            appMenuButtonSlot={
                <MenuButton
                    content={<Icon section='primary' name='menu' className='w-[17px] h-[17px]' />}
                />
            }
        />
    );
};
