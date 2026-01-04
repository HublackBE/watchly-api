import { hashPassword } from '../../src/lib/auth.js';
import prisma from '../../src/lib/prisma.js';

export async function createUser({ name, email, password, is_admin = false }) {
  const pwdHash = await hashPassword(password);
  return await prisma.users.create({ data: { name, email, password: pwdHash, is_admin } });
}

export default { createUser };
