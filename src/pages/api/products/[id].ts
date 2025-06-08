import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductRepository } from '../../../lib/db/repositories/productRepo';

const productRepo = new ProductRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await productRepo.deleteProduct(id);
      if (!deleted) return res.status(404).json({ error: 'Product not found' });
      return res.status(204).end();
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete product' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, image, price, description, category } = req.body;
      if (!name || !image || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const updated = await productRepo.updateProduct(id, { name, image, price, description, category });
      if (!updated) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to update product' });
    }
  }

  if (req.method === 'GET') {
    try {
      const product = await productRepo.getProductById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to fetch product' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 