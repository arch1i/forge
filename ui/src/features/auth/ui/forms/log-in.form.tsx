import { z } from 'zod';
import { LoginSchema } from 'dto';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '~/app/store/hooks';
import { authModel } from '~/features/auth';
import { Form } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, status } = authModel.useLoginEffectState();

  const handleLogin = async (credentials: z.infer<typeof LoginSchema>) => {
    await dispatch(authModel.effects.login(credentials))
      .unwrap()
      .then(({ success }) => {
        if (success) {
          navigate('/');
        }
      });
  };

  return (
    <Form
      onSubmit={handleLogin}
      schema={LoginSchema}
      submitText='Log In'
      className='w-full'
      errorMessage={error}
      isLoading={status === 'pending'}
    >
      <Input name='email' type='email' label='Email' />
      <Input name='password' type='password' label='Password' />
    </Form>
  );
};
