import express from 'express';
import {
    createChat,
    deleteChat,
    getChat,
    getChats,
    getCols,
    updateChat,
} from '../controllers/chats.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getChats);
router.get('/:id', getChat);
router.post('/', createChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

export default router;
