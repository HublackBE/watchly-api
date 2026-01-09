#!/usr/bin/env node
import prisma from '../src/lib/prisma.js';
import { createUser } from './factories/userFactory.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'changeme';
  const name = process.env.SEED_ADMIN_NAME || 'Admin';

  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) {
    if (existing.is_admin) {
      console.log(`Admin user already exists: ${email}`);
    } else {
      console.log(`User exists but is not admin. Promoting: ${email}`);
      await prisma.users.update({ where: { email }, data: { is_admin: true } });
      console.log('Promoted to admin.');
    }
    process.exit(0);
  }

  const user = await createUser({ name, email, password, is_admin: true });
  console.log('Created admin user:', { id: user.id, email: user.email });
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
