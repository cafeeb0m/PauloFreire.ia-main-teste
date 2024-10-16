import express from 'express';
import {
    createChatbot,
    deleteChatbot,
    getChatbot,
    getChatbots,
    getCols,
    updateChatbot,
} from '../controllers/chatbots.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getChatbots);
router.get('/:id', getChatbot);
router.post('/', createChatbot);
router.put('/:id', updateChatbot);
router.delete('/:id', deleteChatbot);

export default router;
