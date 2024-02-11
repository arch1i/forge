import { Tabs, TabsProps } from 'antd';
import { authModel } from '~/features/auth';
import { useAppDispatch } from '~/app/store/hooks';
import { Login } from './/forms/log-in.form';
import { SignUp } from './forms/sign-up.form';
import { type SignInProcess } from '~/features/auth/model/types';

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
  const activeTab = authModel.subscribes.useSignInProcessTab();

  const handleChangeTab = (key: TypeOfValue<SignInProcess, 'tab'>) => {
    dispatch(authModel.events.signInProcessStepChanged('credentials'));
    dispatch(authModel.events.signInProcessTabChanged(key as TypeOfValue<SignInProcess, 'tab'>));
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
