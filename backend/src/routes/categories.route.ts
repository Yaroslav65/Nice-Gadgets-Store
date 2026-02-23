import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error('GET /api/categories failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
