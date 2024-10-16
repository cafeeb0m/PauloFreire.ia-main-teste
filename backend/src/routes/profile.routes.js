import express from 'express';
import {
    createProfile,
    deleteProfile,
    getCols,
    getProfile,
    getProfiles,
    updateProfile,
} from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getProfiles);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;
