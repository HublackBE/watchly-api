import express from 'express';
import users from './users.js';
import movies from './movies.js';
import platforms from './platforms.js';

const router = express.Router();

router.use('/users', users);
router.use('/movies', movies);
router.use('/platforms', platforms);

router.get('/', (_req, res) => res.json({ ok: true, version: 'v1' }));

export default router;
