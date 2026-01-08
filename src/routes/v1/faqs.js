import express from 'express';
import faqsController from '../../controllers/faqsController.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', faqsController.list);
router.get('/:id', faqsController.get);
router.post('/', requireAuth, requireAdmin, faqsController.create);
router.put('/:id', requireAuth, requireAdmin, faqsController.update);
router.delete('/:id', requireAuth, requireAdmin, faqsController.remove);

export default router;
