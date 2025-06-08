import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductRepository } from '../../lib/db/repositories/productRepo';

const productRepo = new ProductRepository();

// For GET/PUT/DELETE by id, see ./products/[id].ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await productRepo.getAllProducts();
    return res.status(200).json(products);
  }
  if (req.method === 'POST') {
    // Expects: { name, image, price, description }
    const { name, image, price, description } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const product = await productRepo.createProduct({ name, image, price, description });
    return res.status(201).json(product);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 