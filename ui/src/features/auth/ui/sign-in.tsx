import { useAppDispatch } from '~/app/store/hooks';
import { authModel } from '~/features/auth';
import { type SignInProcess } from '~/features/auth/model/types';
import { Login } from '~/features/auth/ui/forms/log-in.form';
import { SignUp } from '~/features/auth/ui/forms/sign-up.form';
import { Tabs, TabsProps } from 'antd';

const TAB_OPTIONS: TabsProps['items'] = [
  {
    key: 'sign-up' as TypeOfValue<SignInProcess, 'tab'>,
    label: 'Create an Account',
    children: <SignUp />,
  },
  {
    key: 'log-in' as TypeOfValue<SignInProcess, 'tab'>,
    label: 'Log In',
    children: <Login />,
  },
];

export function SignIn() {
  const dispatch = useAppDispatch();
  const activeTab = authModel.useSignInProcessTab();

  const handleChangeTab = (key: TypeOfValue<SignInProcess, 'tab'>) => {
    dispatch(authModel.actions.signInProcessStepChanged('credentials'));
    dispatch(authModel.actions.signInProcessTabChanged(key as TypeOfValue<SignInProcess, 'tab'>));
  };

  return (
    <Tabs
      centered
      items={TAB_OPTIONS}
      activeKey={activeTab}
      onChange={(key: string) => handleChangeTab(key as TypeOfValue<SignInProcess, 'tab'>)}
      className='w-full sm:w-[80%] md:w-[78%] lg:w-[74%] xl:w-[63%] 2xl:w-[45%]'
    />
  );
}
