import express from 'express';
import faqsController from '../../controllers/faqsController.js';

const router = express.Router();

router.get('/', faqsController.list);
router.get('/:id', faqsController.get);
router.post('/', faqsController.create);
router.put('/:id', faqsController.update);
router.delete('/:id', faqsController.remove);

export default router;
