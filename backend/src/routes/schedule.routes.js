import express from 'express';
import {
    createSchedule,
    deleteSchedule,
    getCols,
    getSchedule,
    getSchedules,
    updateSchedule,
} from '../controllers/schedule.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getSchedules);
router.get('/:id', getSchedule);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
