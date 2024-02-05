import { Router, Request, Response } from 'express';
import MatchController from '../controller/matches.controller';
import ValidateToken from '../middlewares/validateToken';

const routerInstance = Router();

const matchController = new MatchController();

routerInstance.get('/', (req: Request, res: Response) => matchController.allMatches(req, res));

// atualiza partida
routerInstance.patch(
  '/:id',
  ValidateToken.validateToken,
  (req: Request, res: Response) =>
    matchController.updatedMatches(req, res),
);

// finaliza partida
routerInstance.patch(
  '/:id/finish',
  ValidateToken.validateToken,
  (req: Request, res: Response) =>
    matchController.finishedMatches(req, res),
);

export default routerInstance;
