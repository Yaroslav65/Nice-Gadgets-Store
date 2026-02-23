import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany();

    return res.status(200).json(products);
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
