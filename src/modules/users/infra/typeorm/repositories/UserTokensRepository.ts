import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import IUserToken from '@modules/users/entities/IUserToken';
import UserTokenSchema from '../schemas/userToken';

class UsersTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<IUserToken>;

  constructor() {
    this.ormRepository = getRepository(UserTokenSchema);
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
