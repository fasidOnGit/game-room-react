import styles from './game.module.scss';
import data from './data.json';
import GameRoomList from './game-room-list/game-room-list';
import { IGameRoom } from './game-room.interface';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DateRangePicker, Duration, IRange } from '@riddle/ui';
import SelectInput from '../../../ui/src/lib/select/select';

/* eslint-disable-next-line */
export interface GameProps {
}

interface IGameFilter {
  filter: string;
  range: IRange;
  customer: string;
}

const searchFilter = (gameRoom: IGameRoom, filter: string) => {
  return gameRoom.users.some(user => !filter.trim() || (user.name.toLowerCase().includes(filter.toLowerCase())) || gameRoom.id.includes(filter));
};

const rangeFilter = (gameRoom: IGameRoom, { from, to }: IRange) => {
  const roomTime = new Date(gameRoom.scheduledTime).getTime();
  return roomTime > new Date(from).getTime() && roomTime < new Date(to).getTime();
};

const filterByCustomer = (gameRoom: IGameRoom, customerId: string) => {
  return !customerId || gameRoom.company.id === customerId;
};

export function Game(props: GameProps) {
  const [filter, setFilter] = useState(() => ({
    filter: '',
    range: { from: new Date(Date.now() - (Duration.DAY_MS * 120)), to: new Date() },
    customer: ''
  } as IGameFilter));
  const [gameRooms, setGameRooms] = useState([...data] as IGameRoom[]);
  const customers = data.map(d => ({ value: d.company.id, text: d.company.name }));
  const handleChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = (evt.target as any).value;
    setFilter({ ...filter, filter: value });
  };
  const onDateChange = (range: IRange) => {
    setFilter({ ...filter, range });
  };
  useEffect(() => {
    setGameRooms(
      (data as IGameRoom[])
        .filter(gameRoom => filterByCustomer(gameRoom, filter.customer))
        .filter(gameRoom => rangeFilter(gameRoom, filter.range))
        .filter(gameRoom => {
          return searchFilter(gameRoom, filter.filter);
        })
    );
  }, [filter]);

  const onCustomerSelected = (evt: ChangeEvent<any>) => {
    console.log(evt.target.value);
    setFilter({ ...filter, customer: evt.target.value });
  };

  return (
    <div className={styles.game}>
      <div className={styles['game__header']}>
        <input value={filter.filter} type='text' name='search' placeholder={'Search'} onInput={handleChange} />
        <div className={styles['game__filter']}>
          <DateRangePicker from={filter.range.from} to={filter.range.to} onChange={onDateChange} />
          <SelectInput name={'customer'} label={'Customer'} onChange={onCustomerSelected} value={filter.customer}
                       options={customers} />
        </div>
      </div>
      <GameRoomList gameRooms={gameRooms} />
    </div>
  );
}

export default Game;
