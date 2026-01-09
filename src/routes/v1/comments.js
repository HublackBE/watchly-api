import express from 'express';
import commentsController from '../../controllers/commentsController.js';
import { requireAuth } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', commentsController.list);
router.get('/:id', commentsController.get);
router.post('/', commentsController.create);
router.put('/:id', requireAuth, commentsController.update);
router.delete('/:id', requireAuth, commentsController.remove);

export default router;
