import express from 'express';
import {
    createAddress,
    deleteAddress,
    getAddress,
    getAddresses,
    getCols,
    updateAddress,
} from '../controllers/addresses.controller.js';

const router = express.Router();

router.get('/cols', getCols);
router.get('/', getAddresses);
router.get('/:id', getAddress);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;
