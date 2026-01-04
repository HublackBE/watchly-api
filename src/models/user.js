import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
  await prisma.users.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
  await prisma.users.findUnique({ where: { id }, ...opts });

export const findByEmail = async (email) =>
  await prisma.users.findUnique({ where: { email } });

export const findByName = async (name) =>
  await prisma.users.findFirst({ where: { name } });

export const create = async (data, opts = {}) =>
  await prisma.users.create({ data, ...opts });

export const update = async (id, data) =>
  await prisma.users.update({ where: { id }, data });

export const remove = async (id) =>
  await prisma.users.delete({ where: { id } });