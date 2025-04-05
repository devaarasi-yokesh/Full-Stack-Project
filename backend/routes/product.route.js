import express from 'express';

import { deleteProduct, getProduct, postProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.get('/', getProduct);

router.post('/', postProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct)
// To test this creation of new product we don't have the frontend, so using the postman routerlication.


export default router;