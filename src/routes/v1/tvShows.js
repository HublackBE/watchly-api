import express from 'express';
import tvShowsController from '../../controllers/tvShowsController.js';

const router = express.Router();

router.get('/', tvShowsController.list);
router.get('/:id', tvShowsController.get);
router.post('/', tvShowsController.create);
router.put('/:id', tvShowsController.update);
router.delete('/:id', tvShowsController.remove);

// relation endpoints
router.get('/:id/platforms', tvShowsController.platforms);
router.post('/:id/platforms', tvShowsController.addPlatform);
router.delete('/:id/platforms', tvShowsController.removePlatform);

export default router;
