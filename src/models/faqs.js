import prisma from '../lib/prisma.js';

export const all = async (opts = {}) => await prisma.faqs.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) => await prisma.faqs.findUnique({ where: { id }, ...opts });

export const create = async (data) => await prisma.faqs.create({ data });

export const update = async (id, data) => await prisma.faqs.update({ where: { id }, data });

export const remove = async (id) => await prisma.faqs.delete({ where: { id } });

export default { all, getById, create, update, remove };
