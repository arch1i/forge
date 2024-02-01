import { twMerge } from 'tailwind-merge';
import { Select } from 'antd';
import { Icon } from '~/shared/ui/icon';
import { CountrySelectorOptions } from './types';
import { Country } from '~/shared/types/core/country';

interface Props {
  countryOptions: CountrySelectorOptions;
  onChange: (country: Country) => void;
  className?: string;
}

export const CountrySelector = ({ countryOptions, onChange, className }: Props) => {
  return (
    <Select
      showSearch
      allowClear
      size='large'
      optionLabelProp='label'
      onChange={onChange}
      className={twMerge(
        className,
        'caret-transparent transition-none animation-none cursor-pointer w-full',
      )}
      placeholder={
        <div className='flex items-center'>
          <Icon name='united-kingdom' section='flags' className='w-6 h-6 rounded-[23%] mr-[2px]' />
          &nbsp; Select your country..
        </div>
      }
    >
      {countryOptions.map(({ value, label }) => (
        <Select.Option
          key={crypto.randomUUID()}
          value={value}
          label={
            <div className='flex items-center'>
              <Icon name={value} section='flags' className='w-6 h-6 rounded-[23%] mr-[2px]' />
              &nbsp; {label}
            </div>
          }
        >
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
