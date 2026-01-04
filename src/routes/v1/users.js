import express from 'express';
import usersController from '../../controllers/usersController.js';

const router = express.Router();

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);

// relation endpoints
router.get('/:id/favourite-movies', usersController.favouriteMovies);
router.post('/:id/favourite-movies', usersController.addFavouriteMovie);
router.delete('/:id/favourite-movies', usersController.removeFavouriteMovie);

export default router;
