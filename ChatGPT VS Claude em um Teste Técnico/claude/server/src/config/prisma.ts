import { PrismaClient } from '@prisma/client';

// Single Prisma instance reused across the app (avoids connection storms in dev).
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
