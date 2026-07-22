import { Router } from 'express';
import * as c from '../controllers/appointment.controller';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { createGuest } from '../controllers/appointment.controller';

const router = Router();

// ── Public route — no auth required ──
router.post('/guest', createGuest);

// ── Protected routes ──
router.use(authenticate);
router.get('/', requireAdmin, c.getAll);
router.get('/:id', c.getById);
router.post('/', c.create);
router.patch('/:id', c.update);
router.delete('/:id', requireAdmin, c.remove);

export default router;