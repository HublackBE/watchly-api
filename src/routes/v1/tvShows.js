import express from 'express';
import tvShowsController from '../../controllers/tvShowsController.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', tvShowsController.list);
router.get('/:id', tvShowsController.get);
router.post('/', requireAuth, requireAdmin, tvShowsController.create);
router.put('/:id', requireAuth, requireAdmin, tvShowsController.update);
router.delete('/:id', requireAuth, requireAdmin, tvShowsController.remove);

// relation endpoints
router.get('/:id/platforms', tvShowsController.platforms);
router.post('/:id/platforms', requireAuth, requireAdmin, tvShowsController.addPlatform);
router.delete('/:id/platforms', requireAuth, requireAdmin, tvShowsController.removePlatform);

export default router;
