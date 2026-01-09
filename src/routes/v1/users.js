import express from 'express';
import usersController from '../../controllers/usersController.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', requireAuth, requireAdmin, usersController.create);
router.put('/:id', requireAuth, usersController.update);
router.delete('/:id', requireAuth, usersController.remove);

// relation endpoints
router.get('/:id/favourite-movies', usersController.favouriteMovies);
router.post('/:id/favourite-movies', usersController.addFavouriteMovie);
router.delete('/:id/favourite-movies', usersController.removeFavouriteMovie);

export default router;
