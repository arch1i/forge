import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Loader } from './preloader';
import { type ReactNode } from 'react';

interface Props {
    isAppLoading: boolean;
    appMenuButtonSlot?: ReactNode;
}

export function Layout({ isAppLoading, appMenuButtonSlot }: Props) {
    return (
        <>
            {isAppLoading ? (
                <Loader size='md' color='blue' className='absolute top-[45vh] left-[50%]' />
            ) : (
                <main className='flex flex-row relative font-sans select-none touch-none overflow-hidden overscroll-none'>
                    {appMenuButtonSlot && (
                        <section className='z-50 absolute top-[1rem] left-[2.2%] md:left-[1.7%] lg:left-[1.3%]'>
                            {appMenuButtonSlot}
                        </section>
                    )}

                    <section className='z-0 touch-none overflow-hidden'>
                        <Outlet />
                    </section>

                    <ScrollRestoration />
                </main>
            )}
        </>
    );
}
