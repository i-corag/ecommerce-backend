import { Router } from 'express';
import {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brands.controllers.js';

const router = Router();

//CREATE BRAND
router.post('/create', createBrand);

//READ BRANDS
router.get('/', getBrands);

//READ A SPECIFIC BRAND
router.get('/:id', getBrand);

//UPDATE BRAND
router.put('/update/:id', updateBrand);

//DELETE BRAND
router.delete('/delete/:id', deleteBrand);

export default router;
