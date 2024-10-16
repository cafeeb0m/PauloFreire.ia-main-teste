import express from 'express';
import {
    createQuestion,
    deleteQuestion,
    getCols,
    getQuestion,
    getQuestions,
    updateQuestion,
} from '../controllers/questions.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
