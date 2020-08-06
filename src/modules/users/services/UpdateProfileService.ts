import { inject, injectable } from 'tsyringe';

import IUser from '@modules/users/entities/IUser';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUpdateProfileRequestDTO {
  user_id: string;
  name?: string;
  email?: string;
  birthday?: Date;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    birthday,
    email,
    password,
    old_password,
  }: IUpdateProfileRequestDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuario não encontrado');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (birthday) user.birthday = birthday;

    if (password && !old_password) {
      throw new AppError('Senha anterior não fornecida');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Senha anterior invalida');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }
}

export default UpdateProfileService;
