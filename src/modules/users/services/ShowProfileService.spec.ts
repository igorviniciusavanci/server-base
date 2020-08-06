import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let usersService: CreateUsersService;
let showProfileService: ShowProfileService;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    showProfileService = new ShowProfileService(usersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await usersService.execute({
      cpf: '02703054165',
      birthday: '1992-12-24',
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const showedUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showedUser.name).toBe('johndoe');
    expect(showedUser.email).toBe('johndoe@johndoe.com');
  });

  it('should not be able to show the profile from non existing-user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
