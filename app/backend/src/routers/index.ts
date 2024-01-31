import { Router } from 'express';
import route from './teams.router';

const router = Router();

router.use('/teams', route);

export default router;
