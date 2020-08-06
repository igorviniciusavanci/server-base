import IUserToken from '../entities/IUserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}
