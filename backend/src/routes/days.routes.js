import express from 'express';
import {
    createDay,
    deleteDay,
    getCols,
    getDay,
    getDays,
    updateDay,
} from '../controllers/days.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getDays);
router.get('/:id', getDay);
router.post('/', createDay);
router.put('/:id', updateDay);
router.delete('/:id', deleteDay);

export default router;
