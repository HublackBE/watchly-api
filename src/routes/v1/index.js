import express from 'express';
import users from './users.js';
import movies from './movies.js';
import platforms from './platforms.js';
import tvShows from './tvShows.js';
import comments from './comments.js';
import faqs from './faqs.js';

const router = express.Router();

router.use('/users', users);
router.use('/movies', movies);
router.use('/platforms', platforms);
router.use('/tv-shows', tvShows);
router.use('/comments', comments);
router.use('/faqs', faqs);
// pivot and internal Laravel tables are intentionally not exposed as top-level routes

router.get('/', (_req, res) => res.json({ ok: true, version: 'v1' }));

export default router;
