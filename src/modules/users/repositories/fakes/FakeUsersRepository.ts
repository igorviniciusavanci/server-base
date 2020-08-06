import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUser from '@modules/users/entities/IUser';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create({
    name,
    email,
    password,
    birthday,
    cpf,
  }: ICreateUserDTO): Promise<IUser> {
    const user: IUser = {} as IUser;

    Object.assign(user, { id: uuid(), name, email, password, birthday, cpf });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByCPF(cpf: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.cpf === cpf);

    return findUser;
  }

  public async save(user: IUser): Promise<IUser> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
