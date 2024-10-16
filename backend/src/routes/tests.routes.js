import express from 'express';
import {
    createTest,
    deleteTest,
    getCols,
    getTest,
    getTests,
    updateTest,
} from '../controllers/tests.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getTests);
router.get('/:id', getTest);
router.post('/', createTest);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);

export default router;
