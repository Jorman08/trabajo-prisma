import { Router } from 'express';
import {createBrand, getAllBrands, updateBrand, deleteBrand} from './service.brand.js';


const router = Router();

router.post('/', createBrand);
router.get('/', getAllBrands);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);


export default router;
