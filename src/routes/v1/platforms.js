import express from "express";
import platformsController from "../../controllers/platformsController.js";
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get("/", platformsController.list);
router.get("/:id", platformsController.get);
router.post("/", requireAuth, requireAdmin, platformsController.create);
router.put("/:id", requireAuth, requireAdmin, platformsController.update);
router.delete("/:id", requireAuth, requireAdmin, platformsController.remove);

// relation endpoints
router.get('/:id/movies', platformsController.movies);
router.post('/:id/movies', requireAuth, requireAdmin, platformsController.addMovie);
router.delete('/:id/movies', requireAuth, requireAdmin, platformsController.removeMovie);

export default router;