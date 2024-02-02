import { Router, Request, Response } from 'express';
import UserController from '../controller/user.controller';
import ValidateLogin from '../middlewares/validateLogin';

const routerInstance = Router();

const userController = new UserController();

routerInstance.post('/', 
ValidateLogin.validateLogin, (req: Request, res: Response) => userController.login(req, res));


export default routerInstance;
