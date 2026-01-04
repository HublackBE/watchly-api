import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
  await prisma.movie_platform.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
  await prisma.movie_platform.findUnique({ where: { id }, ...opts });

export const create = async (data) => await prisma.movie_platform.create({ data });

export const update = async (id, data) =>
  await prisma.movie_platform.update({ where: { id }, data });

export const remove = async (id) => await prisma.movie_platform.delete({ where: { id } });

export default { all, getById, create, update, remove };
