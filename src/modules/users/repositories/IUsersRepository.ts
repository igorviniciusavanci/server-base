import IUser from '../entities/IUser';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<IUser | undefined>;
  findByCPF(cpf: string): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
