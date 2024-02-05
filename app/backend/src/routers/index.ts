import { Router } from 'express';
import route from './teams.router';
import loginRoute from './login.router';
import matchRoute from './matches.router';

const router = Router();

router.use('/teams', route);
router.use('/login', loginRoute);
router.use('/matches', matchRoute);

export default router;
