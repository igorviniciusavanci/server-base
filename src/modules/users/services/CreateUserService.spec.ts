import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let createUsersService: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createUsersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users using the same CPF', async () => {
    await createUsersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      createUsersService.execute({
        cpf: '02703054165',
        birthday: '1992-12-24',
        name: 'johndoe',
        email: 'johndoe@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
