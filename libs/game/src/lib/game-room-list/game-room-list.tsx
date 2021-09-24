import styles from './game-room-list.module.scss';
import { IGameRoom } from '../game-room.interface';
import { GameRoom } from '@riddile/game';

/* eslint-disable-next-line */
export interface GameRoomListProps {
  gameRooms: IGameRoom[];
}

export function GameRoomList({ gameRooms }: GameRoomListProps) {
  return (
    <div className={styles['game-room-list']}>
      {gameRooms.map(
        gameRoom => (<GameRoom gameRoom={gameRoom} key={gameRoom.id} />)
      )}
    </div>
  );
}

export default GameRoomList;
