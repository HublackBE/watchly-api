import express from 'express';
import users from './users.js';
import movies from './movies.js';

const router = express.Router();

router.use('/users', users);
router.use('/movies', movies);

router.get('/', (_req, res) => res.json({ ok: true, version: 'v1' }));

export default router;
