import { Router } from 'express';
import { createCategory, getAllCategories, updateCategory, deleteCategory } from './service.category.js';

const router = Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


export default router;
