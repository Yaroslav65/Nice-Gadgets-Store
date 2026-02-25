import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: { select: { slug: true } } },
    });
    const normalizedProducts = products.map(({ categoryId, category, ...product }) => ({
      ...product,
      category: category.slug,
    }));

    return res.status(200).json(normalizedProducts);
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:itemId', async (req, res) => {
  try {
    const details = await prisma.productDetails.findUnique({
      where: { itemId: req.params.itemId }
    });

    if (!details) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(details);
  } catch (error) {
    console.error('GET /api/products/:itemId failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
export default router;
