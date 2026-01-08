import express from 'express';
import * as Catalog from '../../controllers/catalogController.js';

const router = express.Router();

router.get('/', Catalog.list);

export default router;
