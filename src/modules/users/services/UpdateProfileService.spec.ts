import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let usersService: CreateUsersService;
let updateProfileService: UpdateProfileService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    updateProfileService = new UpdateProfileService(
      usersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update an user', async () => {
    const user = await usersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John The',
      email: 'johnthre@example.com',
      birthday: new Date(),
    });

    expect(updatedUser.name).toBe('John The');
    expect(updatedUser.email).toBe('johnthre@example.com');
  });

  it('should be able to update the password', async () => {
    const user = await usersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await usersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await usersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        old_password: 'wrong-old-password',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile from non existing-user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-id',
        name: 'test',
        email: 'test@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
