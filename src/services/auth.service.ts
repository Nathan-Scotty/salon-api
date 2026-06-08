import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export async function signupUser(name: string, email: string, password: string, phone?: string, role?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { code: 'DUPLICATE' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, phone, role: (role as any) || 'CLIENT' },
  });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  return { id: user.id, token };
}

export async function signinUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { code: 'INVALID_CREDENTIALS' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { code: 'INVALID_CREDENTIALS' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  return { id: user.id, token };
}
