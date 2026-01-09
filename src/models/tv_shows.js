import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
    await prisma.tv_shows.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const findMany = async (filter = {}, opts = {}) =>
    await prisma.tv_shows.findMany({ ...filter , ...opts });

export const count = async (opts = {}) =>
    await prisma.tv_shows.count({ ...opts });

export const getById = async (id, opts = {}) =>
    await prisma.tv_shows.findUnique({ where: { id }, ...opts });

export const getBySlug = async (slug, opts = {}) =>
    await prisma.tv_shows.findUnique({ where: { slug }, ...opts });

export const create = async (data) =>
    await prisma.tv_shows.create({ data });

export const update = async (id, data) =>
    await prisma.tv_shows.update({ where: { id }, data });

export const remove = async (id) =>
    await prisma.tv_shows.delete({ where: { id } });

export default { all, getById, getBySlug, create, update, remove };
