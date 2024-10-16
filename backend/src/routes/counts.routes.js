import express from 'express';
import { getCounts } from '../controllers/counts.controller.js';

const router = express.Router();

router.get('/', getCounts);

export default router;
