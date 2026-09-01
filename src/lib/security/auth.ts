
import jwt from 'jsonwebtoken';
import { User, Role } from '@/types';
import { SEED_USERS } from '@/lib/db/seedData';

const JWT_SECRET = process.env.JWT_SECRET || 'razoragent-jwt-super-secret-key-32chars-min-2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
  name: string;
}

export function signToken(payload: TokenPayload, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function getUserFromToken(token?: string): User | null {
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const found = SEED_USERS.find(u => u.id === decoded.userId || u.email === decoded.email);
  if (found) {
    const { passwordHash, ...safeUser } = found;
    return safeUser;
  }
  return {
    id: decoded.userId,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    createdAt: new Date().toISOString()
  };
}
