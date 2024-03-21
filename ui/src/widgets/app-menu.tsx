import { Divider } from 'antd';
import { useReducer } from 'react';
import { Icon } from '~/shared/ui/icon';
import { PrimaryButton } from '~/shared/ui/primary-button';

export const AppMenu = () => {
    const [isDropdownVisible, toggle] = useReducer((state) => !state, false);

    return (
        <section className='relative'>
            <PrimaryButton
                content={
                    <Icon
                        section='primary'
                        name='menu'
                        className='w-[24px] h-[22px] lg:w-[17px] lg:h-[17px]'
                    />
                }
                onClick={toggle}
            />
            <Dropdown isVisible={isDropdownVisible} toggle={toggle} />
        </section>
    );
};

const Dropdown = ({ isVisible }: { toggle: () => void; isVisible: boolean }) => {
    return (
        <div
            style={{ display: isVisible ? 'flex' : 'none' }}
            className='bg-white shadow-box flex-col gap-y-[0.4rem] p-2 absolute top-11 lg:top-10 left-0 rounded-[4px]'
        >
            <PrimaryButton
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
            <PrimaryButton
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

            <PrimaryButton
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
            <PrimaryButton
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
            <PrimaryButton type='transparent' size='lg' content={`Sign In`} className='w-full' />
        </div>
    );
};
