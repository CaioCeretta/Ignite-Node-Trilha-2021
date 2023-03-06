import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

const authenticationRoutes = Router();


// Se quiser apenas ler o arquivo, pode passar o multer vazio

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post('/sessions', authenticateUserController.handle);

export { authenticationRoutes };
