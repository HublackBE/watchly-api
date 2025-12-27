import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
  await prisma.users.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
  await prisma.users.findUnique({ where: { id }, ...opts });

export const findByEmail = async (email) =>
  await prisma.users.findUnique({ where: { email } });

export const create = async ({ name, email, password, is_admin = false, avatar_path = null }) =>
  await prisma.users.create({ data: { name, email, password, is_admin, avatar_path } });

export const update = async (id, data) =>
  await prisma.users.update({ where: { id }, data });

export const remove = async (id) =>
  await prisma.users.delete({ where: { id } });