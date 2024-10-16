import express from 'express';
import {
    createSubject,
    deleteSubject,
    getCols,
    getSubject,
    getSubjects,
    updateSubject,
} from '../controllers/subjects.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getSubjects);
router.get('/:id', getSubject);
router.post('/', createSubject);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

export default router;
