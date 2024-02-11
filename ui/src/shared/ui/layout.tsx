import { Outlet, ScrollRestoration } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from './preloader';
import { type ReactNode } from 'react';

interface Props {
  showSidebar: boolean;
  isGlobalLoading: boolean;
  sidebarSlot: ReactNode;
}

export function Layout({ isGlobalLoading, showSidebar, sidebarSlot }: Props) {
  return (
    <AnimatePresence>
      {isGlobalLoading ? (
        <Loader size='md' color='blue' />
      ) : (
        <motion.main
          key='layout'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className='flex flex-row min-h-full'
        >
          {sidebarSlot}

          <section
            className={twMerge(
              showSidebar && 'blur-[3px] overflow-hidden pointer-events-none',
              'flex-auto min-h-screen bg-white px-[5%] lg:pl-[27%] xl:pl-[24%] 2xl:pl-[20%] pb-16 pt-12 lg:pt-10',
            )}
          >
            <Outlet />
          </section>

          <ScrollRestoration />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
