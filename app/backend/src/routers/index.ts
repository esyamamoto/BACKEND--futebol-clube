import { Router } from 'express';
import route from './teams.router';
import loginRoute from './login.router';

const router = Router();

router.use('/teams', route);
router.use('/login', loginRoute);

export default router;
