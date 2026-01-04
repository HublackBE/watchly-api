import express from 'express';

// Removed: favourites are exposed via parent resources (users/movies).
const router = express.Router();

router.use((_req, res) => res.status(404).json({ error: 'Not found' }));

export default router;
