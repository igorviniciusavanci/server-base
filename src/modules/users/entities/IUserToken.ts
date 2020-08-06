import IUser from './IUser';

export default interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}
