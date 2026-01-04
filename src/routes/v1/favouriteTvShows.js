import express from 'express';

// Removed: favourites for TV shows are exposed via parent resources.
const router = express.Router();

router.use((_req, res) => res.status(404).json({ error: 'Not found' }));

export default router;
