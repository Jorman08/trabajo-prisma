import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from './service.user.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
