import { PrismaClient } from '../../prisma/generated/prisma/client';

export const DbContext: PrismaClient = new PrismaClient();
