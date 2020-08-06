import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from '../middlewares/authMiddleware';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(authMiddleware);
profileRouter.get('/', ProfileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
    },
  }),
  ProfileController.update,
);

export default profileRouter;
