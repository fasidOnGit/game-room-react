import styles from './date-range-picker.module.scss';
import { Duration } from './duration.enum';
import { useEffect, useState } from 'react';
import { pad } from './utils';

export interface IRange {
  from: Date;
  to: Date;
}

/* eslint-disable-next-line */
export interface DateRangePickerProps {
  from?: Date | string | number;
  to?: Date | string | number;
  onChange: (range: IRange) => void;
}

export function DateRangePicker({
                                  from = new Date(Date.now() - Duration.DAY_MS),
                                  to = new Date(),
                                  onChange = () => {
                                    /*empty*/
                                  }
                                }: DateRangePickerProps) {
  const [start, setStart] = useState(() => {
    return (from instanceof Date) ? from : new Date(from);
  });
  const [end, setEnd] = useState(() => {
    return (to instanceof Date) ? to : new Date(to);
  });

  const handleChange = (state: 'start' | 'end', evt: Date) => {
    if (state === 'start') {
      setStart(evt);
    } else {
      setEnd(evt);
    }
  };

  useEffect(() => {
    onChange({ from: start, to: end });
  }, [start, end]);
  return (
    <div className={styles['date-range-picker']}>
      <DatePicker label={'Start date:'} max={end} onInputChange={evt => handleChange('start', evt)}
                  value={start} id={'start'} name={'start'} />
      <DatePicker label={'End date:'} min={start} max={new Date()}
                  onInputChange={evt => handleChange('end', evt)}
                  value={end} id={'end'} name={'end'} />
    </div>
  );
}

export default DateRangePicker;

function DatePicker({
                      label = '',
                      value = new Date(),
                      id = null,
                      name,
                      onInputChange = () => {
                        /*Empty*/
                      },
                      max = null,
                      min = null
                    }: Partial<{ label: string, value: Date, id: string | null, name: string, onInputChange: (evt: Date) => void, max: Date | null, min: Date | null }>) {

  const formatDateForInput = (date: Date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };

  const [date, setDate] = useState(() => ({
    inputValue: formatDateForInput(value),
    rawValue: value
  }));

  useEffect(() => {
    onInputChange(date.rawValue);
  }, [date]);

  return (
    <div>
      <label htmlFor={id ?? undefined}>{label}</label>
      <input id={id ?? undefined} type='date' name={name} value={date.inputValue}
             onInput={evt => setDate({
               inputValue: formatDateForInput(new Date((evt.target as any).value)),
               rawValue: new Date((evt.target as any).value)
             })}
             min={min ? formatDateForInput(min) : undefined}
             max={max ? formatDateForInput(max) : undefined} />
    </div>
  );
}
