import './game-room.scss';
import { IGameRoom, TGameStatus } from '../game-room.interface';
import { Duration, toDateString } from '@riddle/ui';

/* eslint-disable-next-line */
export interface GameRoomProps {
  gameRoom: IGameRoom;
}

export function GameRoom({ gameRoom: { users, company, status, scheduledTime } }: GameRoomProps) {
  return (
    <div className={'game-room'}>
      <div className={'game-room__status ' + `game-room__status--${status}`}></div>
      <div className='game-room__content'>
        <div className='game-room__header'>
          <Time time={scheduledTime} />
          <span>{company.name}</span>
        </div>
        <div className='game-room__body'>
          <span>{users.map(user => user.name).join(', ')}</span>
          <Status status={status} />
        </div>
      </div>
    </div>
  );
}

function Time({ time }: { time: string }) {
  const date = new Date(time);
  const formatted = `${Date.now() - date.getTime() < Duration.DAY_MS ? 'Today' : toDateString(date)}, ${date.getHours()}:${date.getMinutes()}`;
  return (
    <span>{formatted}</span>
  );
}

function Status({ status }: { status: TGameStatus }) {
  const mapper: Record<TGameStatus, string> = {
    'done': 'Done',
    in_progress: 'In progress',
    issue: 'Issue',
    scheduled: 'Scheduled'
  };
  return (
    <span className='game-room__status-text'>{mapper[status]}</span>
  );
}

export default GameRoom;
