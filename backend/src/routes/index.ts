import { Router } from 'express';
import authRouter from './auth';
import categoriesRouter from './categories.route';
import productsRouter from './products.route';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);

export default router;
