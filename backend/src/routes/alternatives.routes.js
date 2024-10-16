import express from 'express';
import {
    createAlternative,
    deleteAlternative,
    getAlternative,
    getAlternatives,
    getCols,
    updateAlternative,
} from '../controllers/alternatives.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getAlternatives);
router.get('/:id', getAlternative);
router.post('/', createAlternative);
router.put('/:id', updateAlternative);
router.delete('/:id', deleteAlternative);

export default router;
