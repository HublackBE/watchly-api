import express from 'express';
import moviesController from '../../controllers/moviesController.js';

const router = express.Router();

router.get('/', moviesController.list);
router.get('/:id', moviesController.get);
router.post('/', moviesController.create);
router.put('/:id', moviesController.update);
router.delete('/:id', moviesController.remove);

// relation endpoints
router.get('/:id/platforms', moviesController.platforms);
router.post('/:id/platforms', moviesController.addPlatform);
router.delete('/:id/platforms', moviesController.removePlatform);

router.get('/:id/favourites', moviesController.favourites);
router.post('/:id/favourites', moviesController.addFavourite);
router.delete('/:id/favourites', moviesController.removeFavourite);

export default router;
