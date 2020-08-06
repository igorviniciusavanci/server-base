import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email(),
      birthday: Joi.date(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create,
);

export default usersRouter;
