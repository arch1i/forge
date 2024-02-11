import { useAppDispatch } from '~/app/store/hooks';
import { authModel } from '~/features/auth';
import { Icon } from '~/shared/ui/icon';
// import { sidebarModel } from '~/widgets/app-sidebar';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';

export const AuthActions = () => {
  const dispatch = useAppDispatch();

  const session = authModel.subscribes.useSession();
  const navigate = useNavigate();

  const handleRedirectToSignIn = () => {
    // dispatch(sidebarModel.actions.close());
    navigate('/sign-in');
  };

  const handleLogout = () => {
    dispatch(authModel.events.loggedOut());
    navigate('/');
  };

  if (!session) {
    return (
      <Button type='primary' className='w-full' onClick={handleRedirectToSignIn}>
        Sign In
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        danger
        type='text'
        className='w-full flex items-center justify-center bg-red-200/80 hover:bg-red-200/60'
        onClick={handleLogout}
      >
        <Icon
          name='logout'
          section='primary'
          className='-mt-[1px] w-4 h-4 text-red-500 mr-[9px] -mb-[1px]'
        />
        <Typography.Text className='text-red-600'>Log Out</Typography.Text>
      </Button>
    );
  }
};
