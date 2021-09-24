export type TGameStatus = 'scheduled' | 'in_progress' | 'done' | 'issue'
export interface IGameRoom {
  id: string;
  scheduledTime: string;
  company: ICompany;
  users: IUser[];
  status: TGameStatus;
}
export interface ICompany {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
