import { Router } from 'express';
import { sseConnect } from '../controllers/sse.controller';

const router = Router();

// Public — no auth required so admin can connect on load
router.get('/events', sseConnect);

export default router;
