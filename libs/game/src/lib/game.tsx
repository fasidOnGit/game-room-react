import styles from './game.module.scss';
import data from './data.json';
import GameRoomList from './game-room-list/game-room-list';
import { IGameRoom } from './game-room.interface';
import { FormEvent, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface GameProps {
}

export function Game(props: GameProps) {
  const [filter, setFilter] = useState('');
  const [gameRooms, setGameRooms] = useState([...data] as IGameRoom[]);
  const handleChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = (evt.target as any).value;
    setFilter(value);
  };
  useEffect(() => {
    setGameRooms(
      (data as IGameRoom[]).filter(gameRoom => {
        return gameRoom.users.some(user => user.name.toLowerCase().includes(filter.toLowerCase())) || gameRoom.id.includes(filter)
      })
    )
  }, [filter]);
  return (
    <div className={styles.game}>
      <div className={styles['game__header']}>
        <input value={filter} type='text' name='search' placeholder={'Search'} onInput={handleChange} />
        <div className={styles['game__filter']}>
          Filters coming soon....
        </div>
      </div>
      <GameRoomList gameRooms={gameRooms} />
    </div>
  );
}

export default Game;
