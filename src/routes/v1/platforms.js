import express from "express";
import platformsController from "../../controllers/platformsController.js";

const router = express.Router();

router.get("/", platformsController.list);
router.get("/:id", platformsController.get);
router.post("/", platformsController.create);
router.put("/:id", platformsController.update);
router.delete("/:id", platformsController.remove);

// relation endpoints
router.get('/:id/movies', platformsController.movies);
router.post('/:id/movies', platformsController.addMovie);
router.delete('/:id/movies', platformsController.removeMovie);

export default router;