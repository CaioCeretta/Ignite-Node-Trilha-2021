import { Router } from 'express';

import multer from 'multer';

import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

import uploadConfig  from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const updateUserAvatarController = new UpdateUserAvatarController()
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', uploadAvatar.single("avatar"), ensureAuthenticated, updateUserAvatarController.handle)

export { usersRoutes }