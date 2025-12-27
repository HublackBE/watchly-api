import prisma from '../lib/prisma.js';

export const all = async () => await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
export const getById = async (id) => await prisma.user.findUnique({ where: { id } });
export const create = async ({ name, email }) =>
  await prisma.user.create({ data: { name, email } });
export const update = async (id, data) =>
  await prisma.user.update({ where: { id }, data });
export const remove = async (id) => {
  await prisma.user.delete({ where: { id } });
  return true;
};

export default { all, getById, create, update, remove };
