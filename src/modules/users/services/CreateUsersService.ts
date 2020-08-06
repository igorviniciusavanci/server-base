import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUser from '../entities/IUser';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    birthday,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    const userExist = await this.usersRepository.findByCPF(cpf);

    if (userExist) {
      throw new AppError('Esse CPF já existe', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const savedUser = await this.usersRepository.create({
      name,
      email,
      cpf,
      birthday,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('users-list');

    return savedUser;
  }
}

export default CreateUsersService;
