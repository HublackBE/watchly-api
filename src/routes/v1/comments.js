import express from 'express';
import commentsController from '../../controllers/commentsController.js';

const router = express.Router();

router.get('/', commentsController.list);
router.get('/:id', commentsController.get);
router.post('/', commentsController.create);
router.put('/:id', commentsController.update);
router.delete('/:id', commentsController.remove);

export default router;
