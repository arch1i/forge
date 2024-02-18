import { Divider } from 'antd';
import { useReducer } from 'react';
import { Icon } from '~/shared/ui/icon';
import { MenuButton } from '~/shared/ui/menu-button';

export const AppMenu = () => {
    const [isDropdownVisible, toggle] = useReducer((state) => !state, false);

    return (
        <section className='relative'>
            <MenuButton
                content={<Icon section='primary' name='menu' className='w-[17px] h-[17px]' />}
                onClick={toggle}
            />
            {isDropdownVisible && <Menu />}
        </section>
    );
};

const Menu = () => {
    return (
        <div className='bg-white shadow-box flex flex-col gap-y-[0.4rem] p-2 absolute top-10 left-0 rounded-[4px]'>
            <MenuButton
                type='transparent'
                size='lg'
                disabled
                content={
                    <div className='flex items-center justify-left'>
                        <Icon
                            section='primary'
                            name='plus'
                            className=' -ml-[4px] w-[20px] h-[20px] mr-[5px] -mt-[2px]'
                        />
                        <span>New workspace</span>
                    </div>
                }
                className='w-full'
            />
            <MenuButton
                type='transparent'
                size='lg'
                disabled
                content={
                    <div className='flex items-center justify-left'>
                        <Icon
                            section='primary'
                            name='list'
                            className='w-[13px] h-[13px] mr-[8px] -mt-[2px]'
                        />
                        <span>Workspaces</span>
                    </div>
                }
                className='w-full'
            />

            <MenuButton
                type='transparent'
                size='lg'
                content={
                    <div className='flex items-center justify-left'>
                        <Icon
                            section='primary'
                            name='trash'
                            className='w-[13px] h-[13px] mr-[8px] -mt-[2px]'
                        />
                        <span>Reset the canvas</span>
                    </div>
                }
                className='w-full'
            />
            <Divider style={{ margin: 0 }} className='w-full' />
            <MenuButton
                type='transparent'
                size='lg'
                content={
                    <a
                        className='flex items-center justify-left'
                        target='_blank'
                        href='https://github.com/alexphloyd/forge'
                    >
                        <Icon
                            section='primary'
                            name='github'
                            className='w-[13px] h-[13px] mr-[8px] -mt-[3px]'
                        />
                        <span>GitHub</span>
                    </a>
                }
                className='w-full'
            />
            <Divider style={{ margin: 0 }} className='w-full' />
            <MenuButton type='transparent' size='lg' content={`Sign In`} className='w-full' />
        </div>
    );
};
