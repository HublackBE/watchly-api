import express from 'express';
import moviesController from '../../controllers/moviesController.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', moviesController.list);
router.get('/:id', moviesController.get);
router.post('/', requireAuth, requireAdmin, moviesController.create);
router.put('/:id', requireAuth, requireAdmin, moviesController.update);
router.delete('/:id', requireAuth, requireAdmin, moviesController.remove);

// relation endpoints
router.get('/:id/platforms', moviesController.platforms);
router.post('/:id/platforms', requireAuth, requireAdmin, moviesController.addPlatform);
router.delete('/:id/platforms', requireAuth, requireAdmin, moviesController.removePlatform);

router.get('/:id/favourites', moviesController.favourites);
router.post('/:id/favourites', moviesController.addFavourite);
router.delete('/:id/favourites', moviesController.removeFavourite);

export default router;
