import prisma from '../lib/prisma.js';

export const all = async (opts = {}) => await prisma.comments.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) => await prisma.comments.findUnique({ where: { id }, ...opts });

export const create = async (data) => await prisma.comments.create({ data });

export const update = async (id, data) => await prisma.comments.update({ where: { id }, data });

export const remove = async (id) => await prisma.comments.delete({ where: { id } });

export default { all, getById, create, update, remove };
