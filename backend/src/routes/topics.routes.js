import express from 'express';
import {
    createTopic,
    deleteTopic,
    getCols,
    getTopic,
    getTopics,
    updateTopic,
} from '../controllers/topics.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getTopics);
router.get('/:id', getTopic);
router.post('/', createTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;
