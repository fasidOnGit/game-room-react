import styles from './select.module.scss';
import { ChangeEventHandler } from 'react';

/* eslint-disable-next-line */
export interface SelectProps {
  name: string;
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  defaultOption: string;
  value: string;
  error: string;
  options: Array<Record<'text', string> & Record<'value', string>>;
}

export function SelectInput({
                       name,
                       label,
                       onChange,
                       defaultOption,
                       value = '',
                       error,
                       options = []
                     }: Partial<SelectProps>) {
  return (
    <div className={styles['select']}>
      <label htmlFor={name}>{label}</label>
      <div>
        <select name={name} value={value} onChange={onChange} className='form-control'>
          <option value=''>{defaultOption}</option>
          {options.map(opt => {
            return <option value={opt.value} key={opt.value}>{opt.text}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
