import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from './preloader';
import { type ReactNode } from 'react';

interface Props {
    isAppLoading: boolean;
    appMenuButtonSlot?: ReactNode;
}

export function Layout({ isAppLoading, appMenuButtonSlot }: Props) {
    return (
        <AnimatePresence>
            {isAppLoading ? (
                <Loader size='md' color='blue' className='absolute top-[45vh] left-[50%]' />
            ) : (
                <motion.main
                    key='layout'
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className='flex flex-row min-h-full relative font-sans'
                >
                    {appMenuButtonSlot && (
                        <section className='z-50 absolute top-[1.6%] left-[2.2%] md:left-[1.7%] lg:left-[1.3%]'>
                            {appMenuButtonSlot}
                        </section>
                    )}

                    <section className='z-0 bg-white'>
                        <Outlet />
                    </section>

                    <ScrollRestoration />
                </motion.main>
            )}
        </AnimatePresence>
    );
}
