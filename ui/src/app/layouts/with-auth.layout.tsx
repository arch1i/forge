import { authModel } from '~/features/auth';
import { Layout } from '~/shared/ui/layout';
import { sidebarModel } from '~/widgets/app-sidebar';
import { useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';

export const WithAuthLayout = () => {
  const dispatch = useAppDispatch();

  const showSidebar = sidebarModel.useShowSidebar();
  const { status: checkSessionStatus } = authModel.useSessionCheckEffectState();

  useEffect(() => {
    dispatch(authModel.effects.checkSession());
  }, []);

  return <Layout showSidebar={showSidebar} isGlobalLoading={checkSessionStatus === 'pending'} />;
};
