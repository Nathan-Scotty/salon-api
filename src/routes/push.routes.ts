import { Router } from 'express';
import { subscribe, unsubscribe, notify } from '../controllers/push.controller';

const router = Router();

router.post('/subscribe', subscribe);
router.delete('/subscribe', unsubscribe);
router.post('/notify', notify);

export default router;
