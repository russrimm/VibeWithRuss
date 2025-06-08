import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRepository } from '../../lib/db/repositories/userRepo';

const userRepo = new UserRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  // Check if user exists
  const existing = await userRepo.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'User already exists.' });
  }
  await userRepo.createUser({ email, password });
  return res.status(201).json({ message: 'User registered.' });
} 