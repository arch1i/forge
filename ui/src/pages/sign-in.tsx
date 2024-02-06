import { Typography } from 'antd';
import { authModel, SignIn } from '~/features/auth';

export default function SignInPage() {
  const activeTab = authModel.useSignInProcessTab();

  return (
    <main className='flex flex-col w-full items-center pt-[1vh]'>
      {activeTab === 'sign-up' ? <SignUpWelcomeLabel /> : <LoginWelcomeLabel />}
      <SignIn />
    </main>
  );
}

function SignUpWelcomeLabel() {
  return (
    <main className='text-center px-4'>
      <Typography.Paragraph className='text-[28px]'>Welcome to Forge!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-7 text-[13px] text-slate-500'>
        Let's create Your account
      </Typography.Paragraph>
    </main>
  );
}

function LoginWelcomeLabel() {
  return (
    <main className='text-center px-4'>
      <Typography.Paragraph className='text-[28px]'>Welcome to Forge!</Typography.Paragraph>
      <Typography.Paragraph className='-mt-7 text-[13px] text-slate-500'>
        If you don't have an account yet, switch to the next tab.
      </Typography.Paragraph>
    </main>
  );
}
