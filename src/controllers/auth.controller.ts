import { Request, Response } from 'express';
import { signupUser, signinUser } from '../services/auth.service';
import prisma from '../lib/prisma';

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, passwordHash, phone, role } = req.body;
    if (!name || !email || !passwordHash) {
      return res.status(400).json({ error: 'name, email, and passwordHash are required' });
    }
    const result = await signupUser(name, email, passwordHash, phone, role);

     if (!role || role === 'CLIENT') {
      await prisma.client.create({
        data: { userId: result.id },
      });
    }

    return res.status(201).json({ data: result });
  } catch (e: any) {
    if (e.code === 'DUPLICATE') return res.status(409).json({ error: e.message });
    return res.status(500).json({ error: 'Signup failed' });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
    const result = await signinUser(email, password);
    return res.json({ data: result });
  } catch (e: any) {
    if (e.code === 'INVALID_CREDENTIALS') return res.status(401).json({ error: e.message });
    return res.status(500).json({ error: 'Signin failed' });
  }
}
