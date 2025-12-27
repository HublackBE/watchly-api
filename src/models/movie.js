import prisma from '../lib/prisma.js';

export const all = async () => await prisma.movie.findMany({ orderBy: { createdAt: 'desc' } });
export const getById = async (id) => await prisma.movie.findUnique({ where: { id } });
export const create = async ({ title, year, user_id = null }) =>
  await prisma.movie.create({ data: { title, year, userId: user_id } });
export const update = async (id, { title, year, user_id }) =>
  await prisma.movie.update({ where: { id }, data: { title, year, userId: user_id } });
export const remove = async (id) => {
  await prisma.movie.delete({ where: { id } });
  return true;
};

export default { all, getById, create, update, remove };
