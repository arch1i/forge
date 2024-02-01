import { Label } from '~/shared/ui/input';
import { Radio } from '~/shared/ui/radio';
import { Controller, useFormContext } from 'react-hook-form';
import { NotificationProvider } from '@prisma/client';

import { type RadioOptions } from '~/shared/ui/radio';

export const OPTIONS = [
  { value: NotificationProvider.TELEGRAM, icon: 'telegram', iconSection: 'social-media' },
  {
    value: NotificationProvider.WHATSAPP,
    icon: 'whatsapp',
    iconSection: 'social-media',
  },
  {
    value: NotificationProvider.MESSENGER,
    icon: 'facebook',
    iconSection: 'social-media',
  },
] satisfies RadioOptions;

export const NotificationProviderSelector = ({ name, label }: { name: string; label?: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message?.toString();

  return (
    <Controller
      defaultValue=''
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <main className='space-y-2'>
          <Label label={label} error={error} />
          <Radio options={OPTIONS} onChange={onChange} />
        </main>
      )}
    />
  );
};
