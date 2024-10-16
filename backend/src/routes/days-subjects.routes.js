import express from 'express';
import {
    createDaySubject,
    deleteDaySubject,
    getCols,
    getDaySubject,
    getDaysSubjects,
    updateDaySubject,
} from '../controllers/days-subjects.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getDaysSubjects);
router.get('/:id', getDaySubject);
router.post('/', createDaySubject);
router.put('/:id', updateDaySubject);
router.delete('/:id', deleteDaySubject);

export default router;
