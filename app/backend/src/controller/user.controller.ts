import { Request, Response } from 'express';
import statusHTTPMap from '../utils/mapStatusHttp';
import UserService from '../service/user.service';

export default class UserController {
  constructor(
    private newService: UserService = new UserService(),
  ) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.newService.login(email, password);
    res.status(statusHTTPMap(user.status)).json(user.data);
}
}