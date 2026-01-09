import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
    await prisma.favourite_tv_shows.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
    await prisma.favourite_tv_shows.findUnique({ where: { id }, ...opts });
    
export const create = async (data) =>
    await prisma.favourite_tv_shows.create({ data });

export const update = async (id, data) =>
    await prisma.favourite_tv_shows.update({ where: { id }, data });

export const remove = async (id) =>
    await prisma.favourite_tv_shows.delete({ where: { id } });

export default { all, getById, create, update, remove };
