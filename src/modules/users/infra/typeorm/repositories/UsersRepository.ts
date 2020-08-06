import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IUser from '@modules/users/entities/IUser';
import UserSchema from '../schemas/users';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<IUser>;

  constructor() {
    this.ormRepository = getRepository<IUser>(UserSchema);
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByCPF(cpf: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
