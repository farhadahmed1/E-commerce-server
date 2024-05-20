import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// will call controller function
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deletedProduct);

export const ProductRoutes = router;
