import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUsersService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, birthday, email, password } = request.body;

    const userService = container.resolve(CreateUserService);

    const user = await userService.execute({
      cpf,
      password,
      birthday,
      email,
      name,
    });

    return response.json(classToClass(user));
  }
}
export default new UsersController();
